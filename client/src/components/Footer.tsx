import { motion } from 'framer-motion';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">V P MIS AB</h3>
            <p className="text-muted-foreground">
              &copy; 2025 V P MIS AB. All rights reserved.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#summary" className="text-muted-foreground hover:text-primary transition-colors">Summary</a></li>
              <li><a href="#experience" className="text-muted-foreground hover:text-primary transition-colors">Experience</a></li>
              <li><a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Skills</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Connect with Me</h3>
            <div className="flex gap-4">
              <motion.a
                href="https://www.linkedin.com/in/mr-mis-ab-v-p"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaLinkedin size={24} />
              </motion.a>
              <motion.a
                href="https://github.com/Mr-K-AB"
                target="_blank"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaGithub size={24} />
              </motion.a>
              <motion.a
                href="mailto:Mr_MIS-AB_Profile@outlook.com"
                whileHover={{ scale: 1.1 }}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <FaEnvelope size={24} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
