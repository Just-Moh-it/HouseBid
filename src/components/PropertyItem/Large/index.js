import styles from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import ContentLoader from "react-content-loader";

const PropertyItemLarge = ({
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

export const HeroSkeleton = ({ expectedItems, ...props }) => (
  <>
    {[...Array(expectedItems)].map((_, i) => (
      <ContentLoader
        speed={2}
        width={1200}
        height={300}
        viewBox="0 0 1200 300"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        key={i}
        {...props}
      >
        <rect x="1" y="2" rx="22" ry="22" width="590" height="295" />
        <rect x="630" y="71" rx="0" ry="0" width="478" height="26" />
        <rect x="633" y="120" rx="0" ry="0" width="493" height="44" />
        <rect x="633" y="184" rx="0" ry="0" width="321" height="19" />
        <rect x="630" y="221" rx="0" ry="0" width="332" height="23" />
      </ContentLoader>
    ))}
  </>
);

const CustomProgrss = () => {};

export default PropertyItemLarge;
