import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import { Autoplay } from "swiper/modules";

const HeroSlider = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/services")
      .then((res) => res.json())
      .then((data) => setSlides(data.slice(1, 4)))
      .catch(() => console.error("Failed to load slider services"));
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <div className="relative h-[400px] md:h-[500px]">
            <img
              src={slide.image}
              alt={slide.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white text-center px-4">
              <h2 className="text-3xl md:text-5xl font-bold mb-2">
                {slide.name}
              </h2>
              <p className="mb-4">{slide.description}</p>
              <Link to="/services" className="btn btn-primary">
                Explore Services
              </Link>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroSlider;
