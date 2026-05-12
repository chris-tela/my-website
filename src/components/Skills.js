import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  FaReact, FaNodeJs, FaPython, FaJava, FaGitAlt, FaHtml5, FaDocker,
  FaChartLine, FaChartBar, FaAws
} from 'react-icons/fa';
import {
  SiJavascript, SiTypescript, SiPostgresql, SiMongodb, SiTailwindcss,
  SiPandas, SiNumpy, SiScikitlearn, SiCplusplus, SiDotnet,
  SiGooglecloud, SiJenkins, SiPostman, SiFastapi, SiFlask, SiLinux,
  SiJira, SiKubernetes, SiSelenium, SiConfluence
} from 'react-icons/si';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Languages',
      skills: [
        { name: 'Python', icon: FaPython, color: '#3776AB' },
        { name: 'Java', icon: FaJava, color: '#ED8B00' },
        { name: 'C/C++', icon: SiCplusplus, color: '#00599C' },
        { name: 'C#', icon: SiDotnet, color: '#512BD4' },
        { name: 'SQL (Postgres)', icon: SiPostgresql, color: '#4169E1' },
        { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
        { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
        { name: 'HTML/CSS', icon: FaHtml5, color: '#E34F26' },
      ],
    },
    {
      title: 'Developer Tools',
      skills: [
        { name: 'Jira', icon: SiJira, color: '#0052CC' },
        { name: 'Jenkins', icon: SiJenkins, color: '#D24939' },
        { name: 'Linux', icon: SiLinux, color: '#FCC624' },
        { name: 'Git', icon: FaGitAlt, color: '#F05032' },
        { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
        { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
        { name: 'AWS', icon: FaAws, color: '#FF9900' },
        { name: 'Google Cloud', icon: SiGooglecloud, color: '#4285F4' },
        { name: 'Power BI', icon: FaChartBar, color: '#F2C811' },
        { name: 'Selenium', icon: SiSelenium, color: '#43B02A' },
        { name: 'Confluence', icon: SiConfluence, color: '#172B4D' },
        { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      ],
    },
    {
      title: 'Libraries & Frameworks',
      skills: [
        { name: 'React', icon: FaReact, color: '#61DAFB' },
        { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
        { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
        { name: 'Flask', icon: SiFlask, color: '#000000' },
        { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
        { name: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
        { name: 'NumPy', icon: SiNumpy, color: '#013243' },
        { name: 'Pandas', icon: SiPandas, color: '#150458' },
        { name: 'Matplotlib', icon: FaChartLine, color: '#11557C' },
        { name: 'Scikit-learn', icon: SiScikitlearn, color: '#F7931E' },
      ],
    },
  ];

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
    <section id="skills" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-2">
            My Toolkit
          </h2>
          <h3 className="section-heading">
            Skills & <span className="gradient-text">Technologies</span>
          </h3>
          <p className="section-subheading">
            A comprehensive set of tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="space-y-12"
        >
          {skillCategories.map((category) => (
            <motion.div key={category.title} variants={itemVariants}>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    className="group relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-dark-100 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800">
                      <skill.icon
                        className="w-6 h-6 transition-transform group-hover:scale-110"
                        style={{ color: skill.color }}
                      />
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          {[
            { number: '20+', label: 'Technologies' },
            { number: '5+', label: 'Work Experiences' },
            { number: '3rd', label: 'Year CS Student' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-white dark:bg-dark-100 shadow-lg"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
