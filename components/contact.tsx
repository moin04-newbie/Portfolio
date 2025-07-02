"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Github } from "lucide-react"

export default function Contact() {
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
    <section id="contact" className="min-h-screen bg-black text-white py-20">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tight">CONTACT</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-light mb-8">Let's Work Together</h3>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                I'm always interested in new opportunities and exciting projects. Whether you have a specific project in
                mind or just want to connect, I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Mail className="w-6 h-6 text-pink-500" />
                <span>moinsayyad529@gmail.com</span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-6 h-6 text-pink-500" />
                <span>+91 7249592867</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-6 h-6 text-pink-500" />
                <span>Pune, Maharashtra, India</span>
              </div>
            </div>

            <div className="pt-8">
              <h4 className="text-lg font-medium mb-4">Connect With Me</h4>
              <div className="flex space-x-6">
                <a href="https://www.linkedin.com/in/moin-sayyad-9390aa2a9/" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://github.com/moin04-newbie" target="_blank" className="text-gray-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                
                <a href="https://www.instagram.com/moinnfr" target="_blank"className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Project inquiry"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Tell me about your project..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black hover:bg-gray-200 font-medium py-3 disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>

            {submitStatus === "success" && (
              <div className="mt-4 p-4 bg-green-500/20 border border-green-500 rounded-lg">
                <p className="text-green-400">Thank you! Your message has been sent successfully.</p>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mt-4 p-4 bg-red-500/20 border border-red-500 rounded-lg">
                <p className="text-red-400">Sorry, there was an error sending your message. Please try again.</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-white/20 text-center">
          <p className="text-gray-400">© 2024 Moin Sayyad. All rights reserved.</p>
        </div>
      </div>
    </section>
  )
}
