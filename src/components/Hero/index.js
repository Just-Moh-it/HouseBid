import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";

const Hero = ({
  img: { src, alt },
  title,
  description,
  href,
  tags,
  stats,
  side,
}) => {
  return (
    <Link href={href} passHref>
      <a className={styles.wrapper}>
        {/* Image */}
        <div className={styles.imageWrapper}>
          <Image src={src} layout="fill" objectFit="cover" alt={alt} />
        </div>
        {/* Content */}
        <div className={styles.contentWrapper}>
          {/* Top */}
          <div className="mainInfo">
            {/* Tags & address */}
            <SubHeadingWrapper tags={tags} side={side} />
            {/* Title */}
            <h3 className={[styles.title, "h2"].join(" ")}>{title}</h3>
            {/* Description */}
            <p className={[styles.description, "p-wide"].join(" ")}>
              {description}
            </p>
          </div>
          {/* Progress Bar */}
          {/* Stats */}
          <StatsList stats={stats} />
        </div>
      </a>
    </Link>
  );
};

const SubHeadingWrapper = ({ tags, side }) => {
  return (
    <div className={styles.subHeadingWrapper}>
      {/* Tags */}
      <div className={styles.tagsWrapper}>
        {tags?.map(({ icon, name }) => (
          <div className={styles.tag} key={name}>
            {icon}
            <span>{name}</span>
          </div>
        ))}
      </div>
      {/* Side text */}
      <div className={styles.sideWrapper}>
        {side?.map(({ icon, value }) => (
          <div className={styles.sideItem} key={value}>
            {icon}
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatsList = ({ stats }) => {
  return (
    <div className={styles.statsWrapper}>
      {stats?.map(({ key, value }) => (
        <div className={styles.stat} key={value}>
          <h5 className={styles.value}>{key}</h5>
          <p className={styles.key}>{value}</p>
        </div>
      ))}
    </div>
  );
};

const CustomProgrss = () => {};

export default Hero;
