import aboutImg from "../../assets/farshaLounge2.jpg";
import { FiCheck } from "react-icons/fi";

import "./about.css";
import { useEffect } from "react";
import { useAnimation, motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
  const [ref, inView] = useInView();
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start((i) => ({
        x: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: i * 0.1 },
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
    <section className="about section" id="about">
      <div className="about__grid container grid">
        <motion.div
          className="about__img-wrapper"
          animate={controls}
          initial={{ x: "-100%", opacity: 0 }}
          custom={0}
          ref={ref}
        >
          <motion.img
            src={aboutImg}
            alt=""
            className="about__img"
            animate={controls}
            initial={{ x: "-100%", opacity: 0 }}
            custom={1} // Pass the index as custom prop
          />
        </motion.div>

        <div className="about__content" ref={ref}>
          <motion.h2
            className="section__title title-left"
            data-title="About Us"
            animate={controls}
            initial={{ x: "-100%", opacity: 0 }}
            custom={2} // Pass the index as custom prop
          >
            Farsha brings you along a journey of original antique pieces
            collected in the years.
          </motion.h2>

          <motion.p
            animate={controls}
            initial={{ x: "-100%", opacity: 0 }}
            custom={3} // Pass the index as custom prop
          >
            A lounge down a mountain that feels like an Arabian fairytale where
            you can enjoy drinks, snacks & shisha✨.
          </motion.p>

          <div className="about__details grid" ref={ref}>
            <motion.p
              className="about__details-description"
              animate={controls}
              initial={{ x: "-100%", opacity: 0 }}
              custom={4} // Pass the index as custom prop
            >
              <FiCheck className="about__details-icon" />
              Outdoor Seating
            </motion.p>
            <motion.p
              className="about__details-description"
              animate={controls}
              initial={{ x: "-100%", opacity: 0 }}
              custom={5} // Pass the index as custom prop
            >
              <FiCheck />
              Full Bar
            </motion.p>
            <motion.p
              className="about__details-description"
              animate={controls}
              initial={{ x: "-100%", opacity: 0 }}
              custom={6} // Pass the index as custom prop
            >
              <FiCheck />
              Waterfront
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
