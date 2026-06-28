import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Mail,
  MapPin,
  Phone,
  Send,
  Github,
  Linkedin,
  MessageSquare,
  Clock,
  Loader2,
} from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'awaisaly0852@gmail.com',
    href: 'mailto:awaisaly0852@gmail.com',
    color: '#6366f1',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Ghotki, Pakistan',
    href: '#',
    color: '#10b981',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+92 328 761 7997',
    href: 'tel:+923287617997',
    color: '#f59e0b',
  },
  {
    icon: Clock,
    label: 'Availability',
    value: 'Mon - Sat, 9AM - 6PM',
    href: '#',
    color: '#ec4899',
  },
];

const socialLinks = [
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/gh-qadir04',
    color: '#fff',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/ghulam-qadir-a68945416',
    color: '#0a66c2',
  },
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:awaisaly0852@gmail.com',
    color: '#ea4335',
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xojowkkr';

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(e.target as HTMLFormElement),
      });

      if (response.ok) {
        toast.success('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Failed to send');
      }
    } catch {
      toast.error('Failed to send message. Please try again or email me directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <div className="section-container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Get In Touch</span>
          <h2 className="section-title">Let's Work Together</h2>
          <p className="section-subtitle">
            Have a project in mind? Let's discuss how I can help bring your
            ideas to life
          </p>
        </motion.div>

        <div className="contact-grid">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="contact-info-title">Contact Information</h3>
            <p className="contact-info-text">
              Feel free to reach out through any of these channels. I'm always
              excited to discuss new projects and opportunities.
            </p>

            <div className="contact-info-list">
              {contactInfo.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  className="contact-info-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 10, backgroundColor: 'rgba(99, 102, 241, 0.08)' }}
                >
                  <div
                    className="contact-info-icon"
                    style={{
                      background: `${item.color}18`,
                      color: item.color,
                    }}
                  >
                    <item.icon size={20} />
                  </div>
                  <div className="contact-info-detail">
                    <span className="contact-info-label">{item.label}</span>
                    <span className="contact-info-value">{item.value}</span>
                  </div>
                </motion.a>
              ))}
            </div>

            <div className="contact-socials">
              <span className="contact-socials-label">Follow Me</span>
              <div className="contact-socials-list">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-link"
                    style={{
                      background: `${social.color}15`,
                      color: social.color,
                    }}
                    whileHover={{ scale: 1.15, y: -5 }}
                    whileTap={{ scale: 0.95 }}
                    title={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="contact-form-card">
              <h3 className="form-title">Send a Message</h3>
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-row">
                  <div
                    className={`form-group ${focusedField === 'name' ? 'focused' : ''}`}
                  >
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div
                    className={`form-group ${focusedField === 'email' ? 'focused' : ''}`}
                  >
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>
                <div
                  className={`form-group ${focusedField === 'subject' ? 'focused' : ''}`}
                >
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('subject')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Project Inquiry"
                    required
                  />
                </div>
                <div
                  className={`form-group ${focusedField === 'message' ? 'focused' : ''}`}
                >
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="btn-primary submit-btn"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="spin-anim" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={18} /> Send Message
                    </>
                  )}
                </motion.button>
              </form>
              <div className="form-note">
                <MessageSquare size={14} />{' '}
                <span>Your information is secure and will never be shared.</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
