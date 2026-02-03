import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBook, FiAward, FiCalendar } from 'react-icons/fi';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = {
    school: 'Western University',
    degree: "Bachelor's of Science",
    major: 'Specialization in Computer Science',
    duration: 'September 2023 - August 2027',
    location: 'London, Ontario',
    courses: [
      { code: 'CS 2210', name: 'Data Structures & Algorithms' },
      { code: 'CS 2211', name: 'Software Tools & Systems Programming' },
      { code: 'CS 2212', name: 'Intro to Software Engineering' },
      { code: 'CS 2208', name: 'Computer Organization & Architecture' },
      { code: 'CS 2209', name: 'Applied Logic for Computer Science' },
      { code: 'MATH 2155', name: 'Discrete Mathematics' },
    ],
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="education" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-2">
            Academic Background
          </h2>
          <h3 className="section-heading">
            My <span className="gradient-text">Education</span>
          </h3>
          <p className="section-subheading">
            Building a strong foundation in computer science theory and practice
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="max-w-4xl mx-auto"
        >
          {/* Main Education Card */}
          <motion.div
            variants={itemVariants}
            className="glass-card p-8 md:p-12 mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              {/* University Logo/Icon */}
              <div className="shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 flex items-center justify-center shadow-lg">
                  <FiAward className="w-10 h-10 text-white" />
                </div>
              </div>

              {/* Education Details */}
              <div className="flex-1">
                <h4 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {education.school}
                </h4>
                <p className="text-xl font-semibold text-primary-500 mb-1">
                  {education.degree}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
                  {education.major}
                </p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <FiCalendar className="w-4 h-4" />
                    {education.duration}
                  </span>
                  <span className="flex items-center gap-2">
                    <FiBook className="w-4 h-4" />
                    {education.location}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Relevant Courses */}
          <motion.div variants={itemVariants}>
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Relevant Coursework
            </h4>
            <div className="grid md:grid-cols-2 gap-4">
              {education.courses.map((course, index) => (
                <motion.div
                  key={course.code}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white dark:bg-dark-100 shadow-md hover:shadow-lg transition-all duration-300 group"
                  whileHover={{ x: 10 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 shrink-0" />
                  <div>
                    <span className="text-sm font-mono text-primary-500">{course.code}</span>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      {course.name}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Academic Highlights */}
          <motion.div
            variants={itemVariants}
            className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {[
              { label: 'Year', value: '3rd Year' },
              { label: 'Focus', value: 'Software Dev' },
              { label: 'Expected', value: '2027' },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                className="text-center p-4 rounded-xl bg-gray-100 dark:bg-dark-100"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="text-2xl font-bold gradient-text">{item.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{item.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
