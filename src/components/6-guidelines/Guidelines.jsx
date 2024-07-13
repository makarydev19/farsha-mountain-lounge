import { useEffect, useState } from "react";
import { guidelinesML, guidelinesBeach } from "../../Data";
import { FaChevronDown } from "react-icons/fa6";
import { motion, useAnimation } from "framer-motion";

import "./guidelines.css";
import { useInView } from "react-intersection-observer";

const Guidelines = () => {
  const [active, setActive] = useState(null);
  const [refML, inViewML] = useInView();
  const [refBeach, inViewBeach] = useInView();
  const controlsML = useAnimation();
  const controlsBeach = useAnimation();

  const handleItemClick = (index) => {
    setActive(index === active ? null : index);
  };

  useEffect(() => {
    if (inViewML) {
      controlsML.start("visible");
    } else {
      controlsML.start("hidden");
    }
  }, [controlsML, inViewML]);

  useEffect(() => {
    if (inViewBeach) {
      controlsBeach.start("visible");
    } else {
      controlsBeach.start("hidden");
    }
  }, [controlsBeach, inViewBeach]);

  const listItemVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="guidelines section" id="guidelines">
      <h2 className="section__title" data-title="Guidelines">
        Mountain Lounge Guidelines
      </h2>
      <ul className="glines-list" ref={refML}>
        {guidelinesML.map((MLguideline, i) => (
          <motion.li
            key={i}
            variants={listItemVariants}
            style={{ backgroundImage: `url(${MLguideline.img})` }}
            initial="hidden"
            animate={controlsML}
            custom={i}
            className={active === i ? "active" : ""}
            onClick={() => handleItemClick(i)}
          >
            <h4 className="glines-name1">
              {MLguideline.title}
              <p>
                <FaChevronDown />
              </p>
            </h4>
            <div className="guidelines-content">
              <div className="inner">
                <div className="bio">
                  <h4 className="glines-name2">{MLguideline.title}</h4>
                  <p className="glines-description">
                    {MLguideline.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
      <h2 className="section__title space" data-title="Guidelines">
        Beach Guidelines
      </h2>

      <ul className="glines-list" ref={refBeach}>
        {guidelinesBeach.map((beachguideline, i) => (
          <motion.li
            key={i}
            variants={listItemVariants}
            initial="hidden"
            animate={controlsBeach}
            custom={i}
            style={{ backgroundImage: `url(${beachguideline.img})` }}
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
          >
            <h4 className="glines-name1">
              {beachguideline.title}{" "}
              <p>
                <FaChevronDown />
              </p>
            </h4>
            <div className="guidelines-content">
              <div className="inner">
                <div className="bio">
                  <h4 className="glines-name2">{beachguideline.title}</h4>
                  <p className="glines-description">
                    {beachguideline.description}
                  </p>
                </div>
              </div>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default Guidelines;
