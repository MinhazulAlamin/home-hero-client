import React from "react";
import { motion } from "framer-motion";

const statVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const Statistics = () => (
  <section className="py-12 container mx-auto">
    {/* Animated heading */}
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Our Impact
    </motion.h2>

    <div className="stats shadow w-full text-center mx-auto">
      {[
        { title: "Total Services", value: "120+" },
        { title: "Bookings", value: "500+" },
        { title: "Average Rating", value: "4.7" },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="stat"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={i}
          variants={statVariants}
        >
          <div className="stat-title">{item.title}</div>
          <div className="stat-value">{item.value}</div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Statistics;