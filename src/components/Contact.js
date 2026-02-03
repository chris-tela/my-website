import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiMail, FiMapPin, FiGithub, FiLinkedin, FiSend, FiCopy, FiCheck } from 'react-icons/fi';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [copied, setCopied] = useState(false);

  const email = 'telachristopher4@gmail.com';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const contactMethods = [
    {
      icon: FiMail,
      label: 'Email',
      value: email,
      href: `mailto:${email}`,
      color: 'from-red-500 to-orange-500',
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'Toronto, Ontario',
      href: null,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: FiGithub,
      label: 'GitHub',
      value: 'chris-tela',
      href: 'https://github.com/chris-tela',
      color: 'from-gray-600 to-gray-800',
    },
    {
      icon: FiLinkedin,
      label: 'LinkedIn',
      value: 'Christopher Tela',
      href: 'https://www.linkedin.com/in/christopher-tela/',
      color: 'from-blue-600 to-blue-800',
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
    <section id="contact" className="py-20 lg:py-32 bg-gray-50 dark:bg-dark-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-sm font-semibold text-primary-500 uppercase tracking-wider mb-2">
            Get in Touch
          </h2>
          <h3 className="section-heading">
            Let's <span className="gradient-text">Connect</span>
          </h3>
          <p className="section-subheading">
            Have a project in mind or just want to chat? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="grid md:grid-cols-2 gap-6 mb-12"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.label}
                variants={itemVariants}
                className="group"
              >
                {method.href ? (
                  <a
                    href={method.href}
                    target={method.href.startsWith('mailto') ? undefined : '_blank'}
                    rel={method.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                    className="block"
                  >
                    <div className="glass-card p-6 hover:shadow-2xl transition-all duration-300 h-full">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} shrink-0`}>
                          <method.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            {method.label}
                          </p>
                          <p className="font-semibold text-gray-900 dark:text-white group-hover:text-primary-500 transition-colors">
                            {method.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="glass-card p-6 h-full">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-r ${method.color} shrink-0`}>
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                          {method.label}
                        </p>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {method.value}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Email Action */}
          <motion.div
            className="glass-card p-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Drop me a line
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Feel free to reach out for collaborations, opportunities, or just to say hi!
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={`mailto:${email}`}
                className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <FiSend className="w-5 h-5" />
                Send Email
              </a>

              <motion.button
                onClick={handleCopyEmail}
                className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (
                  <>
                    <FiCheck className="w-5 h-5 text-green-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <FiCopy className="w-5 h-5" />
                    Copy Email
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-sm">Currently available for new opportunities</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
