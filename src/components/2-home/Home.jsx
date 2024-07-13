import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import loungeHori from "../../assets/LoungeHori.mp4";
import galleryVertical from "../../assets/Gallery.mp4";
import galleryHorizontal from "../../assets/GallaryHorizontal.mp4";
import farshaBeach from "../../assets/FarshaBeachh.mp4";

import { Parallax, Pagination } from "swiper/modules";

import "./home.css";



const Home = () => {
  const [activeButton, setActiveButton] = useState(null);
  const swiperRef = useRef(null);
  const animationControls = useAnimation();

  const handleClick = (index) => {
    setActiveButton(index);
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  const handleSlideChange = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      setActiveButton(swiperRef.current.swiper.realIndex);
    }
  };

  useEffect(() => {
    const sequence = async () => {
      await animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, delay: 1, ease: "easeInOut" },
      });
    };
    sequence();
  }, [animationControls]);

  return (
    <motion.section
      className="home"
      initial={{ opacity: 0, y: -150 }}
      animate={animationControls}
    >
      <div className="home-buttons">
        <div className={`button ${activeButton === 0 ? "active" : ""}`}>
          <button
            className="lounge active"
            onClick={() => handleClick(0)}
          ></button>
        </div>
        <div className={`button ${activeButton === 1 ? "active" : ""}`}>
          <button
            className="beach active"
            onClick={() => handleClick(1)}
          ></button>
        </div>
        <div className={`button ${activeButton === 2 ? "active" : ""}`}>
          <button
            className="Gallery active"
            onClick={() => handleClick(2)}
          ></button>
        </div>
      </div>
      <Swiper
        ref={swiperRef}
        style={{
          "--swiper-navigation-color": "#fff9",
          "--swiper-pagination-color": "#fff9",
        }}
        loop={true}
        speed={600}
        parallax={true}
        onSlideChange={handleSlideChange}
        modules={[Parallax, Pagination]}
        className="mySwiper-home"
      >
        {/* Slide 1 */}
        <SwiperSlide className="swiper-slide-home">
          <div
            slot="container-start"
            className="parallax-bg"
            data-swiper-parallax="-23%"
          >
            <div className="background">
              <div className="overlay"></div>
              <video
                src={loungeHori}
                autoPlay
                loop
                muted
                className="mobile-screen"
              ></video>
              <video
                src={loungeHori}
                autoPlay
                loop
                muted
                className="large-screen"
              ></video>
            </div>
          </div>
          <div className="title" data-swiper-parallax="-300">
            <h2 className="section__title" data-title="Welcome to">
              Farsha Mountain Lounge
            </h2>
          </div>
          <div className="subtitle" data-swiper-parallax="-100">
            <p>Bringing you the hottest lounge on Earth</p>
          </div>
        </SwiperSlide>
        {/* Slide 2 */}
        <SwiperSlide className="swiper-slide-home">
          <div
            slot="container-start"
            className="parallax-bg"
            data-swiper-parallax="-23%"
          >
            <div className="background">
              <div className="overlay"></div>
              <video
                src={farshaBeach}
                autoPlay
                loop
                muted
                className="large-screen"
              ></video>
            </div>
          </div>
          <div className="title opacity" data-swiper-parallax="-300">
            Our Farsha Beach
          </div>
        </SwiperSlide>
        {/* Slide 3 */}
        <SwiperSlide className="swiper-slide-home">
          <div
            slot="container-start"
            className="parallax-bg"
            data-swiper-parallax="-23%"
          >
            <div className="background">
              <div className="overlay"></div>
              <video
                src={galleryVertical}
                autoPlay
                loop
                muted
                className="mobile-screen"
              ></video>
              <video
                src={galleryHorizontal}
                autoPlay
                loop
                muted
                className="large-screen"
              ></video>
            </div>
          </div>
          <div className="title opacity" data-swiper-parallax="-300">
            Our Farsha Gallery
          </div>
        </SwiperSlide>
      </Swiper>
    </motion.section>
  );
};

export default Home;
