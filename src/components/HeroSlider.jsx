import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const slides = [
  {
    image: "https://i.ibb.co/9cZJZ9K/smart-garden.jpg",
    headline: "Smart Garden Setup",
    details: "Automated irrigation and seasonal plant planning for modern homes.",
  },
  {
    image: "https://i.ibb.co/3sZJYvY/interior-painting.jpg",
    headline: "Interior Painting",
    details: "Premium wall painting with surface prep and cleanup.",
  },
  {
    image: "https://i.ibb.co/7JqgJgL/ac-repair.jpg",
    headline: "AC Repair Service",
    details: "Fast and reliable air conditioning repair and maintenance.",
  },
];

const HeroSlider = () => (
  <Swiper spaceBetween={30} autoplay={{ delay: 3000 }} loop={true}>
    {slides.map((slide, index) => (
      <SwiperSlide key={index}>
        <div className="relative h-[400px] md:h-[500px]">
          <img src={slide.image} alt={slide.headline} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
            <h2 className="text-3xl md:text-5xl font-bold mb-2">{slide.headline}</h2>
            <p className="mb-4">{slide.details}</p>
            <Link to="/services" className="btn btn-primary">Explore Services</Link>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);

export default HeroSlider;