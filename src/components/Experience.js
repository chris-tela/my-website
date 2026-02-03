import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin } from 'react-icons/fi';
import trojanLogo from '../assets/images/trojantechnologies.png';
import wdsLogo from '../assets/images/western_dev_society_logo.jpg';
import techForSocialImpactLogo from '../assets/images/techforsocialimpact_logo.jpg';

const Experience = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const experiences = [
    {
      role: 'Software Developer & Test',
      company: 'Trojan Technologies',
      location: 'London, ON',
      date: 'April 2025 - Present',
      description: 'Creating innovative software solutions focused on automation and internal software testing tools.',
      logo: trojanLogo,
      highlights: [
        'Developed custom automation tool using C# and WPF to streamline product testing process',
        'Optimized CI/CD workflows using Jenkins for build verification and test coverage tracking',
        'Implemented and debugged Modbus RTU communication protocols (RS-232/RS-485)',
      ],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      role: 'Full-Stack Developer',
      company: "Western Developer's Society",
      location: 'London, ON',
      date: 'September 2024 - April 2025',
      description: 'Developed a Council Management application to automate meeting processes.',
      logo: wdsLogo,
      highlights: [
        'Designed and implemented full-stack solution using React Native, Express, Node.js, and SQL',
        'Integrated dynamic backend with complete database for secure data handling',
        'Collaborated with cross-functional team using Agile methodologies',
      ],
      color: 'from-purple-500 to-pink-500',
    },
    {
      role: 'Back-End Developer',
      company: 'Western Tech for Social Impact',
      location: 'London, ON',
      date: 'September 2024 - April 2025',
      description: 'Built a Social Service Accessibility application for accessing vital community resources.',
      logo: techForSocialImpactLogo,
      highlights: [
        'Integrated third-party APIs for real-time data updates on service hours and capacity',
        'Created and maintained PostgreSQL database schemas for social services information',
        'Improved app accessibility for users in critical need',
      ],
      color: 'from-orange-500 to-red-500',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-2">
            Career Journey
          </h2>
          <h3 className="section-heading">
            Work <span className="gradient-text">Experience</span>
          </h3>
          <p className="section-subheading">
            Building real-world solutions and gaining valuable industry experience
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 transform md:-translate-x-1/2 hidden md:block" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.role + exp.company}
              variants={itemVariants}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
              }`}
            >
              {/* Timeline Dot */}
              <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2">
                <motion.div
                  className={`w-4 h-4 rounded-full bg-gradient-to-r ${exp.color} shadow-lg`}
                  whileHover={{ scale: 1.5 }}
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ delay: index * 0.2 }}
                />
              </div>

              {/* Content Card */}
              <motion.div
                className={`glass-card p-6 md:p-8 ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                }`}
                whileHover={{ y: -5 }}
              >
                <div className={`flex items-start gap-4 ${index % 2 === 0 ? 'md:flex-row-reverse md:text-left' : ''}`}>
                  {/* Company Icon */}
                  <div className="shrink-0 w-12 h-12 flex items-center justify-center">
                    {exp.logo ? (
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="w-10 h-10 object-contain drop-shadow-sm"
                        loading="lazy"
                      />
                    ) : (
                      <FiBriefcase className="w-6 h-6 text-white" />
                    )}
                  </div>

                  <div className="flex-1">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                      {exp.role}
                    </h4>
                    <p className="text-lg font-semibold text-primary-500 mb-2">
                      {exp.company}
                    </p>

                    <div className={`flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4 ${index % 2 === 0 ? 'md:justify-start' : ''}`}>
                      <span className="flex items-center gap-1">
                        <FiCalendar className="w-4 h-4" />
                        {exp.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>

                    <ul className={`space-y-2 ${index % 2 === 0 ? 'md:text-left' : ''}`}>
                      {exp.highlights.map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.color} mt-2 shrink-0`} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
