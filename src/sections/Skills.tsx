import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Code2,
  Database,
  Palette,
  Brain,
  Server,
  GitBranch,
  Terminal,
  Layers,
  Cpu,
  BarChart3,
  Globe,
} from 'lucide-react';

const categories = [
  { id: 'all', label: 'All Skills' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'data', label: 'Data Science' },
  { id: 'tools', label: 'Tools' },
];

const skillsList = [
  { name: 'HTML5', category: 'frontend', level: 95, icon: Code2, color: '#e34c26' },
  { name: 'CSS3', category: 'frontend', level: 92, icon: Palette, color: '#264de4' },
  { name: 'JavaScript (ES6+)', category: 'frontend', level: 88, icon: Terminal, color: '#f7df1e' },
  { name: 'React.js', category: 'frontend', level: 85, icon: Layers, color: '#61dafb' },
  { name: 'Bootstrap', category: 'frontend', level: 90, icon: Globe, color: '#7952b3' },
  { name: 'Django', category: 'backend', level: 82, icon: Server, color: '#44b78b' },
  { name: 'PHP', category: 'backend', level: 75, icon: Code2, color: '#777bb4' },
  { name: 'PostgreSQL', category: 'backend', level: 80, icon: Database, color: '#336791' },
  { name: 'REST API', category: 'backend', level: 85, icon: Globe, color: '#ff6b6b' },
  { name: 'Python', category: 'data', level: 90, icon: Terminal, color: '#3776ab' },
  { name: 'Machine Learning', category: 'data', level: 78, icon: Brain, color: '#ff6b9d' },
  { name: 'Data Analysis', category: 'data', level: 85, icon: BarChart3, color: '#10b981' },
  { name: 'Pandas & NumPy', category: 'data', level: 88, icon: Cpu, color: '#150458' },
  { name: 'Scikit-Learn', category: 'data', level: 80, icon: Brain, color: '#f7931e' },
  { name: 'Git & GitHub', category: 'tools', level: 88, icon: GitBranch, color: '#f05032' },
  { name: 'Jupyter Notebook', category: 'tools', level: 90, icon: Terminal, color: '#f37626' },
  { name: 'Streamlit', category: 'tools', level: 75, icon: Globe, color: '#ff4b4b' },
  { name: 'VS Code', category: 'tools', level: 92, icon: Code2, color: '#007acc' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, type: 'spring' as const, stiffness: 100 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredSkills =
    activeCategory === 'all'
      ? skillsList
      : skillsList.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="skills">
      <div className="grid-pattern" />

      <div className="section-container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">My Expertise</span>
          <h2 className="section-title">Technical Skills</h2>
          <p className="section-subtitle">
            A versatile toolkit spanning web development, data science, and
            machine learning
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="skills-categories"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`category-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          key={activeCategory}
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => (
              <motion.div
                key={skill.name}
                className="skill-card"
                variants={itemVariants}
                layout
                initial="hidden"
                animate="visible"
                exit="exit"
                whileHover={{ y: -6, scale: 1.02, transition: { type: 'spring', stiffness: 300 } }}
              >
                <div className="skill-header">
                  <div
                    className="skill-icon"
                    style={{ background: `${skill.color}18`, color: skill.color }}
                  >
                    <skill.icon size={22} />
                  </div>
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-percent">{skill.level}%</span>
                </div>
                <div className="skill-bar-bg">
                  <motion.div
                    className="skill-bar-fill"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{
                      duration: 1.5,
                      delay: 0.3 + Math.random() * 0.3,
                      ease: 'easeOut',
                    }}
                    style={{
                      background: `linear-gradient(90deg, ${skill.color}, ${skill.color}99)`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Summary */}
        <motion.div
          className="skills-summary"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="summary-card">
            <div className="summary-item">
              <span className="summary-number">8+</span>
              <span className="summary-text">Frontend Technologies</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-number">4+</span>
              <span className="summary-text">Backend Technologies</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-number">5+</span>
              <span className="summary-text">Data Science Tools</span>
            </div>
            <div className="summary-divider" />
            <div className="summary-item">
              <span className="summary-number">4+</span>
              <span className="summary-text">Dev Tools</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
