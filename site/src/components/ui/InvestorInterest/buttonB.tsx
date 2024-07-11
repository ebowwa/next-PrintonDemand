/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oqlhERy4ksu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import * as React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Component() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className="flex justify-center">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:from-secondary hover:to-primary transition-colors"
        >
          Invest in Our Future
        </Button>
      </div>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-full max-w-md bg-background rounded-lg shadow-lg">
            <DialogHeader className="bg-primary text-primary-foreground p-6 rounded-t-lg">
              <DialogTitle className="text-2xl font-bold">Investor Interest Form</DialogTitle>
              <DialogDescription className="text-sm">Join our mission to revolutionize the industry.</DialogDescription>
            </DialogHeader>
            <div className="p-6 space-y-4">
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="font-medium">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      className="border-2 border-input focus:border-primary focus:ring-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-medium">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      className="border-2 border-input focus:border-primary focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company" className="font-medium">
                    Company
                  </Label>
                  <Input
                    id="company"
                    placeholder="Acme Inc."
                    className="border-2 border-input focus:border-primary focus:ring-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description" className="font-medium">
                    Investment Interest
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Briefly describe your investment interest..."
                    rows={4}
                    className="border-2 border-input focus:border-primary focus:ring-primary resize-none"
                  />
                </div>
              </form>
            </div>
            <DialogFooter className="bg-muted p-4 rounded-b-lg">
              <Button
                type="submit"
                onClick={() => setIsModalOpen(false)}
                className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}