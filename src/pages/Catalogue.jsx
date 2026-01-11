import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import productsData from '../data/products.json';

const Catalogue = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const categories = [
    { id: 'all', label: t('catalogue.all') },
    { id: 'fruits', label: t('catalogue.fruits') },
    { id: 'vegetables', label: t('catalogue.vegetables') },
    { id: 'cheese', label: t('catalogue.cheese') },
    { id: 'chocolates', label: t('catalogue.chocolates') },
    { id: 'yogurt', label: t('catalogue.yogurt') },
  ];

  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProducts(productsData);
    } else {
      setFilteredProducts(
        productsData.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory]);

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="section-title font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-4 md:mb-6"
          >
            {t('catalogue.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-body text-sm md:text-base lg:text-lg text-secondary/60 max-w-2xl mx-auto font-light arabic-text"
          >
            {t('catalogue.subtitle')}
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8 md:mb-12"
        >
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 lg:gap-4">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 md:px-5 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-xl font-body font-light text-xs md:text-sm lg:text-base transition-all duration-300 shadow-md ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-primary/90 text-tertiary shadow-xl'
                    : 'bg-white text-secondary hover:bg-tertiary hover:text-primary hover:shadow-lg'
                }`}
              >
                {category.label}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
              >
                <ProductCard product={product} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="text-center py-20"
          >
            <p className="font-body text-base md:text-xl text-secondary/60 font-light arabic-text">
              {t('catalogue.noProducts')}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Catalogue;

