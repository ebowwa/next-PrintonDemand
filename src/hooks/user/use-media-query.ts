// src/hooks/user/use-media-query.ts
import { useEffect, useState } from "react";

export default function useMediaQuery() {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop" | null>(
    null,
  );
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const checkDevice = () => {
      if (window.matchMedia("(max-width: 640px)").matches) {
        setDevice("mobile");
      } else if (
        window.matchMedia("(min-width: 641px) and (max-width: 1024px)").matches
      ) {
        setDevice("tablet");
      } else {
        setDevice("desktop");
      }
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    // Initial detection
    checkDevice();

    // Listener for windows resize
    window.addEventListener("resize", checkDevice);

    // Cleanup listener
    return () => {
      window.removeEventListener("resize", checkDevice);
    };
  }, []);

  return {
    device,
    width: dimensions?.width,
    height: dimensions?.height,
    isMobile: device === "mobile",
    isTablet: device === "tablet",
    isDesktop: device === "desktop",
  };
}
// The `useMediaQuery` function is a custom React hook used to detect the current device type (mobile, tablet, or desktop) based on the window dimensions.

// It also provides information about the width and height of the window and boolean flags indicating whether the current device matches specific device types (isMobile, isTablet, isDesktop).

// This hook employs the `useEffect` hook from React to perform side effects related to detecting the device type and updating dimensions when the window is resized.

// Inside the hook, it initializes state using the `useState` hook to hold the current device type (`device`) and window dimensions (`dimensions`).

// The `checkDevice` function is responsible for determining the device type based on the window width using media queries. It sets the `device` state accordingly and updates the `dimensions` state with the current window width and height.

// The `useEffect` hook is used to execute the `checkDevice` function when the component mounts and adds a listener to the window resize event to update the device type and dimensions dynamically.

// Additionally, the effect returns a cleanup function that removes the resize event listener when the component unmounts to prevent memory leaks.

// The hook returns an object containing the device type (`device`), window width and height (`width` and `height`), and boolean flags (`isMobile`, `isTablet`, `isDesktop`) indicating whether the current device matches specific device types.
