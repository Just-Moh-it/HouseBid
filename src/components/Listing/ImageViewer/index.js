import { useState, useEffect } from "react";
import styles from "./index.module.scss";
import Image from "next/image";
import { motion } from "framer-motion";

const ImageViewer = ({ images }) => {
  // State management
  const [activeImage, setActiveImage] = useState({ idx: null, uri: null });

  useEffect(() => {
    if (images && images.length > 0) setActiveImage({ uri: images[0], idx: 0 });
  }, [images]);

  return (
    <div className={styles.wrapper}>
      {/* Top Image */}
      <div className={styles.topImage}>
        <ImageItem src={activeImage.uri || images[0]} />
      </div>

      {/* All Images */}
      <div className={styles.allImages}>
        {images?.map((image, i) => (
          <ImageItem
            isActive={i === activeImage.idx}
            key={i}
            onClick={() => setActiveImage({ uri: image, idx: i })}
            src={image}
          />
        ))}
      </div>
    </div>
  );
};

function ImageItem({ isActive, src, ...props }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [pulsing, setPulsing] = useState(true);

  const imageLoaded = () => {
    setImageLoading(false);
    setTimeout(() => setPulsing(false), 600);
  };

  return (
    <div
      className={[
        pulsing ? styles.pulse : "",
        styles.loadable,
        styles.item,
        isActive ? styles.active : "",
      ].join(" ")}
      {...props}
    >
      <motion.img
        initial={{ opacity: 0 }}
        animate={{
          opacity: imageLoading ? 0 : 1,
        }}
        transition={{ opacity: { delay: 0.5, duration: 0.4 } }}
        onLoad={imageLoaded}
        src={src}
        className={styles.image}
      />
    </div>
  );
}

export default ImageViewer;
