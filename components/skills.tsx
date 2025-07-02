export default function Skills() {
  const skillCategories = [
    {
      title: "Design",
      skills: [
        { name: "UI/UX Design", level: 95 },
        { name: "Brand Identity", level: 90 },
        { name: "Typography", level: 85 },
        { name: "Color Theory", level: 88 },
      ],
    },
    {
      title: "Development",
      skills: [
        { name: "React/Next.js", level: 92 },
        { name: "Flutter", level: 88 },
        { name: "HTML,CSS,JavaScript", level: 70 },
        { name: "Gsap", level: 50 },
      ],
    },
    {
      title: "Tools",
      skills: [
        { name: "Figma", level: 95 },
        { name: "GitHub", level: 95 },
      ],
    },
  ];

  return (
    <section id="skills" className="min-h-screen bg-gray-100 text-black py-20">
      <div className="container mx-auto px-6 md:px-8">
        <h2 className="text-5xl md:text-7xl font-light mb-16 tracking-tight">SKILLS</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {skillCategories.map((category, index) => (
            <div key={index} className="space-y-6">
              <h3 className="text-2xl font-medium mb-8">{category.title}</h3>

              {category.skills.map((skill, skillIndex) => (
                <div key={skillIndex} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-sm text-gray-600">{skill.level}%</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className="bg-black h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
