import Hero from "@/components/hero"
import About from "@/components/about"
import Work from "@/components/work"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Navigation from "@/components/navigation"
import ScrollToTop from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <Navigation />
      <Hero />
      <About />
      <Work />
      <Skills />
      <Contact />
      <ScrollToTop />
    </div>
  )
}
