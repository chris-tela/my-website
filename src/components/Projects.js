import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi';
import { FaPython, FaReact, FaDatabase, FaRobot } from 'react-icons/fa';
import {
  SiTypescript, SiPostgresql, SiScikitlearn, SiFastapi, SiNextdotjs,
  SiTailwindcss
} from 'react-icons/si';
import nuzlockeImg from '../assets/images/nuzlocke.jpg';
import nhlWordleImg from '../assets/images/nhlwordle.png';
import carelinkImg from '../assets/images/carelink.png';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: 'Pokemon Nuzlocke Tracker',
      description: 'A comprehensive web application for tracking Pokemon Nuzlocke challenge runs. Features include team management, encounter logging, and progress visualization.',
      image: nuzlockeImg,
      tags: ['TypeScript', 'React', 'PostgreSQL', 'Python'],
      tech: [SiTypescript, FaReact, SiPostgresql, FaPython],
      github: 'https://github.com/chris-tela/nuzlocke-tracker',
      category: 'fullstack',
      featured: true,
    },
    {
      title: 'NHL Wordle',
      description: 'An interactive player guessing game inspired by Wordle. Players guess NHL players based on attributes revealed from previous guesses.',
      image: nhlWordleImg,
      tags: ['Python', 'FastAPI', 'React', 'REST API'],
      tech: [FaPython, SiFastapi, FaReact],
      github: 'https://github.com/chris-tela/nhlapi',
      category: 'fullstack',
      featured: true,
    },
    {
      title: 'Credit Card Fraud Detector',
      description: 'Machine learning model achieving 96% accuracy in detecting fraudulent credit card transactions using advanced classification techniques.',
      image: null,
      tags: ['Python', 'Scikit-learn', 'Pandas', 'ML'],
      tech: [FaPython, SiScikitlearn],
      github: 'https://github.com/chris-tela/creditcard-fraud',
      category: 'ml',
      featured: true,
    },
    {
      title: 'CareLink',
      description: 'A application for managing healthcare coordination in remote Canadian areas. 2nd place at the 2025 Spark x Western Developer\'s Society Hackathon.',
      image: carelinkImg,
      tags: ["Next.js", "Tailwind", "TypeScript", "React", "CouchDB", "IndexedDB", "Groq API"],
      tech: [SiNextdotjs, SiTailwindcss, SiTypescript, FaReact, FaDatabase, FaDatabase, FaRobot],
      category: 'fullstack',
      featured: true,
    }
  ];

  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'fullstack', label: 'Full Stack' },
    { id: 'ml', label: 'Machine Learning' },
    { id: 'algorithms', label: 'Algorithms' },
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter((p) => p.category === filter);

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 },
    },
  };

  return (
    <section id="projects" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-2">
            My Work
          </h2>
          <h3 className="section-heading">
            Featured <span className="gradient-text">Projects</span>
          </h3>
          <p className="section-subheading">
            A collection of projects showcasing my skills in software development,
            machine learning, and problem-solving
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
        >
          {filters.map((f) => (
            <motion.button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                filter === f.id
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : 'bg-white dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {f.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={itemVariants}
                layout
                className="group"
              >
                <div className="h-full glass-card overflow-hidden hover:shadow-2xl transition-all duration-300">
                  {/* Project Image or Placeholder */}
                  <div className="relative h-48 bg-gradient-to-br from-primary-500/20 to-accent-500/20 overflow-hidden">
                    {project.featured && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 text-xs font-semibold bg-primary-500 text-white rounded-full">
                          Featured
                        </span>
                      </div>
                    )}
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={`${project.title} screenshot`}
                        className="absolute inset-0 h-full w-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <FiFolder className="w-16 h-16 text-primary-500/50 group-hover:scale-110 transition-transform" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-500 transition-colors">
                      {project.title}
                    </h4>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Icons */}
                    <div className="flex items-center gap-3 mb-4">
                      {project.tech.map((Icon, i) => (
                        <Icon
                          key={i}
                          className="w-5 h-5 text-gray-500 dark:text-gray-400 hover:text-primary-500 transition-colors"
                        />
                      ))}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-dark-200 text-gray-600 dark:text-gray-400 rounded-md"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      >
                        <FiGithub className="w-4 h-4" />
                        View Code
                      </a>
                      {project.live && (
                        <a
                          href={project.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                        >
                          <FiExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View More on GitHub */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <a
            href="https://github.com/chris-tela"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary inline-flex items-center gap-2"
          >
            <FiGithub className="w-5 h-5" />
            View More on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
