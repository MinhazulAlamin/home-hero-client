import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Highlights = () => (
  <section className="py-12 container mx-auto">
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.3 }}
    >
      Why HomeHero?
    </motion.h2>

    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          title: "Verified Providers",
          text: "All professionals are background-checked and trusted.",
        },
        {
          title: "Affordable Pricing",
          text: "Transparent rates with no hidden fees.",
        },
        {
          title: "24/7 Support",
          text: "We're here whenever you need us.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="card bg-base-100 shadow-sm p-6 rounded-lg"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={i}
          variants={cardVariants}
        >
          <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
          <p className="opacity-80">{item.text}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Highlights;