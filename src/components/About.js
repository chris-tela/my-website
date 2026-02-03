import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMapPin, FiCode, FiCoffee, FiTarget } from 'react-icons/fi';

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const highlights = [
    { icon: FiMapPin, label: 'Location', value: 'Toronto, Ontario' },
    { icon: FiCode, label: 'Focus', value: 'Full-Stack Development' },
    { icon: FiTarget, label: 'Goal', value: 'Innovative Solutions' },
    { icon: FiCoffee, label: 'Fuel', value: 'Coffee & Curiosity' },
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="about" className="py-20 lg:py-32 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left Side - Image/Visual */}
          <motion.div variants={itemVariants} className="relative">
            <div className="relative z-10">
              <div className="aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-primary-500/20 to-accent-500/20 p-1">
                <div className="w-full h-full rounded-3xl bg-gray-100 dark:bg-dark-100 flex items-center justify-center relative overflow-hidden">
                  {/* Decorative Code Block */}
                  <div className="absolute inset-4 rounded-2xl bg-dark-200 p-6 font-mono text-sm text-left overflow-hidden">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                    </div>
                    <pre className="text-gray-400">
                      <code>
                        <span className="text-primary-400">const</span>{' '}
                        <span className="text-accent-400">developer</span> = {'{'}
                        {'\n'}  <span className="text-gray-500">name:</span>{' '}
                        <span className="text-green-400">"Chris Tela"</span>,
                        {'\n'}  <span className="text-gray-500">role:</span>{' '}
                        <span className="text-green-400">"Software Dev"</span>,
                        {'\n'}  <span className="text-gray-500">skills:</span> [
                        {'\n'}    <span className="text-green-400">"React"</span>,
                        {'\n'}    <span className="text-green-400">"Python"</span>,
                        {'\n'}    <span className="text-green-400">"Java"</span>,
                        {'\n'}    <span className="text-green-400">"ML/AI"</span>
                        {'\n'}  ],
                        {'\n'}  <span className="text-gray-500">passion:</span>{' '}
                        <span className="text-primary-400">true</span>
                        {'\n'}{'}'};
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-500/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent-500/20 rounded-full blur-2xl" />
          </motion.div>

          {/* Right Side - Content */}
          <motion.div variants={itemVariants}>
            <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-2">
              About Me
            </h2>
            <h3 className="section-heading">
              Building the Future,{' '}
              <span className="gradient-text">One Line at a Time</span>
            </h3>

            <div className="space-y-4 text-gray-600 dark:text-gray-400 mb-8">
              <p>
                I'm a passionate full-stack developer and Computer Science student at
                Western University, driven by the desire to create innovative software
                solutions that make a real impact.
              </p>
              <p>
                My journey in tech spans across software development, machine learning,
                and data analytics. I thrive on tackling complex problems and transforming
                ideas into functional, elegant applications.
              </p>
              <p>
                When I'm not coding, you'll find me exploring new technologies,
                contributing to team projects, or working on personal ventures that
                push the boundaries of what's possible.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="p-4 rounded-xl bg-gray-100 dark:bg-dark-100 hover:bg-gray-200 dark:hover:bg-dark-200 transition-colors group"
                  whileHover={{ scale: 1.02 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <item.icon className="w-6 h-6 text-primary-500 mb-2 group-hover:scale-110 transition-transform" />
                  <p className="text-xs text-gray-500 dark:text-gray-500 uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
