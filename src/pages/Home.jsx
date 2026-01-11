import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import productsData from '../data/products.json';
import { getImagePath } from '../utils/imagePath';

const Home = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24">
        {/* Animated Background Gradient */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-secondary gradient-animated"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        {/* Background Image with Parallax Effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center opacity-15 md:opacity-20"
          style={{
            backgroundImage: `url('${getImagePath('/images/Homepage hero/Gemini_Generated_Image_p5gzk0p5gzk0p5gz.png')}')`,
          }}
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent" />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center px-4 md:px-6 max-w-5xl mx-auto w-full"
        >
          {/* Company Name */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light text-white leading-tight drop-shadow-2xl mb-6 md:mb-8 arabic-text"
          >
            {t('home.hero.title')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-base sm:text-lg md:text-xl lg:text-2xl text-tertiary/90 mb-8 md:mb-12 max-w-4xl mx-auto leading-relaxed font-light arabic-text"
          >
            {t('home.hero.subtitle')}
          </motion.p>
        </motion.div>
      </section>

      {/* Our Productions Section - Horizontal Scrolling */}
      <section className="py-16 md:py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-6 arabic-text">
              {t('home.ourProductions.title')}
            </h2>
          </motion.div>
          
          {/* Horizontal Scrolling Container */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide pb-4">
              <div className="flex gap-4 md:gap-6" style={{ width: 'max-content' }}>
                {[
                  '/images/our productions/IMG-20260110-WA0026.jpg',
                  '/images/our productions/IMG-20260110-WA0027.jpg',
                  '/images/our productions/IMG-20260110-WA0028.jpg',
                  '/images/our productions/IMG-20260110-WA0029.jpg',
                  '/images/our productions/IMG-20260110-WA0030.jpg',
                  '/images/our productions/IMG-20260110-WA0031.jpg',
                  '/images/our productions/IMG-20260110-WA0032.jpg',
                  '/images/our productions/IMG-20260110-WA0033.jpg',
                  '/images/our productions/IMG-20260110-WA0034.jpg'
                ].map((imagePath, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="flex-shrink-0"
                  >
                    <div className="relative w-64 md:w-80 lg:w-96 h-64 md:h-80 lg:h-96 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={imagePath}
                        alt={`Production ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Three Cards */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-white via-gray-50/50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {/* Frozen Quality */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, type: "spring" }}
                className="relative group"
              >
                <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-primary/20 h-full">
                  <h3 className="font-heading text-2xl md:text-3xl font-light text-secondary mb-4 md:mb-6 group-hover:text-primary transition-colors duration-300 arabic-text leading-tight">
                    {t('home.values.ownFarms.title')}
                  </h3>
                  <p className="font-body text-sm md:text-base text-secondary/50 leading-relaxed font-light arabic-text">
                    {t('home.values.ownFarms.description')}
                  </p>
                </div>
              </motion.div>

              {/* Unique Chocolates */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.15, type: "spring" }}
                className="relative group"
              >
                <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-primary/20 h-full">
                  <h3 className="font-heading text-2xl md:text-3xl font-light text-secondary mb-4 md:mb-6 group-hover:text-primary transition-colors duration-300 arabic-text leading-tight">
                    {t('home.values.uniqueChocolates.title')}
                  </h3>
                  <p className="font-body text-sm md:text-base text-secondary/50 leading-relaxed font-light arabic-text">
                    {t('home.values.uniqueChocolates.description')}
                  </p>
                </div>
              </motion.div>

              {/* Quality Cheeses */}
              <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
                className="relative group"
              >
                <div className="relative z-10 bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-gray-100/50 shadow-sm hover:shadow-xl transition-all duration-500 group-hover:border-primary/20 h-full">
                  <h3 className="font-heading text-2xl md:text-3xl font-light text-secondary mb-4 md:mb-6 group-hover:text-primary transition-colors duration-300 arabic-text leading-tight">
                    {t('home.values.qualityCheeses.title')}
                  </h3>
                  <p className="font-body text-sm md:text-base text-secondary/50 leading-relaxed font-light arabic-text">
                    {t('home.values.qualityCheeses.description')}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16 md:mb-24"
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-secondary mb-6 md:mb-8 arabic-text leading-tight">
              {t('home.whyChoose.title')}
            </h2>
            <p className="font-body text-lg md:text-xl text-secondary/70 max-w-3xl mx-auto font-light arabic-text leading-relaxed mb-8">
              {t('home.whyChoose.subtitle')}
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 md:space-y-6">
              {t('home.whyChoose.points', { returnObjects: true }).map((point, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2" />
                  <p className="font-body text-base md:text-lg text-secondary/70 font-light arabic-text leading-relaxed">
                    {point}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Certificates Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-6 arabic-text">
              {t('home.certificates.title')}
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
            {[
              '/images/Certificates/BRGS.png',
              '/images/Certificates/Global gap.png',
              '/images/Certificates/onssa-logo-png_seeklogo-393584.png'
            ].map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-4 md:p-6 flex items-center justify-center shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={getImagePath(cert)}
                  alt={`Certificate ${index + 1}`}
                  className="max-w-full h-auto object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 md:mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-4 arabic-text">
              {t('home.products.title')}
            </h2>
            <p className="font-body text-base md:text-lg text-secondary/60 font-light arabic-text">
              {t('home.products.subtitle')}
            </p>
          </motion.div>
          
          {/* Production Gallery Products - Show only 6, exclude avocats and poivron, include 2 chocolates */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8 md:mb-12">
              {(() => {
                // Filter out avocats and poivron
                const filtered = productsData.filter(product => 
                  product.id !== 'avocats' && product.id !== 'poivron'
                );
                // Get 2 chocolates
                const chocolates = filtered.filter(p => p.category === 'chocolates').slice(0, 2);
                // Get 4 other products (non-chocolates)
                const others = filtered.filter(p => p.category !== 'chocolates').slice(0, 4);
                // Combine: 4 others + 2 chocolates
                return [...others, ...chocolates];
              })().map((product, index) => {
                const translation = product.translations[currentLang] || product.translations.fr;
                const categoryLabels = {
                  fruits: t('catalogue.fruits'),
                  vegetables: t('catalogue.vegetables'),
                  cheese: t('catalogue.cheese'),
                  chocolates: t('catalogue.chocolates'),
                  yogurt: t('catalogue.yogurt'),
                };
                return (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="card-premium group h-full"
                  >
                    <div className="relative h-56 md:h-64 bg-gradient-to-br from-tertiary/20 to-tertiary/10 overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={translation.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        onError={(e) => {
                          console.error('Image failed to load:', product.images[0]);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-primary/95 backdrop-blur-sm text-tertiary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-body font-light shadow-lg z-20">
                        {categoryLabels[product.category] || product.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-lg md:text-xl font-light text-secondary mb-3 line-clamp-2">
                        {translation.name}
                      </h3>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Explore More CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <Link to="/production-gallery">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-primary to-primary/90 text-tertiary font-body font-light text-base md:text-lg py-4 px-8 md:px-12 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3 mx-auto"
                >
                  <span>{t('home.products.exploreMore', 'Explore More')}</span>
                  <ArrowRight size={20} />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-primary via-primary/95 to-secondary relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3">
                29+
              </div>
              <div className="font-body text-base md:text-lg text-tertiary/90 font-light arabic-text">
                {t('home.stats.productsAvailable')}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3">
                358%
              </div>
              <div className="font-body text-base md:text-lg text-tertiary/90 font-light arabic-text">
                {t('home.stats.customerSatisfaction')}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-white mb-3">
                3,000
              </div>
              <div className="font-body text-base md:text-lg text-tertiary/90 font-light arabic-text">
                {t('home.stats.frozenTonsDelivered')}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
