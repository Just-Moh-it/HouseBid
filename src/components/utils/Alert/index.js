import styles from "./index.module.scss";

const Alert = ({ children, icon }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.contentWrapper}>
        {/* Icon */}
        {icon}

        {/* Text */}
        <p className={styles.content}>{children}</p>
      </div>
    </div>
  );
};

export default Alert;
