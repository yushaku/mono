import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { useRef } from "react";
import { FormInput, Button } from "ui";
import * as Yup from "yup";

interface EditorTypes {
  title: string;
  content: string;
}

type Props = { onCreate: (title: string, text: string) => void };

export const TextEditor = ({ onCreate }: Props) => {
  const TINY_API_KEY = process.env.TINY_API_KEY ?? "";
  const editorRef = useRef(null);

  const { handleSubmit, handleChange, isValid, isSubmitting, values, errors } =
    useFormik({
      validateOnChange: false,
      initialValues: { title: "", content: "" },
      validationSchema: Yup.object().shape({
        title: Yup.string().required("This field is required"),
        content: Yup.string().required("This field is required"),
      }),
      onSubmit: async (values) => {
        onCreate(values.title, values.content);
      },
    });

  return (
    <div className="my-12">
      <FormInput<EditorTypes>
        errors={errors.title}
        value={values.title}
        onChange={handleChange}
        name="title"
        type="text"
        label="Document Title"
        placeholder="Title"
      />

      <h5 className="mb-3 mt-8 text-grayColor font-semibold">Content</h5>

      <Editor
        apiKey={TINY_API_KEY}
        onInit={(editor: any) => (editorRef.current = editor)}
        onEditorChange={(stringifiedHtmlValue) => {
          values.content = stringifiedHtmlValue;
        }}
        init={{
          height: 300,
          resize: true,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
            "fullscreen",
          ],
          toolbar:
            "undo redo | " +
            "blocks | " +
            "bullist numlist | " +
            "forecolor backcolor | " +
            "outdent indent | " +
            "bold italic | " +
            "fullscreen",
          textpattern_patterns: [{ start: "*", end: "*", format: "italic" }],
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />

      <div className="flex gap-3">
        <Button
          type="submit"
          title="Create"
          disabled={!isValid || isSubmitting}
          onClick={() => handleSubmit()}
          className="mt-7 w-44 h-12 bg-primaryColor text-white"
        />
      </div>
    </div>
  );
};
