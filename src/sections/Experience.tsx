import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award, BookOpen } from 'lucide-react';

const timelineItems = [
  {
    icon: Briefcase,
    title: 'Student Teaching Assistant',
    org: 'Computer Science Department, IUB',
    date: 'Apr 2026 - Present',
    color: '#6366f1',
    description: [
      'Assist peers and junior students during programming and ML lab sessions',
      'Help troubleshoot Python code and explain data structures',
      'Support faculty with organizing lab materials',
    ],
  },
  {
    icon: GraduationCap,
    title: "Bachelor's in Computer Science",
    org: 'The Islamia University of Bahawalpur (IUB)',
    date: '2022 - Present (7th Semester)',
    color: '#10b981',
    description: [
      "Specialization in Data Science & AI | Dean's Honor List",
      'Coursework: Machine Learning, Data Structures, Algorithms, Database Systems',
      'CGPA: Excellent Academic Standing',
    ],
  },
  {
    icon: Award,
    title: 'DataCamp Certifications',
    org: 'DataCamp Online Learning Platform',
    date: '2024 - 2025',
    color: '#f59e0b',
    description: [
      'Introduction to Machine Learning Certificate',
      'Python Basics Certificate',
      'Hands-on projects with real datasets',
    ],
  },
  {
    icon: BookOpen,
    title: "Dean's Honor List",
    org: 'The Islamia University of Bahawalpur',
    date: 'Multiple Semesters',
    color: '#ec4899',
    description: [
      "Recognized for outstanding academic performance",
      'Consistently maintained excellent grades',
      'Active participant in academic competitions',
    ],
  },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="experience" className="experience">
      <div className="glow-orb glow-orb-2" />

      <div className="section-container" ref={ref}>
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">My Journey</span>
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            Academic milestones and professional growth along my career path
          </p>
        </motion.div>

        <div className="timeline">
          {timelineItems.map((item, index) => (
            <motion.div
              key={item.title}
              className="timeline-item"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
            >
              <div className="timeline-node" style={{ background: item.color }} />
              <div className="timeline-content">
                <div
                  className="timeline-date"
                  style={{ color: item.color }}
                >
                  {item.date}
                </div>
                <h3 className="timeline-title">{item.title}</h3>
                <div className="timeline-org">{item.org}</div>
                <div className="timeline-desc">
                  <ul>
                    {item.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
