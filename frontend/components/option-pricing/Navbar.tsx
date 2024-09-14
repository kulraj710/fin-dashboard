"use client"

import React from 'react'
  // import {
  //   Sheet,
  //   SheetContent,
  //   SheetDescription,
  //   SheetHeader,
  //   SheetTitle,
  //   SheetTrigger,
  // } from "@/components/ui/sheet";
import Link from "next/link";
// import { Menu } from "lucide-react";
// import { Button } from "@/components/ui/button";


interface navbarProps{
    model : string;
    setModel : (value : string) => void;
}


const Navbar: React.FC<navbarProps> = ({model, setModel}) => {
  return (
        <nav className="bg-primary text-primary-foreground p-4">
          <div className="container mx-auto flex justify-between items-center">
            <Link href="/" className="text-2xl font-bold">
              Option Pricing Models
            </Link>

            {/* Temporarily disable sheet */}
            {/* <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Select Model</SheetTitle>
                  <SheetDescription>
                    Choose an option pricing model to use.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  Hello
                </div>
              </SheetContent>
            </Sheet> */}
          </div>
        </nav>
  )
}

export default Navbar