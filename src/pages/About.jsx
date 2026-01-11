import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const About = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-6 arabic-text">
            {t('about.title')}
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6 md:space-y-8"
        >
          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('about.description')}
          </p>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('about.paragraph2')}
          </p>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('about.paragraph3')}
          </p>

          <ul className="space-y-3 md:space-y-4 ml-6 md:ml-8">
            {t('about.points', { returnObjects: true }).map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-3"
              >
                <span className="text-primary mt-2">•</span>
                <span className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
                  {point}
                </span>
              </motion.li>
            ))}
          </ul>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('about.paragraph4')}
          </p>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('about.paragraph5')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

