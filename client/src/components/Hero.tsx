import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import ResumeViewer from './ResumeViewer';
import { useState } from 'react';

export default function Hero() {
  const [showResume, setShowResume] = useState(false);

  return (
    <section className="min-h-screen pt-20 flex items-center">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-primary to-purple-500 text-transparent bg-clip-text">
              V P MIS AB
            </span>
          </h1>
          <p className="text-xl mb-6 text-muted-foreground">
            Data Scientist | Full Stack Developer | AI/ML Enthusiast
          </p>
          <div className="flex gap-4">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90"
            >
              <a href="https://www.linkedin.com/in/mr-mis-ab-v-p" target="_blank">
                <FaLinkedin className="mr-2" /> LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              asChild
            >
              <a href="https://github.com/Mr-K-AB" target="_blank">
                <FaGithub className="mr-2" /> GitHub
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid gap-4"
        >
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowResume(true)}>
            <img
              src="https://media.licdn.com/dms/image/v2/D5603AQHltz9QznmT2g/profile-displayphoto-shrink_400_400/B56ZQWD3yZGQAg-/0/1735536902407"
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold text-center">View Resume</h3>
          </Card>
        </motion.div>
      </div>

      <ResumeViewer open={showResume} onClose={() => setShowResume(false)} />
    </section>
  );
}
