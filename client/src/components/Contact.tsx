import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import emailjs from '@emailjs/browser';

const formSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name should only contain letters and spaces'),
  email: z.string()
    .email('Invalid email address')
    .min(5, 'Email is too short')
    .max(100, 'Email is too long'),
  subject: z.string()
    .min(3, 'Subject must be at least 3 characters')
    .max(100, 'Subject is too long'),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message is too long')
});

export default function Contact() {
  const { toast } = useToast();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting, isValid, isDirty } } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onChange' // Enable real-time validation
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      emailjs.init("nmpZNndUjXZk-eQmw");

      await emailjs.send('service_h14jqje', 'template_jqwxazi', {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      });

      toast({
        title: "Success!",
        description: "Your message has been sent successfully.",
      });
      reset();
    } catch (error) {
      console.error('EmailJS Error:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="contact" className="py-20 scroll-mt-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">Get in Touch</h2>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Contact Me</CardTitle>
            <CardDescription>Choose how you'd like to connect</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="message" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="message">Send Message</TabsTrigger>
                <TabsTrigger value="schedule">Schedule Meeting</TabsTrigger>
              </TabsList>

              <TabsContent value="message">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div>
                    <Input
                      placeholder="Your Name"
                      {...register('name')}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      type="email"
                      placeholder="Your Email"
                      {...register('email')}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Subject"
                      {...register('subject')}
                      className={errors.subject ? 'border-red-500' : ''}
                    />
                    {errors.subject && (
                      <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
                    )}
                  </div>

                  <div>
                    <Textarea
                      placeholder="Your Message"
                      rows={6}
                      {...register('message')}
                      className={errors.message ? 'border-red-500' : ''}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting || !isValid || !isDirty}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="schedule">
                <div className="min-h-[500px]">
                  <iframe
                    src="https://cal.com/vp-mis-ab/30min"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    className="min-h-[500px]"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}