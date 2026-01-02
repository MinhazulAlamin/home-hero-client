import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const BlogSection = () => (
  <section className="py-12 container mx-auto">
    {/* Animated heading */}
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Latest Articles
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-6">
      {["DIY Home Tips", "Beauty Hacks", "Pet Care Essentials"].map((title, i) => (
        <motion.div
          key={i}
          className="card bg-base-100 shadow-md p-6 rounded-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={i}
          variants={cardVariants}
        >
          <h3 className="font-semibold mb-2">{title}</h3>
          <p className="opacity-70">Read our latest blog on {title.toLowerCase()}.</p>
          <button className="btn btn-link mt-2">Read More</button>
        </motion.div>
      ))}
    </div>
  </section>
);

export default BlogSection;