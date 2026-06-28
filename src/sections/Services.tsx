import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Globe,
  Database,
  Brain,
  BarChart3,
  Code2,
  Server,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

const servicesList = [
  {
    icon: Globe,
    title: 'Web Application Development',
    description:
      'Full-stack web applications using React, Django, and modern technologies. From concept to deployment with responsive, pixel-perfect designs.',
    features: ['React & Next.js', 'Django REST API', 'PostgreSQL', 'Responsive Design'],
    color: '#6366f1',
    popular: true,
  },
  {
    icon: Database,
    title: 'Database Design & Management',
    description:
      'Robust database architecture with PostgreSQL. Optimized schemas, efficient queries, and secure data handling for scalable applications.',
    features: ['PostgreSQL', 'Database Design', 'Query Optimization', 'Data Migration'],
    color: '#06b6d4',
    popular: false,
  },
  {
    icon: Brain,
    title: 'Machine Learning Solutions',
    description:
      'Custom ML models for classification, regression, and NLP tasks. From data preprocessing to model deployment with real-world applications.',
    features: ['Scikit-Learn', 'NLP', 'Model Training', 'API Deployment'],
    color: '#8b5cf6',
    popular: false,
  },
  {
    icon: BarChart3,
    title: 'Data Analysis & Visualization',
    description:
      'Transform raw data into actionable insights. Interactive dashboards, statistical analysis, and compelling visualizations.',
    features: ['Pandas & NumPy', 'Matplotlib', 'Streamlit', 'Statistical Analysis'],
    color: '#10b981',
    popular: false,
  },
  {
    icon: Code2,
    title: 'API Development & Integration',
    description:
      'RESTful APIs built with Django REST Framework. Secure authentication, comprehensive documentation, and third-party integrations.',
    features: ['REST API', 'Authentication', 'Documentation', 'Integration'],
    color: '#f59e0b',
    popular: false,
  },
  {
    icon: Server,
    title: 'Full-Stack Solutions',
    description:
      'End-to-end development from frontend to backend. Complete project delivery with modern architecture and best practices.',
    features: ['React + Django', 'PostgreSQL', 'Deployment', 'Maintenance'],
    color: '#ec4899',
    popular: true,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="services">
      <div className="grid-pattern" />

      <div className="section-container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">What I Offer</span>
          <h2 className="section-title">My Services</h2>
          <p className="section-subtitle">
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>

        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {servicesList.map((service) => (
            <motion.div
              key={service.title}
              className={`service-card ${service.popular ? 'popular' : ''}`}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { type: 'spring', stiffness: 300 },
              }}
            >
              {service.popular && (
                <div className="popular-badge">
                  <Sparkles size={14} /> Popular
                </div>
              )}
              <div
                className="service-icon-wrapper"
                style={{ background: `${service.color}12` }}
              >
                <service.icon size={30} style={{ color: service.color }} />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <div className="service-features">
                {service.features.map((feature, i) => (
                  <div key={i} className="service-feature">
                    <Zap size={14} style={{ color: service.color }} />{' '}
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              <motion.button
                onClick={scrollToContact}
                className="service-link"
                whileHover={{ x: 5 }}
              >
                Get Started <ArrowRight size={16} />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
