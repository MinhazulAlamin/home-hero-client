import React from 'react';
import HeroSlider from '../components/HeroSlider';
import HomeServices from '../components/HomeServices';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';

const Home = () => {
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