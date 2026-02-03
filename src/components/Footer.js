import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiHeart, FiArrowUp } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FiGithub, href: 'https://github.com/chris-tela', label: 'GitHub' },
    { icon: FiLinkedin, href: 'https://www.linkedin.com/in/christopher-tela/', label: 'LinkedIn' },
    { icon: FiMail, href: 'mailto:telachristopher4@gmail.com', label: 'Email' },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-dark-300 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo & Tagline */}
          <div className="text-center md:text-left">
            <motion.a
              href="#home"
              className="text-2xl font-bold gradient-text inline-block mb-2"
              whileHover={{ scale: 1.05 }}
            >
              Christopher Tela
            </motion.a>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Software Developer | Computer Science Student
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith('mailto') ? undefined : '_blank'}
                rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="p-3 rounded-xl bg-gray-100 dark:bg-dark-100 text-gray-600 dark:text-gray-400 hover:bg-primary-500 hover:text-white dark:hover:bg-primary-500 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                aria-label={social.label}
              >
                <social.icon size={20} />
              </motion.a>
            ))}
          </div>

          {/* Back to Top */}
          <motion.button
            onClick={scrollToTop}
            className="p-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <FiArrowUp size={20} />
          </motion.button>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-gray-200 dark:border-gray-800" />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p className="flex items-center gap-1">
            Made with <FiHeart className="w-4 h-4 text-red-500" /> by Christopher Tela
          </p>
          <p>
            &copy; {currentYear} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
