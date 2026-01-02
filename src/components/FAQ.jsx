import React from "react";
import { motion } from "framer-motion";

const faqVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
  }),
};

const FAQ = () => (
  <section className="py-12">
    {/* Animated heading */}
    <motion.h2
      className="text-3xl font-bold mb-6 text-center"
      initial={{ opacity: 0, y: -30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: false, amount: 0.3 }}
    >
      Frequently Asked Questions
    </motion.h2>

    <div className="space-y-4 max-w-2xl mx-auto">
      {[
        {
          question: "How do I book a service?",
          answer: "Simply browse services, select one, and confirm your booking.",
        },
        {
          question: "Are providers verified?",
          answer: "Yes, all providers go through a strict verification process.",
        },
      ].map((item, i) => (
        <motion.div
          key={i}
          className="collapse collapse-arrow bg-base-100 shadow-md"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
          custom={i}
          variants={faqVariants}
        >
          <input type="checkbox" />
          <div className="collapse-title font-semibold">{item.question}</div>
          <div className="collapse-content">
            <p>{item.answer}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default FAQ;