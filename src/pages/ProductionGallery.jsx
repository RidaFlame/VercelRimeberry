import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import { X, Eye } from 'lucide-react';
import productsData from '../data/products.json';
import { getImagePath } from '../utils/imagePath';

const ProductionGallery = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(1); // Start at 1 (skip cover)
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    let filtered = productsData;
    if (selectedCategory !== 'all') {
      filtered = productsData.filter(product => product.category === selectedCategory);
    }
    return filtered.map(product => {
      const translation = product.translations[currentLang] || product.translations.fr;
      return {
        id: product.id,
        name: translation.name,
        category: product.category,
        image: product.images[0], // Use cover image for card
        allImages: product.images, // Store all images
        product: product // Store full product for modal
      };
    });
  }, [selectedCategory, currentLang]);

  // Get unique categories
  const categories = ['all', 'fruits', 'vegetables', 'cheese', 'yogurt', 'chocolates'];

  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-6 arabic-text">
            {t('productionGallery.title')}
          </h1>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8 md:mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-body text-sm md:text-base transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary to-primary/90 text-tertiary shadow-lg'
                  : 'bg-white text-secondary border border-gray-200 hover:border-primary/50 hover:shadow-md'
              }`}
            >
              {t(`productionGallery.categories.${category}`, category.charAt(0).toUpperCase() + category.slice(1))}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="card-premium group overflow-hidden"
              >
                <div className="relative h-64 md:h-72 bg-gradient-to-br from-tertiary/20 to-tertiary/10 overflow-hidden">
                  <img
                    src={getImagePath(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => {
                      console.error('Image failed to load:', product.image);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {/* Category Badge */}
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-primary/95 backdrop-blur-sm text-tertiary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-body font-light shadow-lg z-20">
                    {t(`productionGallery.categories.${product.category}`, product.category.charAt(0).toUpperCase() + product.category.slice(1))}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg md:text-xl font-light text-secondary mb-4 line-clamp-2">
                    {product.name}
                  </h3>
                  <motion.button
                    onClick={() => {
                      // CRITICAL: Show product with non-cover images only
                      setSelectedProduct(product.product);
                      setSelectedImageIndex(1); // Always start at index 1 (skip cover at 0)
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gradient-to-r from-primary to-primary/90 text-tertiary font-body font-light text-sm md:text-base py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                  >
                    <Eye size={18} />
                    <span>{t('productionGallery.view', 'View')}</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Image Gallery Modal - CRITICAL: NEVER show cover image */}
        <AnimatePresence>
          {selectedProduct && selectedProduct.images && selectedProduct.images.length > 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={() => {
                setSelectedProduct(null);
                setSelectedImageIndex(1);
              }}
            >
              {/* Exit Icon */}
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={() => {
                  setSelectedProduct(null);
                  setSelectedImageIndex(1);
                }}
                className="absolute top-4 right-4 md:top-8 md:right-8 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full p-3 transition-all duration-300 hover:scale-110"
                aria-label="Close"
              >
                <X size={28} className="text-white" />
              </motion.button>

              <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
                {/* Main Image - CRITICAL: NEVER show cover (index 0) */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="mb-6"
                >
                  <img
                    src={getImagePath(selectedProduct.images[selectedImageIndex] || selectedProduct.images[1])}
                    alt={selectedProduct.translations[currentLang]?.name || selectedProduct.translations.fr.name}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg mx-auto"
                    onError={(e) => {
                      console.error('Image failed to load');
                    }}
                  />
                </motion.div>

                {/* Thumbnail Gallery - CRITICAL: Only show non-cover images (slice(1) removes cover) */}
                {selectedProduct.images.length > 2 && (
                  <div className="flex gap-3 justify-center flex-wrap max-w-4xl mx-auto">
                    {selectedProduct.images.slice(1).map((image, index) => {
                      const actualIndex = index + 1; // actualIndex is 1, 2, 3... (NEVER 0)
                      return (
                        <motion.button
                          key={actualIndex}
                          onClick={() => setSelectedImageIndex(actualIndex)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className={`w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 transition-all ${
                            selectedImageIndex === actualIndex
                              ? 'border-white ring-2 ring-white/50'
                              : 'border-white/30 hover:border-white/60'
                          }`}
                        >
                          <img
                            src={getImagePath(image)}
                            alt={`${selectedProduct.translations[currentLang]?.name || selectedProduct.translations.fr.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              console.error('Thumbnail failed to load');
                            }}
                          />
                        </motion.button>
                      );
                    })}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductionGallery;
