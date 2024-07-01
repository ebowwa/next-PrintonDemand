import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Visualization: React.FC = () => {
  const phaseShiftChartRef = useRef<HTMLCanvasElement | null>(null);
  const gaussianHeatmapCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const phaseShiftChartInstance = useRef<Chart | null>(null);

  useEffect(() => {
    if (phaseShiftChartRef.current && gaussianHeatmapCanvasRef.current) {
      const phaseShiftCtx = phaseShiftChartRef.current.getContext('2d');
      const gaussianHeatmapCtx = gaussianHeatmapCanvasRef.current.getContext('2d');

      if (phaseShiftCtx && gaussianHeatmapCtx) {
        // Destroy existing chart instance if it exists
        if (phaseShiftChartInstance.current) {
          phaseShiftChartInstance.current.destroy();
        }

        phaseShiftChartInstance.current = new Chart(phaseShiftCtx, {
          type: 'line',
          data: {
            labels: Array.from({ length: 360 }, (_, i) => i),
            datasets: [{
              label: 'Phase Shift',
              data: Array.from({ length: 360 }, (_, i) => Math.cos(i * Math.PI / 180)),
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: false,
                min: -1,
                max: 1
              }
            }
          }
        });

        const gaussian2D = (x: number, y: number, sigma: number) => {
          return Math.exp(-(x * x + y * y) / (2 * sigma * sigma));
        };

        const drawGaussianHeatmap = (sigma: number) => {
          const canvas = gaussianHeatmapCanvasRef.current;
          if (canvas && gaussianHeatmapCtx) {
            const imageData = gaussianHeatmapCtx.createImageData(canvas.width, canvas.height);
            const data = imageData.data;

            for (let x = 0; x < canvas.width; x++) {
              for (let y = 0; y < canvas.height; y++) {
                const xCoord = (x - canvas.width / 2) / (canvas.width / 10);
                const yCoord = (y - canvas.height / 2) / (canvas.height / 10);
                const value = gaussian2D(xCoord, yCoord, sigma);

                const index = (y * canvas.width + x) * 4;
                data[index] = 0; // R
                data[index + 1] = 0; // G
                data[index + 2] = 255 * value; // B
                data[index + 3] = 255; // A
              }
            }

            gaussianHeatmapCtx.putImageData(imageData, 0, 0);
          }
        };

        const aoaSlider = document.getElementById('aoaSlider') as HTMLInputElement;
        const sigmaSlider = document.getElementById('sigmaSlider') as HTMLInputElement;

        if (aoaSlider && sigmaSlider) {
          aoaSlider.oninput = function(event: Event) {
            const target = event.target as HTMLInputElement;
            const angle = parseInt(target.value);
            updatePhaseShiftChart(angle);
            const aoaValue = document.getElementById('aoaValue');
            if (aoaValue) aoaValue.textContent = target.value;
          };

          sigmaSlider.oninput = function(event: Event) {
            const target = event.target as HTMLInputElement;
            const sigma = parseFloat(target.value);
            drawGaussianHeatmap(sigma);
            const sigmaValue = document.getElementById('sigmaValue');
            if (sigmaValue) sigmaValue.textContent = target.value;
          };

          // Initial draw
          drawGaussianHeatmap(3);
        }
      }
    }

    return () => {
      // Cleanup: destroy chart instance on component unmount
      if (phaseShiftChartInstance.current) {
        phaseShiftChartInstance.current.destroy();
        phaseShiftChartInstance.current = null;
      }
    };
  }, []);

  const updatePhaseShiftChart = (angle: number) => {
    const newData = Array.from({ length: 360 }, (_, i) => Math.cos((i * Math.PI / 180) - (angle * Math.PI / 180)));
    if (phaseShiftChartInstance.current) {
      phaseShiftChartInstance.current.data.datasets[0].data = newData;
      phaseShiftChartInstance.current.update();
    }
  };

  return (
    <div className="p-4">
      <h1 className="hidden">RFPose-OT: Key Concepts and Formulas</h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">1. RF Signal Representation</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Received Signal</h3>
        <p className="mb-2">{`s_{m,n}(t) = \\sum_{l} a_l(t) \\psi_{l,m,n}(t) \\phi_{l,m,n}(t)`}</p>
        <p>Where:</p>
        <ul className="list-disc list-inside">
          <li>{`s_{m,n}(t)`} = Received signal at receiver antenna m, frequency point n, at time t</li>
          <li>{`a_l(t)`} = Complex attenuation coefficient for path l</li>
          <li>{`\\psi_{l,m,n}(t)`} = Phase shift due to Angle of Arrival (AoA)</li>
          <li>{`\\phi_{l,m,n}(t)`} = Phase shift due to Time of Flight (ToF)</li>
        </ul>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h3 className="text-lg font-semibold mb-2">Phase Shifts</h3>
        <p className="mb-2">AoA Phase Shift:</p>
        <p className="mb-2">{`\\psi_{l,m,n}(t) = e^{-j2\\pi f_n (m-1)d \\cos \\theta_{l,m}(t) / c}`}</p>
        <p className="mb-2">ToF Phase Shift:</p>
        <p className="mb-2">{`\\phi_{l,m,n}(t) = e^{-j2\\pi f_n \\tau_{l,m}(t)}`}</p>
        <p>Where:</p>
        <ul className="list-disc list-inside">
          <li>{`f_n`} = Frequency at point n</li>
          <li>d = Interelement distance of antenna array</li>
          <li>{`\\theta_{l,m}(t)`} = Angle of Arrival (AoA)</li>
          <li>c = Speed of light</li>
          <li>{`\\tau_{l,m}(t)`} = Time of Flight (ToF)</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Interactive: Phase Shift Visualization</h3>
        <p className="mb-2">Adjust the angle of arrival to see how it affects the phase shift:</p>
        <div className="flex items-center mb-2">
          <input type="range" id="aoaSlider" min="0" max="360" defaultValue="0" className="mr-2" />
          <span>Angle: <span id="aoaValue">0</span>°</span>
        </div>
        <canvas id="phaseShiftChart" ref={phaseShiftChartRef}></canvas>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">2. Pose Heatmap Generation</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">3D Gaussian Kernel for Keypoint k</h3>
        <p className="mb-2">{`P^{(k)}_{x,y,z} = e^{-[(x-x_{p_k})^2 + (y-y_{p_k})^2 + (z-z_{p_k})^2] / 2\\sigma^2}`}</p>
        <p>Where:</p>
        <ul className="list-disc list-inside">
          <li>{`P^{(k)}_{x,y,z}`} = Value at coordinates (x, y, z) in the heatmap for keypoint k</li>
          <li>{`(x_{p_k}, y_{p_k}, z_{p_k})`} = 3D coordinates of keypoint k</li>
          <li>{`\\sigma`} = Standard deviation of the Gaussian kernel (controls spread)</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Interactive: 2D Gaussian Heatmap Visualization</h3>
        <p className="mb-2">Adjust the standard deviation to see how it affects the Gaussian heatmap:</p>
        <div className="flex items-center mb-2">
          <input type="range" id="sigmaSlider" min="1" max="10" defaultValue="3" step="0.1" className="mr-2" />
          <span>Sigma: <span id="sigmaValue">3</span></span>
        </div>
        <canvas id="gaussianHeatmapCanvas" ref={gaussianHeatmapCanvasRef} width="400" height="400"></canvas>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">3. Network Outputs</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Pose Embedding</h3>
        <p className="mb-2">{`Z_p = E_P(P)`}</p>
        <p>Where:</p>
        <ul className="list-disc list-inside">
          <li>{`Z_p`} = Pose feature vector (embedding)</li>
          <li>{`E_P`} = Pose encoder network</li>
          <li>P = 3D pose heatmap</li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">4. Loss Functions</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Optimal Transport (OT) Loss</h3>
        <p className="mb-2">{`L_{OT} = \\int_{Z_r \\times Z_p} C(Z_r, Z_p) d\\gamma(Z_r, Z_p)`}</p>
        <p>Where:</p>
        <ul className="list-disc list-inside">
          <li>{`C(Z_r, Z_p)`} = Cost function (e.g., {`\\| Z_r - Z_p\\|_1`})</li>
          <li>{`\\gamma(Z_r, Z_p)`} = Optimal transport plan</li>
        </ul>
      </div>

      <h2 className="text-xl font-semibold mt-4 mb-2">5. Evaluation Metric</h2>
      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Spatial Location Error (SLE)</h3>
        <p className="mb-2">{`SLE_k = \\frac{1}{U} \\sum_{u=1}^{U} \\| \\hat{p}^{(u)}_k - p^{(u)}_k \\|_2`}</p>
        <p>Where:</p>
        <ul className="list-disc list-inside">
          <li>{`SLE_k`} = SLE for keypoint k</li>
          <li>U = Number of test samples</li>
          <li>{`\\hat{p}^{(u)}_k`} = Predicted coordinates of keypoint k for sample u</li>
          <li>{`p^{(u)}_k`} = Ground truth coordinates</li>
        </ul>
      </div>
    </div>
  );
};

export default Visualization;