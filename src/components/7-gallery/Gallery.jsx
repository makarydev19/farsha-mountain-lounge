import { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "./gallery.css";
import { gallery } from "../../Data";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImage = (index) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  return (
    <section className="section gallery" id="gallery">
      <h2 className="section__title" data-title="Gallery">
        Our Photo Gallery
      </h2>

      <Swiper
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[EffectCoverflow]}
        className="mySwiper-gallery"
      >
        {gallery.map((image, index) => (
          <SwiperSlide key={index} className="swiper-slide-gallery">
            <motion.img
              src={image.img}
              alt=""
              className="gallery-image"
              onClick={() => openImage(index)}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {selectedImage !== null && (
        <motion.div
          className="image-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="modal-content">
            <span className="close" onClick={closeImage}>
              &times;
            </span>
            <img
              src={gallery[selectedImage].img}
              alt=""
              className="modal-image"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;
