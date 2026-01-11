import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Quality = () => {
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
            {t('quality.title')}
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
            {t('quality.description')}
          </p>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('quality.paragraph2')}
          </p>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('quality.paragraph3')}
          </p>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('quality.paragraph4')}
          </p>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text">
            {t('quality.paragraph5')}
          </p>

          <p className="font-body text-base md:text-lg text-secondary/70 leading-relaxed font-light arabic-text font-medium">
            {t('quality.paragraph6')}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Quality;
