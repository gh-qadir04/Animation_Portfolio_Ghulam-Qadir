import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, GraduationCap, MapPin, Users } from 'lucide-react';

const highlights = [
  {
    icon: GraduationCap,
    label: 'Education',
    value: 'BS Computer Science (Data Science & AI)',
    detail: "7th Semester | Dean's Honor List",
  },
  {
    icon: Award,
    label: 'Achievements',
    value: "Dean's Honor List",
    detail: 'DataCamp ML & Python Certificates',
  },
  {
    icon: Users,
    label: 'Experience',
    value: 'Teaching Assistant',
    detail: 'CS Department, IUB',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Ghotki, Pakistan',
    detail: 'Available for Remote Work',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
} as const;

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="about" aria-label="About Ghulam Qadir">
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      <div className="section-container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About Me</span>
          <h2 className="section-title">Who I Am</h2>
          <p className="section-subtitle">
            A passionate developer bridging the gap between web technologies and
            data science
          </p>
        </motion.div>

        <div className="about-grid">
          {/* Image Column */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="about-image-container">
              <div className="image-glow" />
              <img
                src="/assets/profile1.jpg"
                alt="Ghulam Qadir - Full-Stack Developer and Data Scientist from Ghotki, Pakistan, wearing a navy blue suit with red tie. Computer Science student at IUB with Dean's Honor List recognition."
                className="about-image"
                width="400"
                height="400"
                loading="eager"
              />
              <div className="image-border" />
              <motion.div
                className="experience-badge"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.9, type: 'spring', stiffness: 200 }}
              >
                <span className="exp-years">3+</span>
                <span className="exp-text">
                  Years of
                  <br />
                  Learning & Building
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            className="about-content"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <motion.h3 variants={itemVariants} className="about-heading">
              Building Digital Solutions with{' '}
              <span className="gradient-text">Code & Data</span>
            </motion.h3>

            <motion.p variants={itemVariants} className="about-text">
              I'm <strong>Ghulam Qadir</strong>, a Computer Science student at{' '}
              <strong>The Islamia University of Bahawalpur (IUB)</strong>, currently in my 7th semester with
              a specialization in Data Science & AI. I've made the Dean's Honor
              List and hold certifications in Machine Learning and Python from
              DataCamp.
            </motion.p>

            <motion.p variants={itemVariants} className="about-text">
              As a Teaching Assistant in the CS Department, I help peers master
              programming and machine learning concepts. This experience has
              sharpened my communication skills and deepened my technical
              understanding.
            </motion.p>

            <motion.p variants={itemVariants} className="about-text">
              I specialize in building full-stack web applications with{' '}
              <strong>React</strong> and <strong>Django</strong>, while also
              leveraging data science and machine learning to create intelligent,
              data-driven solutions. Whether you need a modern web application,
              a robust database system, or ML-powered insights — I'm ready to
              deliver.
            </motion.p>

            <motion.div variants={itemVariants} className="about-highlights">
              {highlights.map((item) => (
                <motion.div
                  key={item.label}
                  className="highlight-card"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="highlight-icon">
                    <item.icon size={20} />
                  </div>
                  <div className="highlight-info">
                    <span className="highlight-label">{item.label}</span>
                    <span className="highlight-value">{item.value}</span>
                    <span className="highlight-detail">{item.detail}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}