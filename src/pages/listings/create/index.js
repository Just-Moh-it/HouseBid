import styles from "./index.module.scss";
import Layout from "../../../components/Layout";
import Alert from "../../../components/utils/Alert";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FiUploadCloud } from "react-icons/fi";
import { RiShoppingBasketFill } from "react-icons/ri";

const CreateListingPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => toast("Submitted...");

  return (
    <>
      <Layout>
        <motion.div className={styles.wrapper}>
          {/* Heading */}
          <h1 className={styles.heading}>Add a Property 🚀</h1>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Image upload */}
            <FileUpload />

            {/* Info */}
            <div className={styles.formRow}>
              <div className={[styles.formGroup, "formGroup"].join(" ")}>
                {/* Label */}
                <label htmlFor="title">Property Title*</label>
                <input
                  type="text"
                  className="text-input"
                  id="title"
                  {...register("title", { required: true })}
                  placeholder="Enter Property name"
                />
                {errors.title && (
                  <span className={styles.errorMessage}>
                    This field is required
                  </span>
                )}
              </div>
              <div className={[styles.formGroup, "formGroup"].join(" ")}>
                {/* Label */}
                <label htmlFor="short-description">Short Description*</label>
                <input
                  type="text"
                  className="text-input"
                  id="short-description"
                  {...register("shortDescription", { required: true })}
                  placeholder="(~15 Words)"
                />
                {errors.shortDescription && (
                  <span className={styles.errorMessage}>
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={[styles.formGroup, "formGroup"].join(" ")}>
                {/* Label */}
                <label htmlFor="tags">Add Tags*</label>
                <input
                  type="text"
                  className="text-input"
                  id="tags"
                  {...register("tags", { required: true })}
                  placeholder="Separated by commas"
                />
                {errors.tags && (
                  <span className={styles.errorMessage}>
                    This field is required
                  </span>
                )}
              </div>
              <div className={[styles.formGroup, "formGroup"].join(" ")}>
                {/* Label */}
                <label htmlFor="features">Features*</label>
                <input
                  type="text"
                  className="text-input"
                  id="features"
                  {...register("features", { required: true })}
                  placeholder="separated by commas"
                />
                {errors.features && (
                  <span className={styles.errorMessage}>
                    This field is required
                  </span>
                )}
              </div>
            </div>
            <div className={styles.formRow}>
              <div className={[styles.formGroup, "formGroup"].join(" ")}>
                {/* Label */}
                <label htmlFor="long-description">Long description*</label>
                <textarea
                  type="text"
                  className={["text-input", styles.textAreaInput].join(" ")}
                  id="long-description"
                  {...register("longDescription", { required: true })}
                  placeholder="Describe everything about your property (~500 words)"
                />
                {errors.longDescription && (
                  <span className={styles.errorMessage}>
                    This field is required
                  </span>
                )}
              </div>
            </div>

            {/* Financial Info */}
            <Alert icon={<RiShoppingBasketFill size={56} color="white" />}>
              You will get 90% of total raised
            </Alert>

            {/* Submit */}
            <button
              type="submit"
              className={[styles.submitButton, "btn primary"].join(" ")}
              onClick={() => toast("Done!")}
            >
              Submit new campaign
            </button>
          </form>
        </motion.div>
      </Layout>
    </>
  );
};

const FileUpload = () => {
  return (
    <div className="formGroup">
      <div className={["text-input", styles.fileUploadWrapper].join(" ")}>
        <FiUploadCloud size={130} color="#B5B5B7" />
        <p>Upload property images by dragging them here.</p>
        <p>(Tip: Add at least 4 images)</p>
      </div>
    </div>
  );
};

export default CreateListingPage;
