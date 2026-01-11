import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { getImagePath } from '../utils/imagePath';

const ProductCard = ({ product, index = 0 }) => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;
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
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="card-premium group"
    >
      <motion.div
        className="relative h-56 md:h-64 bg-gradient-to-br from-tertiary/20 to-tertiary/10 overflow-hidden"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.4 }}
        style={{ minHeight: '224px' }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent z-10" />
        <motion.img
          src={product.images[0] ? getImagePath(product.images[0]) : getImagePath('/placeholder-food.jpg')}
          alt={translation.name}
          className="w-full h-full object-cover"
          style={{ objectFit: 'cover', height: '100%' }}
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.6 }}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop';
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="absolute top-3 md:top-4 right-3 md:right-4 bg-primary/95 backdrop-blur-sm text-tertiary px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-body font-light shadow-lg z-20"
        >
          {categoryLabels[product.category] || product.category}
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 z-10"
          transition={{ duration: 0.3 }}
        />
      </motion.div>
      <div className="p-6">
        <h3 className="font-heading text-lg md:text-xl font-light text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors">
          {translation.name}
        </h3>
        <p className="font-body text-xs md:text-sm text-secondary/60 mb-6 line-clamp-3 leading-relaxed font-light">
          {translation.description}
        </p>
        <Link
          to={`/product/${product.id}`}
          className="inline-block w-full text-center bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-tertiary font-body font-light text-sm md:text-base py-3 px-6 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-100"
        >
          {t('catalogue.viewDetails')}
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;

