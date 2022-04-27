import { useRouter } from "next/router";
import Listing from "..";
import styles from "./index.module.scss";
import Alert from "../../../../components/Alert";
import Lottie from "react-lottie";
import successLottie from "../../../../lotties/success-check.json";
import declineLottie from "../../../../lotties/decline-cross.json";

const SuccessPage = ({}) => {
  const router = useRouter();

  const { id: listingId, success: suc } = router?.query;
  const success = suc == 1;
  console.log(router.query)

  const redirect = () => {
    router.push({
      pathname: `/listing/${listingId}`,
    });
  };

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: success ? successLottie : declineLottie,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className={styles.wrapper}>
      <Listing id={listingId} />
      <Alert onClose={redirect} title={`Payment Status`}>
        {success ? (
          <div className={styles.alert}>
            {/* Success lottie */}
            <Lottie options={defaultOptions} height={200} width={200} />
            <h2 className={styles.heading}>Payment Successful</h2>
            <p className={[styles.description, "p-wide"].join(" ")}>
              Your transaction was successful! The property is now yours!
            </p>
          </div>
        ) : (
          <div className={styles.alert}>
            {/* Success lottie */}
            <Lottie options={defaultOptions} height={200} width={200} />
            <h2 className={styles.heading}>Payment Failed</h2>
            <p className={[styles.description, "p-wide"].join(" ")}>
              We&apos;re sorry, the transaction wasn&apos;t successful.
            </p>
          </div>
        )}
      </Alert>
    </div>
  );
};

export default SuccessPage;
