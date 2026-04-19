"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"

export function LeadCapture() {
  const [open, setOpen] = React.useState(false)
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-[#B71C1C] text-[#f5f5f5] hover:bg-[#B71C1C]/10 hover:text-white">
          ACCESS OPTIMIZATION GUIDE
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>RUTHLESS ENGINEERING GUIDE</DialogTitle>
          <DialogDescription>
            Unlock the exact architecture strategies used for zero-latency frame sequencing. Enter your clearance credentials (email) below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Input
              id="email"
              placeholder="operator@domain.com"
              className="col-span-4"
              type="email"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button type="submit" onClick={() => setOpen(false)}>
            INITIALIZE DOWNLOAD
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
