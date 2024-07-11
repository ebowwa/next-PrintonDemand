/**
 * v0 by Vercel.
 * @see https://v0.dev/t/k7Lwf6Gx73G
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
// Simple version
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
      <Button onClick={() => setIsModalOpen(true)}>Investor Interest Form</Button>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-full max-w-md">
            <DialogHeader>
              <DialogTitle>Investor Interest Form</DialogTitle>
              <DialogDescription>Submit your information to express interest in investing.</DialogDescription>
            </DialogHeader>
            <div>
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Acme Inc." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Investment Interest</Label>
                  <Textarea id="description" placeholder="Briefly describe your investment interest..." rows={4} />
                </div>
              </form>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={() => setIsModalOpen(false)}>
                Submit
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}