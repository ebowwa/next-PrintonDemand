"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const SimpleIDE = () => {
  const [html, setHtml] = useState('<h1>Hello, World!</h1>');
  const [css, setCss] = useState('h1 { color: blue; }');
  const [js, setJs] = useState('console.log("Hello from JavaScript!");');
  const [output, setOutput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);
  const [activeTab, setActiveTab] = useState('html');

  const tutorial = [
    {
      title: "Welcome to HTML",
      content: "Let's start by editing the HTML. Try changing the text inside the h1 tag.",
      tab: "html"
    },
    {
      title: "Styling with CSS",
      content: "Great! Now let's style it with some CSS. Try changing the color of the h1 element.",
      tab: "css"
    },
    {
      title: "Adding Interactivity",
      content: "Finally, let's add some JavaScript interactivity. Try adding an alert when the page loads.",
      tab: "js"
    },
    {
      title: "Congratulations!",
      content: "You've completed the tutorial. Feel free to experiment with the IDE!",
      tab: "html"
    }
  ];

  useEffect(() => {
    updateOutput();
  }, [html, css, js]);

  useEffect(() => {
    setActiveTab(tutorial[currentStep].tab);
  }, [currentStep]);

  const updateOutput = () => {
    const combinedOutput = `
      <html>
        <head>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
    setOutput(combinedOutput);
  };

  const nextStep = () => {
    if (currentStep < tutorial.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Simple IDE with Tutorial</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="html">HTML</TabsTrigger>
              <TabsTrigger value="css">CSS</TabsTrigger>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
            </TabsList>
            <TabsContent value="html">
              <textarea
                className="w-full h-64 p-2 border rounded"
                value={html}
                onChange={(e) => setHtml(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="css">
              <textarea
                className="w-full h-64 p-2 border rounded"
                value={css}
                onChange={(e) => setCss(e.target.value)}
              />
            </TabsContent>
            <TabsContent value="js">
              <textarea
                className="w-full h-64 p-2 border rounded"
                value={js}
                onChange={(e) => setJs(e.target.value)}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <iframe
                srcDoc={output}
                title="output"
                sandbox="allow-scripts"
                frameBorder="0"
                width="100%"
                height="300"
              />
            </CardContent>
          </Card>
        </div>
      </div>
      <Dialog open={showTutorial} onOpenChange={setShowTutorial}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{tutorial[currentStep].title}</DialogTitle>
            <DialogDescription>
              {tutorial[currentStep].content}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={nextStep}>
              {currentStep === tutorial.length - 1 ? "Finish" : "Next Step"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {!showTutorial && (
        <Button onClick={() => setShowTutorial(true)} className="mt-4">
          Restart Tutorial
        </Button>
      )}
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Tutorial</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{tutorial[currentStep].content}</p>
          <Button onClick={nextStep} disabled={currentStep === tutorial.length - 1}>
            Next Step
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SimpleIDE;