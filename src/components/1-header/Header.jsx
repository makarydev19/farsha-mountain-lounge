import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { animateScroll } from "react-scroll";
import { FaStream } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";

import logo from "../../assets/FarshaProfilePic-removebg-preview (1).png";
import { links } from "../../Data";

import "./header.css";

const Header = () => {
  const [scrollHeader, setScrollHeader] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const animationControls = useAnimation();

  const changeHeader = () => {
    if (window.scrollY >= 85) {
      setScrollHeader(true);
    } else {
      setScrollHeader(false);
    }
  };

  const scrollTop = () => {
    animateScroll.scrollToTop();
  };

  useEffect(() => {
    const sequence = async () => {
      await animationControls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 1, ease: "easeInOut" },
      });
    };
    sequence();
    window.addEventListener("scroll", changeHeader);
    return () => {
      window.removeEventListener("scroll", changeHeader);
    };
  }, [animationControls]);

  return (
    <motion.header
      className={`${scrollHeader ? "scroll-header" : ""} header`}
      initial={{ opacity: 0, y: -50 }}
      animate={animationControls}
    >
      <nav className="nav container">
        <Link to="/" onClick={scrollTop} className="nav__logo">
          <img src={logo} alt="" className="nav__logo-img" />
        </Link>

        <div className={`${showMenu ? "show-menu" : ""} nav__menu`}>
          <ul className="nav__list">
            {links.map(({ name, path }, index) => {
              return (
                <li className="nav__item" key={index}>
                  <Link
                    spy={true}
                    smooth={true}
                    offset={-50}
                    hashSpy={true}
                    duration={500}
                    to={path}
                    className="nav__link"
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="nav__toggle" onClick={() => setShowMenu(!showMenu)}>
          <FaStream />
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
