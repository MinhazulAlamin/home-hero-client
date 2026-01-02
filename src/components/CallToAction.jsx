import React from "react";
import { Link } from "react-router-dom"; // ✅ use react-router-dom
import { motion } from "framer-motion";

const CallToAction = () => (
  <section className="py-12 text-center">
    {/* Animated heading */}
    <motion.h2
      className="text-3xl font-bold mb-4"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Ready to get started?
    </motion.h2>

    {/* Animated paragraph */}
    <motion.p
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Join HomeHero today and book your first service with ease.
    </motion.p>

    {/* Animated button */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <Link to="/register" className="btn btn-primary">
        Sign Up Now
      </Link>
    </motion.div>
  </section>
);

export default CallToAction;