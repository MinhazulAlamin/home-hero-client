import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import HeroSlider from '../components/HeroSlider';
import HomeServices from '../components/HomeServices';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';

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
      <WhyChooseUs />
      <Testimonials />
    </>
  );
};

export default Home;