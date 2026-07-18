import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  ExternalLink,
  Github,
  Code2,
  LayoutDashboard,
  MessageSquare,
  FileText,
  BarChart3,
  Bot,
  Filter,
  X,
  Eye,
  TrendingUp,
} from 'lucide-react';

const filters = [
  { id: 'all', label: 'All Projects' },
  { id: 'web', label: 'Web Development' },
  { id: 'data', label: 'Data Science' },
  { id: 'ml', label: 'Machine Learning' },
];

const projectsList = [
  {
    id: 1,
    title: 'Mentor Michael FX - Trading Platform',
    category: 'web',
    description:
      'A professional web platform for a forex and commodity trading mentor, specializing in XAU/USD (Gold). Built with a modern, responsive UI to showcase mentorship services, trading strategies, and market insights.',
    tech: ['React', 'Tailwind CSS', 'JavaScript', 'Netlify'],
    image: '/assets/mentormichael.jpg',
    imageAlt: 'Mentor Michael FX trading platform dashboard showing XAU/USD Gold price charts, buy signals, and professional forex trading interface with dark theme',
    icon: TrendingUp,
    color: '#fbbf24',
    github: 'https://github.com/gh-qadir04/MentorMichaelfx-website-trading-XAUUSD',
    live: 'https://mentormichaeltrader.netlify.app',
    features: [
      'XAU/USD Trading Focus',
      'Mentorship Services Showcase',
      'Responsive Modern UI',
      'Fast Loading Performance',
      'Custom Animations',
    ],
  },
  {
    id: 2,
    title: 'Animation Portfolio — Ghulam Qadir',
    category: 'web',
    description:
      'A modern, interactive portfolio website featuring smooth scroll animations, 3D card tilt effects with mouse-tracking perspective, and a dynamic project showcase with filtering by category.',
    tech: ['React 18', 'Vite', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Lucide React'],
    icon: LayoutDashboard,
    color: '#06b6d4',
    github: 'https://github.com/gh-qadir04/Animation_Portfolio_Ghulam-Qadir',
    live: 'https://qadirportfolioanimation.netlify.app/',
    features: [
      'Smooth Scroll Animations',
      '3D Tilt Cards with Mouse Tracking',
      'Project Filtering by Category',
      'Responsive Design',
      'Project Modal with Details',
      'Dark Theme with Gradient Accents',
    ],
  },
  {
    id: 3,
    title: 'SaaS Analytics Dashboard',
    category: 'web',
    description:
      'A comprehensive analytics dashboard with real-time data visualization, user management, role-based access control, and interactive charts for business insights.',
    tech: ['React', 'Chart.js', 'Django', 'PostgreSQL', 'Bootstrap'],
    icon: LayoutDashboard,
    color: '#8b5cf6',
    github: 'https://github.com/gh-qadir04',
    live: '#',
    features: [
      'Real-time Charts',
      'User Management',
      'Role-based Access',
      'Data Export',
      'Dark Mode',
    ],
  },
  {
    id: 4,
    title: 'Real Estate Listing App',
    category: 'web',
    description:
      'Property listing platform with advanced search filters, map integration, contact forms, and an admin panel for property management.',
    tech: ['React', 'Django', 'PostgreSQL', 'Bootstrap', 'Google Maps API'],
    icon: LayoutDashboard,
    color: '#10b981',
    github: 'https://github.com/gh-qadir04',
    live: '#',
    features: [
      'Map Integration',
      'Advanced Filters',
      'Contact Forms',
      'Image Gallery',
      'Property Comparison',
    ],
  },
  {
    id: 5,
    title: 'HR Resume Parser',
    category: 'ml',
    description:
      'An intelligent resume parsing system using NLP to extract information, match candidates with job descriptions, and rank applicants based on relevance.',
    tech: ['Python', 'NLP', 'Scikit-Learn', 'Pandas', 'React'],
    icon: FileText,
    color: '#f59e0b',
    github: 'https://github.com/gh-qadir04',
    live: '#',
    features: [
      'PDF Parsing',
      'Keyword Matching',
      'Candidate Ranking',
      'NLP Processing',
      'Dashboard UI',
    ],
  },
  {
    id: 6,
    title: 'Patient Attendance Predictor',
    category: 'data',
    description:
      'Predictive analytics model for dental appointment no-shows using machine learning. Includes interactive visualizations and Streamlit deployment.',
    tech: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Streamlit'],
    icon: BarChart3,
    color: '#ec4899',
    github: 'https://github.com/gh-qadir04',
    live: '#',
    features: [
      'Predictive Model',
      'Data Visualization',
      'Interactive Charts',
      'Feature Analysis',
      'Streamlit App',
    ],
  },
  {
    id: 7,
    title: 'Sentiment Analysis API',
    category: 'ml',
    description:
      'Real-time sentiment analysis service with REST API endpoints. Analyzes text data and returns sentiment scores with confidence levels.',
    tech: ['Python', 'NLP', 'Django REST', 'React', 'PostgreSQL'],
    icon: MessageSquare,
    color: '#6366f1',
    github: 'https://github.com/gh-qadir04',
    live: '#',
    features: [
      'REST API',
      'Real-time Analysis',
      'Confidence Scoring',
      'Batch Processing',
      'React Frontend',
    ],
  },
  {
    id: 8,
    title: 'Cafe Chatbot AI',
    category: 'ml',
    description:
      'Intelligent chatbot for cafe customer service using NLP and machine learning. Handles menu queries, orders, and customer support automatically.',
    tech: ['Python', 'NLP', 'Scikit-Learn', 'React', 'Bootstrap'],
    icon: Bot,
    color: '#8b5cf6',
    github: 'https://github.com/gh-qadir04',
    live: '#',
    features: [
      'NLP Processing',
      'Menu Queries',
      'Order Handling',
      'Context Awareness',
      'Responsive UI',
    ],
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
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, type: 'spring' as const, stiffness: 80 },
  },
};

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  }, []);

  return (
    <div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.15s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<(typeof projectsList)[0] | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredProjects =
    activeFilter === 'all'
      ? projectsList
      : projectsList.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="projects" aria-label="Portfolio Projects">
      <div className="glow-orb glow-orb-1" />

      <div className="section-container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Portfolio</span>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            A showcase of my best work across web development and data science
          </p>
        </motion.div>

        {/* Filter */}
        <motion.div
          className="projects-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter.id)}
            >
              <Filter size={14} /> {filter.label}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          key={activeFilter}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
              >
                <TiltCard className="project-card">
                  <div className="project-image-wrapper">
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        className="project-image"
                        width="800"
                        height="450"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="project-image-placeholder"
                        style={{
                          background: `linear-gradient(135deg, ${project.color}18, ${project.color}05)`,
                        }}
                      >
                        <project.icon size={48} style={{ color: project.color }} />
                      </div>
                    )}
                    <div className="project-overlay">
                      <motion.button
                        className="project-view-btn"
                        onClick={() => setSelectedProject(project)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Eye size={20} /> View Details
                      </motion.button>
                    </div>
                    <div
                      className="project-category-badge"
                      style={{ background: project.color }}
                    >
                      {project.category === 'web'
                        ? 'Web Dev'
                        : project.category === 'data'
                          ? 'Data Science'
                          : 'ML'}
                    </div>
                  </div>
                  <div className="project-content">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    <div className="project-tech">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="project-links">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        <Github size={16} /> Code
                      </a>
                      <a href={project.live} className="project-link live">
                        <ExternalLink size={16} /> Live Demo
                      </a>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              onClick={(e: React.MouseEvent) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>
              <div className="modal-header">
                {selectedProject.image ? (
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.imageAlt}
                    className="modal-project-image"
                    width="800"
                    height="450"
                  />
                ) : (
                  <div
                    style={{
                      background: `linear-gradient(135deg, ${selectedProject.color}18, ${selectedProject.color}05)`,
                      padding: '40px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <selectedProject.icon
                      size={64}
                      style={{ color: selectedProject.color }}
                    />
                  </div>
                )}
              </div>
              <div className="modal-content">
                <h3 className="modal-title">{selectedProject.title}</h3>
                <p className="modal-description">
                  {selectedProject.description}
                </p>
                <div className="modal-section">
                  <h4>Key Features</h4>
                  <div className="modal-features">
                    {selectedProject.features.map((feature, i) => (
                      <span key={i} className="feature-tag">
                        <Code2 size={14} /> {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="modal-section">
                  <h4>Technologies</h4>
                  <div className="modal-tech">
                    {selectedProject.tech.map((tech, i) => (
                      <span key={i} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="modal-links">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    <Github size={18} /> View Code
                  </a>
                  <a href={selectedProject.live} className="btn-secondary">
                    <ExternalLink size={18} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}