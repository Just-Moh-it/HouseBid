import { useState } from "react";
import Image from "next/image";
import styles from "./index.module.scss";
import Layout from "../../../components/Layout";
import Alert from "../../../components/utils/Alert";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ContentLoader from "react-content-loader";
import { useRouter } from "next/router";
import { featureOptions, tagOptions } from "../../../utils/constants";

// React Select
import Select from "react-select";

// Data
import { useMutation } from "@apollo/client";
import { CREATE_LISTING } from "../../../lib/queries/Listing";

// Icons
import { FiUploadCloud } from "react-icons/fi";
import { BiX } from "react-icons/bi";
import { RiShoppingBasketFill } from "react-icons/ri";

const placeholderData = {
  title: "Picturesque museum in the hills",
  shortDescription:
    "Remake - We Make: an exhibition about architecture’s social  agency in the face of urbanisation",
  tags: "museum, hills, picturesque",
  features: "compact-parking,cctv,directions",
  longDescription: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. \n\nIt was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum`,
  images: [
    "https://res.cloudinary.com/mohit2004/image/upload/v1650803072/house-bid/uips1byxiva7ckbtlnjf.jpg",
    "https://res.cloudinary.com/mohit2004/image/upload/v1650803066/house-bid/tuqx39b2c7zakbfad0gx.jpg",
    "https://res.cloudinary.com/mohit2004/image/upload/v1650820353/house-bid/srbjkxgz5znxg8kwpwge.jpg",
  ],
};

const CreateListingPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [images, setImages] = useState([]);

  const [createListing, { data: mutationData }] = useMutation(CREATE_LISTING, {
    onCompleted: (data) => {
      const id = data?.insert_listings_one?.id;
      toast.success(`Successfully added listing with id ${id}`);
      // Redirect to my listings
      router.push(`/listing/${id}`);
    },
    onError: (error) => {
      toast.error(`Error adding the listing: ${error.message}`);
    },
    refetchQueries: ["Listings"],
  });

  const onSubmit = ({
    longDescription,
    shortDescription,
    title,
    minimumPrice,
    minimumIncrement,
    features,
    tags,
  }) => {
    console.log(features);
    if (isImageUploading)
      return toast.warning("Please wait for images to upload");

    createListing({
      variables: {
        object: {
          long_description: longDescription,
          minimum_increment: minimumIncrement,
          minimum_price: minimumPrice,
          short_description: shortDescription,
          title,
          listing_images: {
            data: images.map((img) => ({
              image_uri: img,
            })),
          },
          listing_features: {
            data: features.map((feature) => ({
              listing_value: feature,
            })),
          },
          listing_tags: {
            data: tags.map((tag) => ({
              value: tag,
            })),
          },
        },
      },
    });
  };

  return (
    <>
      <Layout isRestricted>
        <motion.div className={styles.wrapper}>
          {/* Heading */}
          <h1 className={styles.heading}>Add a Property 🚀</h1>
          <button
            className="btn outline"
            onClick={() => {
              if (
                !window.confirm(
                  "All current data will be over ridden... Proceed?"
                )
              ) {
                return;
              }
              Object.keys(placeholderData).forEach((i) => {
                setValue(i, placeholderData[i]);
                setImages(placeholderData.images.sort(() => Math.random() - 0.5));
              });
            }}
          >
            Load dummy data
          </button>

          {/* Form */}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {/* Image upload */}
            <FileUpload
              setIsImageUploading={setIsImageUploading}
              isImageUploading={isImageUploading}
              images={images}
              setImages={setImages}
              register={register}
            />

            {/* Info */}
            <div className={styles.formRow}>
              <div className={[styles.formGroup, "formGroup"].join(" ")}>
                {/* Title */}
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
                {/* Short Description */}
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
                {/* Tags */}
                <label htmlFor="tags">Tags* (sep. by commas)</label>
                <SelectInput
                  options={tagOptions}
                  onChange={(e) =>
                    setValue(
                      "tags",
                      e.map((x) => x.value)
                    )
                  }
                  name="tags"
                />

                {errors.tags && (
                  <span className={styles.errorMessage}>
                    This field is required
                  </span>
                )}
              </div>
              <div className={[styles.formGroup, "formGroup"].join(" ")}>
                {/* Features */}
                <label htmlFor="features">Features* (sep. by commas)</label>
                <SelectInput
                  options={featureOptions}
                  onChange={(e) =>
                    setValue(
                      "features",
                      e.map((x) => x.value)
                    )
                  }
                  name="features"
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
                {/* Long Description */}
                <label htmlFor="long-description">Long description*</label>
                <textarea
                  type="text"
                  className={["text-input", styles.textAreaInput].join(" ")}
                  id="long-description"
                  {...register("longDescription", { required: true })}
                  placeholder="Describe everything about your listing (~500 words)"
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
            >
              Submit new campaign
            </button>
          </form>
        </motion.div>
      </Layout>
    </>
  );
};

const FileUpload = ({
  register,
  isImageUploading,
  setIsImageUploading,
  images,
  setImages,
  ...props
}) => {
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      for (const file of e.target.files) {
        setIsImageUploading(true);

        if (!file) return toast.warning("Image doesn't exist");

        if (file.size > 4096 * 4096)
          // 1mb
          return toast.warning("Image size too large!");

        let formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "house-bid");

        const res = await (
          await fetch(
            "https://api.cloudinary.com/v1_1/mohit2004/image/upload",
            {
              method: "POST",
              body: formData,
            }
          )
        ).json();

        setIsImageUploading(false);
        if (res.secure_url) {
          setImages([...images, res.secure_url]);
        } else {
          console.log();
          toast.error("Image upload resulted in an error");
        }
      }
    } catch (err) {
      toast.error(`Upload Error: ${err?.message}`);
    }
  };

  return (
    <>
      <div className="formGroup" role="input" type="file">
        <div>
          <label
            htmlFor="images"
            className={["text-input", styles.fileUploadWrapper].join(" ")}
          >
            <FiUploadCloud size={130} color="#B5B5B7" />
            <p>Upload listing images by dragging them here.</p>
            <p>(Tip: Add at least 4 images)</p>
            <input
              type="file"
              accept="image/*"
              multiple
              name="images"
              id="images"
              {...register("images")}
              onChange={handleUpload}
            />
          </label>
        </div>
      </div>
      {(images?.length > 0 || isImageUploading) && (
        <div className={styles.imagesWrapper}>
          {/* Images */}
          {images.map((image, i) => (
            <div className={styles.item}>
              <div className={styles.imageWrapper}>
                <Image
                  src={image}
                  alt={image}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <button
                onClick={(e) => {
                  e.preventDefault();

                  setImages(images.filter((_, idx) => idx !== i));
                }}
              >
                <BiX color="white" size={30} />
              </button>
            </div>
          ))}

          {/* Loading Skeleton */}
          {isImageUploading && (
            <ContentLoader
              speed={2}
              width={150}
              height={80}
              viewBox="0 0 150 80"
              backgroundColor="#f3f3f3"
              foregroundColor="#ecebeb"
              {...props}
            >
              <rect x="0" y="0" rx="10" ry="10" width="150" height="80" />
            </ContentLoader>
          )}
        </div>
      )}
    </>
  );
};

const SelectInput = ({ name, options, onChange }) => (
  <Select
    id={name}
    name={name}
    options={options}
    onChange={onChange}
    isMulti
    isSearchable
    styles={{
      control: (provided) => ({
        ...provided,
        padding: "10px 15px",
        borderRadius: "10px",
      }),
    }}
  />
);

import { getSession } from "next-auth/react";

export const getServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  return {
    props: {
      session,
    },
  };
};

export default CreateListingPage;
