import { motion } from 'framer-motion';

const Quality = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-6xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-6">
            Our Quality Commitment
          </h1>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start"
        >
          {/* Left: narrative */}
          <section className="space-y-6 md:space-y-8 bg-white/85 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            <p className="font-body text-base md:text-lg text-secondary/80 leading-relaxed font-light">
              Quality is at the core of everything we do at <strong>RimeBerry</strong>. From sourcing to storage and
              distribution, every step is designed to protect the freshness, safety, and nutritional value of our products.
            </p>
            <p className="font-body text-base md:text-lg text-secondary/80 leading-relaxed font-light">
              Thanks to a well-managed cold chain and controlled storage conditions, RimeBerry guarantees products that are
              <strong> safe, reliable, and consistent</strong>, meeting the expectations of professionals and consumers who
              prioritize quality.
            </p>
          </section>

          {/* Right: quality pillars as cards */}
          <section className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base md:text-lg text-secondary mb-2 flex items-center gap-2">
                  <span>🔎</span>
                  <span>Trusted suppliers</span>
                </h3>
                <p className="font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                  Careful selection of partners who share our standards for freshness and safety.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base md:text-lg text-secondary mb-2 flex items-center gap-2">
                  <span>🧪</span>
                  <span>Rigorous controls</span>
                </h3>
                <p className="font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                  Quality checks at every key stage of the supply chain, from reception to delivery.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base md:text-lg text-secondary mb-2 flex items-center gap-2">
                  <span>📦</span>
                  <span>Traceability</span>
                </h3>
                <p className="font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                  Clear traceability systems so every product can be followed from source to client.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100">
                <h3 className="font-heading text-base md:text-lg text-secondary mb-2 flex items-center gap-2">
                  <span>📈</span>
                  <span>Continuous improvement</span>
                </h3>
                <p className="font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                  Ongoing optimisation of processes, logistics and monitoring to keep raising our standards.
                </p>
              </div>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
};

export default Quality;
