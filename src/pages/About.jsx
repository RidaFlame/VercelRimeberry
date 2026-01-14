import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="min-h-screen pt-20 md:pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 md:px-6 lg:px-10 max-w-6xl">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10 md:mb-14"
        >
          <h1 className="section-title font-heading text-3xl md:text-4xl lg:text-5xl font-light text-secondary mb-4">
            About RimeBerry
          </h1>
        </motion.div>

        {/* Main two-column layout */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid gap-8 lg:gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1.1fr)] items-start"
        >
          {/* Left: story & content cards */}
          <div className="space-y-8 md:space-y-10">
            {/* About Us */}
            <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-secondary mb-4 flex items-center gap-3">
                <span className="text-primary text-2xl">🌿</span>
                <span>About Us</span>
              </h2>
              <p className="font-body text-base md:text-lg text-secondary/80 leading-relaxed font-light mb-4">
                <strong>RimeBerry</strong> is a company specialized in the <strong>distribution of fresh and frozen fruits
                and vegetables</strong>, as well as a <strong>wide range of high-quality dairy and gourmet products</strong>,
                including <strong>cheese, yogurt, and fruit-based chocolates</strong>.
              </p>
              <p className="font-body text-base md:text-lg text-secondary/80 leading-relaxed font-light mb-4">
                Our mission is simple: 👉 <strong>to deliver premium-quality products</strong> while strictly respecting
                hygiene standards, food safety, and optimal storage conditions.
              </p>
              <p className="font-body text-base md:text-lg text-secondary/80 leading-relaxed font-light">
                Through a reliable network of partners and a well-managed cold chain, RimeBerry ensures products that are
                <strong> fresh, flavorful, nutritious, and safely preserved</strong>, meeting the needs of both professionals
                and individual consumers. At RimeBerry, we believe that food quality is the foundation of a healthy and
                balanced lifestyle.
              </p>
            </section>

            {/* Why Choose RimeBerry */}
            <section className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-secondary mb-4 flex items-center gap-3">
                <span className="text-primary text-2xl">⭐</span>
                <span>Why Choose RimeBerry?</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3">
                  <div>
                    <h3 className="font-heading text-base md:text-lg text-secondary mb-1">
                      ✔ Premium fresh and frozen products
                    </h3>
                    <p className="font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                      We carefully select our fruits and vegetables to guarantee freshness, taste, and nutritional value.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-base md:text-lg text-secondary mb-1">
                      ✔ Wide product range
                    </h3>
                    <ul className="list-disc ml-5 space-y-1 font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                      <li>Fresh fruits and vegetables</li>
                      <li>Frozen fruits and vegetables</li>
                      <li>Cheese varieties</li>
                      <li>Yogurt</li>
                      <li>Innovative and delicious fruit-based chocolates</li>
                    </ul>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <h3 className="font-heading text-base md:text-lg text-secondary mb-1">
                      ✔ Strict cold-chain management
                    </h3>
                    <p className="font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                      All fresh and frozen products are stored and transported under optimal conditions to preserve quality
                      and safety.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-base md:text-lg text-secondary mb-1">
                      ✔ Reliability and professionalism
                    </h3>
                    <p className="font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                      We are committed to on-time delivery and responsive customer service tailored to each client&apos;s needs.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-heading text-base md:text-lg text-secondary mb-1">
                      ✔ Market-focused solutions
                    </h3>
                    <p className="font-body text-sm md:text-base text-secondary/75 leading-relaxed">
                      RimeBerry meets the needs of restaurants, hotels, retailers, wholesalers, and quality-conscious consumers.
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right: visual stats / highlight column */}
          <div className="space-y-5 md:space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 md:p-7 text-tertiary shadow-xl"
            >
              <p className="font-body text-sm uppercase tracking-[0.2em] mb-3 opacity-80">
                RimeBerry in numbers
              </p>
              <div className="space-y-4">
                <div>
                  <div className="font-heading text-3xl md:text-4xl font-light">30+</div>
                  <p className="font-body text-sm md:text-base opacity-90">
                    references across fruits, vegetables, cheese, yogurt and chocolates.
                  </p>
                </div>
                <div>
                  <div className="font-heading text-3xl md:text-4xl font-light">2</div>
                  <p className="font-body text-sm md:text-base opacity-90">
                    specialized distribution lines for fresh and frozen products.
                  </p>
                </div>
                <div>
                  <div className="font-heading text-3xl md:text-4xl font-light">24/7</div>
                  <p className="font-body text-sm md:text-base opacity-90">
                    cold-chain monitoring to guarantee food safety and consistency.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Our Quality Commitment */}
            <motion.section
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-7 shadow-sm border border-gray-100"
            >
              <h2 className="font-heading text-xl md:text-2xl font-light text-secondary mb-3 flex items-center gap-3">
                <span className="text-primary text-2xl">🛡️</span>
                <span>Our Quality Commitment</span>
              </h2>
              <ul className="space-y-2 font-body text-sm md:text-base text-secondary/80 leading-relaxed">
                <li>Careful supplier selection</li>
                <li>Strict quality control at every stage</li>
                <li>Compliance with food safety and hygiene standards</li>
                <li>Product traceability</li>
                <li>Continuous improvement of our processes</li>
              </ul>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

