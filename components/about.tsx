export default function About() {
  return (
    <section id="about" className="min-h-screen bg-white text-black py-20">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tight">ABOUT</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl md:text-3xl font-light mb-8">Hello, I'm a Web &amp; App Developer.</h3>
              <p className="text-lg leading-relaxed mb-6">
                I'm a passionate and self-driven developer focused on creating clean, functional, and user-friendly
                websites and mobile applications. Alongside development, I also explore UI/UX design to craft intuitive
                experiences that feel good to use.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                While I may not have formal industry experience yet, I've been actively building projects, learning
                modern tools, and pushing myself to improve every day. I'm genuinely excited to grow, collaborate with
                creative minds, and contribute meaningfully to real-world products.
              </p>
              <p className="text-lg leading-relaxed">
                I believe in learning by doing, and I'm always open to new challenges that help me grow both technically
                and creatively.
              </p>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="text-xl font-medium mb-4">Skills</h4>
                <div className="space-y-4">
                  <div className="border-l-2 border-black pl-4">
                    <h5 className="font-medium">Web Development</h5>
                    <p className="text-gray-600">Front-end and back-end web apps using modern tech</p>
                  </div>
                  <div className="border-l-2 border-gray-300 pl-4">
                    <h5 className="font-medium">App Development</h5>
                    <p className="text-gray-600">Cross-platform apps with a focus on performance and usability</p>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-medium mb-4">Education</h4>
                <div className="border-l-2 border-black pl-4">
                  <h5 className="font-medium">Bachelor of Business Administration in Computer Applications</h5>
                  <p className="text-gray-600">Savitribai Phule Pune University</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
