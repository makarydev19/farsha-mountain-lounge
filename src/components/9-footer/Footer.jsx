import { useState } from "react";
import { motion } from "framer-motion";
import { links } from "../../Data";
import { Link } from "react-scroll";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { animateScroll } from "react-scroll";
import logo from "../../assets/Farsha_M Logo_page-0001.jpg";
import emailjs from "emailjs-com";
import "./footer.css";
import { useInView } from "react-intersection-observer";

const Footer = () => {
  const [currentName, setCurrentName] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleNameChange = (event) => {
    setCurrentName(event.target.value);
  };

  const handleMessageChange = (event) => {
    setCurrentMessage(event.target.value);
  };

  const handleEmailChange = (event) => {
    setCurrentEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const templateParams = {
        name: currentName,
        message: currentMessage,
        email: currentEmail,
      };

      await emailjs.send(
        "service_farsha", // Replace with your EmailJS service ID
        "template_farsha", // Replace with your EmailJS template ID
        templateParams,
        "Z9gvpMaOGrk9N-kEL" // Replace with your EmailJS user ID
      );

      setSubmitted(true);
      setCurrentName("");
      setCurrentMessage("");
      setCurrentEmail("");
    } catch (error) {
      console.error("Error sending email:", error);
      // Handle error, e.g., show error message to the user
    }
  };

  const { ref, inView } = useInView({ triggerOnce: false });

  const scrollTop = () => {
    animateScroll.scrollToTop();
  };

  return (
    <motion.section
      className="footer"
      id="footer"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
    >
      <div className="footerContainer">
        <div className="nested-feedback-container">
          <h2 className="contact-us">Contact Us</h2>
          {!submitted ? (
            <div>
              <div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    value={currentName}
                    onChange={handleNameChange}
                    placeholder="Name"
                    required
                    className="client-input"
                  />
                  <textarea
                    value={currentMessage}
                    onChange={handleMessageChange}
                    placeholder="Your Message"
                    required
                    className="feedback-input"
                  />
                  <input
                    type="email"
                    value={currentEmail}
                    onChange={handleEmailChange}
                    placeholder="Your Email"
                    required
                    className="client-input"
                  />
                  <button type="submit" className="submit-button">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <div className="submission">
              <p className="submission-message">
                Thank you! Your message has been sent.
              </p>
            </div>
          )}
        </div>
        <motion.div
          ref={ref}
          className="footer-bottom"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
        >
          <div className="social-links">
            <motion.a
              className="social-link"
              href="https://www.facebook.com/FarshaMountainLounge/"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaFacebook />
            </motion.a>
            <motion.a
              className="social-link"
              href="https://www.instagram.com/farsha_mountain_lounge/"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram />
            </motion.a>
          </div>

          <motion.div
            className="farshaLogo"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Link to="/" onClick={scrollTop}>
              <img src={logo} alt="" />
            </Link>
          </motion.div>
          <div className="footerNav">
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: inView ? 1 : 0 }}
              transition={{ delay: 0.9 }}
            >
              {links.slice(0, -1).map(({ name, path }, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -50 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link to={path}>{name}</Link>
                </motion.li>
              ))}
            </motion.ul>
          </div>

          <motion.div
            className="copyright"
            initial={{ opacity: 0 }}
            animate={{ opacity: inView ? 1 : 0 }}
            transition={{ delay: 0.4 }}
          >
            <p>
              Copyright &copy;2024; Designed by{" "}
              <span className="designer"> Makary</span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Footer;
