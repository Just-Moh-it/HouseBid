import styles from "index.module.scss";
import { motion } from "framer-motion";

const PropertyCard = ({
  cover: { coverSrc, coverAlt },
  heading,
  title,
  description,
  stats,
  uploader: {
    name,
    img: { uploaderSrc, uploaderAlt },
  },
}) => {
  return (
    <motion.article>
      {/* Image */}
      <motion.img
        initial={{ height: "16rem", opacity: 0 }}
        // style={{ height: imageLoading ? "6rem" : "auto" }}
        animate={{
          height: imageLoading ? "16rem" : "auto",
          opacity: imageLoading ? 0 : 1,
        }}
        transition={
          ({ height: { delay: 0, duration: 0.4 } },
          { opacity: { delay: 0.5, duration: 0.4 } })
        }
        onLoad={imageLoaded}
        width="100%"
        src="https://source.unsplash.com/random"
      />
      {/* Info */}
      {/* Uploader */}
    </motion.article>
  );
};

export default PropertyCard;
