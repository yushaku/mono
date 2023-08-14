import { useFormik } from "formik";
import { FormInput, Button } from "ui";
import * as Yup from "yup";

type Props = { onCrawlWebsite: (link: string) => void };

export const CrawlWebsiteForm = ({ onCrawlWebsite }: Props) => {
  const { handleSubmit, handleChange, isValid, isSubmitting, values, errors } =
    useFormik({
      validateOnChange: false,
      initialValues: { link: "" },
      validationSchema: Yup.object().shape({
        link: Yup.string().required("This field is required"),
      }),
      onSubmit: (values) => {
        onCrawlWebsite(values.link);
      },
    });

  return (
    <div className="border border-[#ebebeb] rounded-lg mt-5 p-5">
      <FormInput<{ link: string }>
        errors={errors.link}
        value={values.link}
        onChange={handleChange}
        type="text"
        name="link"
        label="Import Website"
        placeholder="https://example.com"
      />

      <h5 className="font-semibold text-grayColor mt-4">Crawl Website</h5>

      <p className="text-grayColor py-3">
        Crawls your website for all textual content that Tigon AI can learn
        from, it works even better if you import with a sitemap link.
      </p>

      <h5 className="text-primaryColor font-semibold">Update to Premium</h5>

      <Button
        title="Import Website"
        disabled={!isValid || isSubmitting}
        onClick={() => handleSubmit()}
        className="mt-8 w-48 h-11 bg-primaryColor text-white"
      />
    </div>
  );
};
