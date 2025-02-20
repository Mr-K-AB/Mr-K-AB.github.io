import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Octokit } from '@octokit/rest';
import useEmblaCarousel from 'embla-carousel-react';
import { LazyImage } from '@/components/ui/lazy-image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  repoUrl: string;
  stars: number;
  forks: number;
  images: string[];
}

const projects: Project[] = [
  {
    title: "MessengerApp",
    description: "A .NET Core messenger application with real-time chat capabilities.",
    technologies: ["C#", ".NET Core", "SignalR"],
    repoUrl: "https://github.com/Mr-K-AB/se-proj1-messenger",
    stars: 0,
    forks: 0,
    images: [
      "https://raw.githubusercontent.com/Mr-K-AB/se-proj1-messenger/main/screenshots/chat.png",
      "https://raw.githubusercontent.com/Mr-K-AB/se-proj1-messenger/main/screenshots/login.png"
    ]
  },
  {
    title: "Shoe Hub",
    description: "eCommerce store website with backend exclusively for footwear",
    technologies: ["React", "Node.js", "PostgreSQL"],
    repoUrl: "https://gitlab.com/mr_ab/shoe-hub",
    stars: 0,
    forks: 0,
    images: [
      "https://gitlab.com/mr_ab/shoe-hub/-/raw/main/screenshots/home.png",
      "https://gitlab.com/mr_ab/shoe-hub/-/raw/main/screenshots/product.png"
    ]
  },
  {
    title: "Text-to-Face Generation",
    description: "GAN-based facial image generation from textual descriptions",
    technologies: ["Python", "PyTorch", "GANs"],
    repoUrl: "https://github.com/Mr-K-AB/text-to-face-generation",
    stars: 0,
    forks: 0,
    images: [
      "https://raw.githubusercontent.com/Mr-K-AB/text-to-face-generation/main/examples/sample1.png",
      "https://raw.githubusercontent.com/Mr-K-AB/text-to-face-generation/main/examples/sample2.png"
    ]
  }
];

function ProjectCarousel({ images }: { images: string[] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div key={index} className="relative flex-[0_0_100%] min-w-0">
              <LazyImage
                src={image}
                alt={`Project screenshot ${index + 1}`}
                className="w-full h-48 object-cover"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-2">
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full bg-background/80 backdrop-blur-sm ${!canScrollPrev && 'opacity-50'}`}
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canScrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className={`rounded-full bg-background/80 backdrop-blur-sm ${!canScrollNext && 'opacity-50'}`}
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canScrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default function ProjectShowcase() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [githubStats, setGithubStats] = useState<{ [key: string]: { stars: number; forks: number } }>({});
  const [isLoading, setIsLoading] = useState(true);
  const allTechnologies = Array.from(new Set(projects.flatMap(p => p.technologies)));

  useEffect(() => {
    const fetchGithubStats = async () => {
      setIsLoading(true);
      const octokit = new Octokit();

      for (const project of projects) {
        if (project.repoUrl.includes('github.com')) {
          const [owner, repo] = project.repoUrl.split('github.com/')[1].split('/');
          try {
            const { data } = await octokit.repos.get({ owner, repo });
            setGithubStats(prev => ({
              ...prev,
              [project.repoUrl]: {
                stars: data.stargazers_count,
                forks: data.forks_count
              }
            }));
          } catch (error) {
            console.error(`Error fetching stats for ${project.title}:`, error);
          }
        }
      }
      setIsLoading(false);
    };

    fetchGithubStats();
  }, []);

  const filteredProjects = selectedTech
    ? projects.filter(p => p.technologies.includes(selectedTech))
    : projects;

  return (
    <section id="projects" className="py-20 scroll-mt-16">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center">Projects</h2>

          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            <Button
              variant={selectedTech === null ? "default" : "outline"}
              onClick={() => setSelectedTech(null)}
              className="m-1"
            >
              All
            </Button>
            {allTechnologies.map(tech => (
              <Button
                key={tech}
                variant={selectedTech === tech ? "default" : "outline"}
                onClick={() => setSelectedTech(tech)}
                className="m-1"
              >
                {tech}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              // Skeleton loading state
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="h-full">
                  <CardHeader>
                    <div className="skeleton-text w-3/4" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="skeleton-image" />
                    <div className="skeleton-text w-full" />
                    <div className="skeleton-text w-2/3" />
                    <div className="flex gap-2">
                      {Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="skeleton h-6 w-16 rounded-full" />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              filteredProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, rotateY: 5 }}
                  className="perspective-1000"
                >
                  <Card className="h-full transform-gpu transition-transform duration-300 hover:shadow-xl">
                    <CardHeader>
                      <CardTitle className="flex justify-between items-start">
                        <span>{project.title}</span>
                        <div className="flex gap-2 text-sm text-muted-foreground">
                          <span>⭐ {githubStats[project.repoUrl]?.stars || 0}</span>
                          <span>🔱 {githubStats[project.repoUrl]?.forks || 0}</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ProjectCarousel images={project.images} />
                      <p className="text-muted-foreground">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map(tech => (
                          <Badge key={tech} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => window.open(project.repoUrl, '_blank')}
                      >
                        View Project
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}