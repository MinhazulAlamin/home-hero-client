import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import HeroSlider from '../components/HeroSlider';
import HomeServices from '../components/HomeServices';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import Highlights from '../components/Highlights';
import Statistics from '../components/Statistics';
import BlogSection from '../components/BlogSection';
import Newsletter from '../components/Newsletter';
import FAQ from '../components/FAQ';
import CallToAction from '../components/CallToAction';

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <HeroSlider />
      <HomeServices />
      <Highlights />
      <WhyChooseUs />
      <Statistics />
      <Testimonials />
      <BlogSection />
      <Newsletter />
      <FAQ />
      <CallToAction />
    </>
  );
};

export default Home;