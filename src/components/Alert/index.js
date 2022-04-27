import styles from "./index.module.scss";
import { BiX } from "react-icons/bi";


const Alert = ({ title, children, onClose }) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        {/* Header */}
        <div className={styles.header}>
          {/* Title */}
          <div className={styles.left}>
            <h3 className={styles.title}>{title}</h3>
          </div>
          {/* Right Side */}
          <div className={styles.right}>
            {/* Close Button */}
            <button
              className={styles.close}
              onClick={(e) => {
                e.preventDefault();
                onClose();
              }}
            >
              <BiX />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Alert;
