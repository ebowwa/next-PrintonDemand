"use client"
import React, { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Progress } from "@/components/ui/progress"

const YouTubeCreatorTutorial = () => {
  const [step, setStep] = useState(0);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const steps = [
    {
      title: "Develop Your Unique Concept",
      content: (
        <>
          <p>MrBeast is known for his over-the-top challenges and philanthropy. To become a successful YouTuber like him:</p>
          <ul>
            <li>Brainstorm unique, attention-grabbing video ideas</li>
            <li>Focus on content that&apos;s entertaining, shocking, or heartwarming</li>
            <li>Consider incorporating challenges, stunts, or acts of generosity</li>
          </ul>
        </>
      )
    },
    {
      title: "Invest in Quality Equipment",
      content: (
        <>
          <p>High production value is crucial for MrBeast-style videos. Invest in:</p>
          <ul>
            <li>High-quality cameras (4K capable)</li>
            <li>Professional lighting equipment</li>
            <li>Good microphones for clear audio</li>
            <li>Editing software like Adobe Premiere Pro or Final Cut Pro</li>
          </ul>
        </>
      )
    },
    {
      title: "Build a Reliable Team",
      content: (
        <>
          <p>MrBeast&apos;s success is partly due to his dedicated team. Consider:</p>
          <ul>
            <li>Recruiting friends or hiring professionals</li>
            <li>Assigning roles: cameramen, editors, writers, actors, etc.</li>
            <li>Fostering a collaborative and creative environment</li>
          </ul>
        </>
      )
    },
    {
      title: "Plan and Execute Big Ideas",
      content: (
        <>
          <p>MrBeast is known for his ambitious projects. To replicate this:</p>
          <ul>
            <li>Start with smaller, achievable ideas and gradually scale up</li>
            <li>Plan meticulously, considering logistics and potential challenges</li>
            <li>Be prepared to invest time and resources into each video</li>
          </ul>
        </>
      )
    },
    {
      title: "Master the Art of Thumbnails and Titles",
      content: (
        <>
          <p>Attractive thumbnails and catchy titles are crucial. Tips:</p>
          <ul>
            <li>Use bright colors and contrasting text in thumbnails</li>
            <li>Include faces showing strong emotions</li>
            <li>Create titles that spark curiosity or promise value</li>
            <li>A/B test different thumbnails and titles</li>
          </ul>
        </>
      )
    },
    {
      title: "Engage with Your Audience",
      content: (
        <>
          <p>Building a community is key to sustained success:</p>
          <ul>
            <li>Respond to comments regularly</li>
            <li>Host Q&amp;A sessions or live streams</li>
            <li>Incorporate viewer suggestions into your content</li>
            <li>Use other social media platforms to connect with fans</li>
          </ul>
        </>
      )
    },
    {
      title: "Analyze and Adapt",
      content: (
        <>
          <p>Continuously improve your content by:</p>
          <ul>
            <li>Studying your YouTube Analytics</li>
            <li>Identifying which videos perform best and why</li>
            <li>Staying updated with YouTube algorithm changes</li>
            <li>Being willing to pivot your strategy based on data</li>
          </ul>
        </>
      )
    },
    {
      title: "Consistency is Key",
      content: (
        <>
          <p>Maintain a regular upload schedule:</p>
          <ul>
            <li>Aim for at least one high-quality video per week</li>
            <li>Use a content calendar to plan ahead</li>
            <li>Build a backlog of videos for consistent uploads</li>
          </ul>
        </>
      )
    },
    {
      title: "Collaborate and Network",
      content: (
        <>
          <p>Grow your channel through strategic partnerships:</p>
          <ul>
            <li>Collaborate with other YouTubers in your niche</li>
            <li>Attend YouTube creator events and conferences</li>
            <li>Join YouTube creator communities and forums</li>
          </ul>
        </>
      )
    },
    {
      title: "Monetize Wisely",
      content: (
        <>
          <p>Diversify your income streams:</p>
          <ul>
            <li>Enable ads on your videos</li>
            <li>Explore sponsorship deals</li>
            <li>Create and sell merchandise</li>
            <li>Consider crowdfunding for big projects</li>
          </ul>
        </>
      )
    }
  ];

  const openDialog = (index: number) => {
    setStep(index);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const nextStep = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      closeDialog();
    }
  };

  const prevStep = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Become a YouTube Creator Like MrBeast</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {steps.map((s, index) => (
          <Button key={index} onClick={() => openDialog(index)}>
            {s.title}
          </Button>
        ))}
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{steps[step].title}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            {steps[step].content}
          </DialogDescription>
          <DialogFooter className="flex justify-between">
            <Button onClick={prevStep} disabled={step === 0}>Previous</Button>
            <Button onClick={nextStep}>{step === steps.length - 1 ? 'Finish' : 'Next'}</Button>
          </DialogFooter>
          <Progress value={(step + 1) / steps.length * 100} className="mt-4" />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default YouTubeCreatorTutorial;