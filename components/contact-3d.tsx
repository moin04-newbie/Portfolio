"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Environment, OrbitControls } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Send } from "lucide-react"
import type * as THREE from "three"

function ContactSphere() {
  const sphereRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.elapsedTime * 0.1
      sphereRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial color="#ff1493" transparent opacity={0.1} wireframe />
      </mesh>
    </Float>
  )
}

function FloatingIcons() {
  const icons = [
    { position: [3, 2, 1], color: "#ff6b6b" },
    { position: [-3, 1, -1], color: "#4ecdc4" },
    { position: [2, -2, 2], color: "#45b7d1" },
    { position: [-2, -1, -2], color: "#96ceb4" },
    { position: [0, 3, 0], color: "#feca57" },
  ]

  return (
    <group>
      {icons.map((icon, index) => (
        <Float key={index} speed={1 + index * 0.2} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh position={icon.position as [number, number, number]}>
            <octahedronGeometry args={[0.3]} />
            <meshStandardMaterial
              color={icon.color}
              transparent
              opacity={0.7}
              emissive={icon.color}
              emissiveIntensity={0.2}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

export default function Contact3D() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="min-h-screen bg-gradient-to-b from-purple-900 to-black text-white py-20 relative">
      {/* 3D Background */}
      <div className="absolute inset-0 opacity-30">
        <Canvas>
          <Environment preset="sunset" />
          <ambientLight intensity={0.4} />
          <pointLight position={[10, 10, 10]} intensity={0.8} color="#ff6b6b" />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />

          <ContactSphere />
          <FloatingIcons />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.3} />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 md:px-8">
        <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tight bg-gradient-to-r from-white to-pink-400 bg-clip-text text-transparent text-center">
          CONTACT
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-light mb-8 text-pink-400">Let's Create Something Amazing</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Ready to bring your ideas to life with cutting-edge technology and creative design? Let's collaborate
                and build something extraordinary together.
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 group hover:text-pink-400 transition-colors">
                  <div className="p-3 bg-pink-500/20 rounded-full group-hover:bg-pink-500/30 transition-colors">
                    <Mail className="w-6 h-6 text-pink-400" />
                  </div>
                  <span>moinsayyad529@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 group hover:text-blue-400 transition-colors">
                  <div className="p-3 bg-blue-500/20 rounded-full group-hover:bg-blue-500/30 transition-colors">
                    <Phone className="w-6 h-6 text-blue-400" />
                  </div>
                  <span>+91 7249592867</span>
                </div>
                <div className="flex items-center space-x-4 group hover:text-green-400 transition-colors">
                  <div className="p-3 bg-green-500/20 rounded-full group-hover:bg-green-500/30 transition-colors">
                    <MapPin className="w-6 h-6 text-green-400" />
                  </div>
                  <span>Pune, Maharashtra, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-8 border-t border-white/10 mt-8">
                <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Linkedin, color: "hover:text-blue-400", bg: "hover:bg-blue-500/20" },
                    { icon: Twitter, color: "hover:text-cyan-400", bg: "hover:bg-cyan-500/20" },
                    { icon: Instagram, color: "hover:text-pink-400", bg: "hover:bg-pink-500/20" },
                  ].map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className={`p-3 bg-white/5 rounded-full text-gray-400 transition-all duration-300 ${social.color} ${social.bg} hover:scale-110`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-gray-300">
                    Name *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-pink-400 transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-300">
                    Email *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-pink-400 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2 text-gray-300">
                  Subject *
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-pink-400 transition-colors"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2 text-gray-300">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-pink-400 transition-colors resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </div>
                )}
              </Button>
            </form>

            {submitStatus === "success" && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-xl">
                <p className="text-green-400">🎉 Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-xl">
                <p className="text-red-400">❌ Sorry, there was an error sending your message. Please try again.</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 pt-8 border-t border-white/20 text-center">
          <p className="text-gray-400">© 2024 Moin Sayyad. Crafted with ❤️ and cutting-edge technology.</p>
        </div>
      </div>
    </section>
  )
}
