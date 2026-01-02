import React from "react";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3, duration: 0.6, ease: "easeOut" },
  }),
};

const Testimonials = () => (
  <div className="py-10 px-4 container mx-auto">
    {/* Animated heading */}
    <motion.h2
      className="text-3xl font-bold text-center mb-6"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Customer Testimonials
    </motion.h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {[
        {
          text: '"The AC repair service was quick and professional. Highly recommended!"',
          author: "— Farhan, Dhaka",
        },
        {
          text: '"Loved the smart garden setup. My backyard looks amazing now!"',
          author: "— Nusrat, Rajshahi",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="bg-white p-4 shadow rounded"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={i}
          variants={cardVariants}
        >
          <p>{item.text}</p>
          <p className="mt-2 text-sm text-gray-500">{item.author}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default Testimonials;