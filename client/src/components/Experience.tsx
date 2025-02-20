import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Experience() {
  const experiences = [
    {
      company: "Turing",
      role: "Data Scientist",
      period: "May 2024 - Current",
      location: "Palo Alto (Hybrid)",
      description: "Developed and optimized large-scale AI models, improving accuracy by 12% and reducing training time by 15%. Implemented advanced techniques like reinforcement learning and multimodal processing."
    },
    {
      company: "Siemens",
      role: "Full Stack Developer intern",
      period: "May 2023 - September 2023",
      location: "Bengaluru, Karnataka, India",
      description: "Technical Intern at Siemens. Projects included AI-ML model training with Tensorflow and Pytorch, data processing, Frontend(Angular, React), API design(Open API, Fast API)"
    }
  ];

  return (
    <section id="experience" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Experience</h2>
        
        <div className="grid gap-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>{exp.company}</CardTitle>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-lg">{exp.role}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.period} | {exp.location}
                  </p>
                  <p>{exp.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
