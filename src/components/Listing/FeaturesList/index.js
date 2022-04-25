import styles from "./index.module.scss";

const FeaturesList = ({ features }) => {
  return (
    <div className={styles.wrapper}>
      {features.map(({ icon, key, value }) => (
        <div className={styles.featureItem}>
          <div className={styles.top}>
            {/* Icon */}
            <div className={styles.icon}>{icon}</div>

            {/* Key */}
            <div className={["p-compact-small", styles.key].join(" ")}>
              {key}
            </div>
          </div>
        
          {/* Values */}
          <div className={styles.value}>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default FeaturesList;
