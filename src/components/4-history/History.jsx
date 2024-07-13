import "./history.css";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper/modules";
import { history } from "../../Data";
import { FaArrowAltCircleDown } from "react-icons/fa";

import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const History = () => {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: i * 0.4 },
      }));
    } else {
      controls.start({
        x: "-100%",
        opacity: 0,
        transition: { duration: 0.5 },
        autoReverse: true,
      });
    }
  }, [controls, inView]);
  return (
    <section className="section history" id="history" ref={ref}>
      <div className="shadow"></div>
      <h2 className="section__title" data-title="History">
        Farsha History
      </h2>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        modules={[Pagination]}
        className="container"
      >
        {history.map(({ img, title, description }, index) => {
          return (
            <SwiperSlide className="history__item" key={index}>
              <motion.div
                className="history__content"
                animate={controls}
                initial={{ x: "-100%", opacity: 0 }}
                custom={0} // Pass the index as custom prop
              >
                <h3 className="history__title">
                  {title} <FaArrowAltCircleDown className="arrow-down" />
                </h3>
                <p className="history__description">{description}</p>
              </motion.div>
              <motion.div
                className="history__img-wrapper"
                animate={controls}
                initial={{ x: "-100%", opacity: 0 }}
                custom={1} // Pass the index as custom prop
              >
                <img src={img} alt="" className="history__img" />
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default History;
