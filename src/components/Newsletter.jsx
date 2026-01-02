import React from "react";
import { motion } from "framer-motion";

const Newsletter = () => (
  <section className="py-12 bg-base-200">
    {/* Animated heading */}
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Subscribe to Our Newsletter
    </motion.h2>

    {/* Animated form */}
    <motion.form
      className="flex justify-center gap-4"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <input
        type="email"
        placeholder="Enter your email"
        className="input input-bordered w-1/2"
      />
      <button className="btn btn-primary">Subscribe</button>
    </motion.form>
  </section>
);

export default Newsletter;