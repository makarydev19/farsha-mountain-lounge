import Seating from "../../assets/sitting (2).png";
import Alcohol from "../../assets/wine.png";
// import Services from "../../assets/beer (2).png";
import WaterFront from "../../assets/sunset (1).png";
import TableService from "../../assets/reservation (1).png";

import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./features.css";

const Features = () => {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: i * 0.3 },
      }));
    } else {
      controls.start({
        x: "-100%", // Move elements to the right-hand side
        opacity: 0,
        transition: { duration: 0.5 },
        autoReverse: true, // Reverse animation when scrolling upward
      });
    }
  }, [controls, inView]);
  return (
    <section className="features section" id="features" ref={ref}>
      <h2 className="section__title" data-title="Features">
        Our Best Features
      </h2>
      <div className="features__flex">
        <motion.div
          className="features__item"
          animate={controls}
          initial={{ x: "-100%", opacity: 0 }} // Move from the right-hand side
          custom={0}
        >
          <div className="features__img-wrapper">
            <img src={Alcohol} alt="" className="features__img" />
          </div>
          <div>
            <h3 className="features__title">Full Bar</h3>
          </div>
        </motion.div>
        {/* <motion.div
          className="features__item"
          animate={controls}
          initial={{ x: "-100%", opacity: 0 }} // Move from the right-hand side
          custom={2}
        >
          <div className="features__img-wrapper">
            <img src={Services} alt="" className="features__img" />
          </div>
          <div>
            <h3 className="features__title">Serves Alcohol</h3>
          </div>
        </motion.div> */}
        <motion.div
          className="features__item"
          animate={controls}
          initial={{ x: "-100%", opacity: 0 }} // Move from the right-hand side
          custom={1}
        >
          <div className="features__img-wrapper">
            <img src={Seating} alt="" className="features__img" />
          </div>
          <div>
            <h3 className="features__title">Outdoor Seating</h3>
          </div>
        </motion.div>
        <motion.div
          className="features__item"
          animate={controls}
          initial={{ x: "-100%", opacity: 0 }} // Move from the right-hand side
          custom={3}
        >
          <div className="features__img-wrapper">
            <img src={WaterFront} alt="" className="features__img" />
          </div>
          <div>
            <h3 className="features__title">Waterfront</h3>
          </div>
        </motion.div>
        <motion.div
          className="features__item"
          animate={controls}
          initial={{ x: "-100%", opacity: 0 }} // Move from the right-hand side
          custom={4}
        >
          <div className="features__img-wrapper">
            <img src={TableService} alt="" className="features__img" />
          </div>
          <div>
            <h3 className="features__title">Table Service</h3>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
