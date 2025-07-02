"use client";

import Image from "next/image"
import { useEffect, useState } from "react"

export default function Hero() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    setShow(true)
  }, [])
  return (
    <section id="home" className="min-h-screen bg-black text-white relative overflow-hidden">
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Image
            src="/assests/hero.jpg"
            alt="Creative professional workspace"
            fill
            className="object-cover opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="text-left">
                <h1 className={`text-6xl md:text-7xl xl:text-9xl leading-none tracking-tight text-center lg:text-left font-extrabold transition-all duration-1000 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
                  <span className="block font-extrabold">I'm Moin – Web &amp; App Developer</span>
                </h1>
              </div>

              <div className="text-right lg:text-left lg:pl-12">
                <h1 className={`text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-none tracking-tight font-extrabold transition-all duration-1000 delay-200 ${show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}> 
                  UI‑UX Explorer
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
