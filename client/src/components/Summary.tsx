import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

export default function Summary() {
  return (
    <section id="summary" className="py-20 scroll-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Summary</h2>
        <Card>
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed">
              Results-driven Data Scientist at Turing, specializing in AI/ML models, data processing, and full-stack development. 
              Experienced in designing and deploying scalable AI solutions, working with deep learning frameworks, and optimizing data pipelines. 
              Former full-stack developer intern at Siemens, with expertise in Angular, React, FastAPI, and PostgreSQL.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Led multiple projects, including a .NET Core messenger app and AI-driven data visualization models. 
              Served as General Secretary of Academic Affairs at IIT Palakkad, fostering industry-academia collaborations. 
              Passionate about cutting-edge AI research, with experience in GANs, NLP, and computer vision.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
