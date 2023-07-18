"use client";

import { ProcessStep } from "@/components/bots";
import { getProject, knowledgePath, useCreateBot } from "@/services";
import { useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import { useState } from "react";
import { Button } from "ui";
import * as Yup from "yup";

const validate = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  gpt_name: Yup.string(),
  nickname: Yup.string(),
  job_position: Yup.string(),
  organization_name: Yup.string(),
});

const processState = ["General", "Knowledge", "Personality"];

const AddBots = () => {
  const [createState, setCreateState] = useState(0);

  const { mutate: createBot } = useCreateBot();
  const { data: projectList } = useQuery({
    queryKey: [knowledgePath],
    queryFn: () => getProject(),
  });

  const {
    handleSubmit,
    handleChange,
    isValid,
    isSubmitting,
    touched,
    values,
    errors,
  } = useFormik({
    validateOnChange: false,
    initialValues: {
      name: "",
      description: "",
      gpt_name: "Gpt-3.5",
      nickname: "",
      job_position: "",
      organization_name: "",
    },
    validationSchema: validate,
    onSubmit: async (values) => {},
  });

  const handleValidate = () => {};

  return (
    <div>
      <h4 className="text-[22px] text-textColor font-semibold mb-[30px]">
        Create your bot&apos;s purpose.
      </h4>

      <ol className="flex max-w-[1068px] mx-auto mb-[60px] px-9">
        {processState.map((title, index) => {
          return (
            <ProcessStep
              key={index}
              title={title}
              step={index + 1}
              isActive={createState === index}
              isPass={createState > index}
              isEnd={index === processState.length - 1}
            />
          );
        })}
      </ol>

      {createState >= 0 && (
        <div className="grid grid-cols-1 gap-5 w-full relative p-4">
          {/* {createState === 0 && ( */}
          {/*   <GeneralStep isShowGpts={true} errors={errors} touched={touched} /> */}
          {/* )} */}
          {/**/}
          {/* {createState === 1 && ( */}
          {/*   <SelectBkdFrom */}
          {/*     projectList={projectList ?? []} */}
          {/*     formValue={values} */}
          {/*     setValues={setValues} */}
          {/*   /> */}
          {/* )} */}
          {/**/}
          {/* {createState === 2 && ( */}
          {/*   <PersonalityStep */}
          {/*     errors={errors} */}
          {/*     formValue={values} */}
          {/*     touched={touched} */}
          {/*     setLanguage={setLanguage} */}
          {/*     language={language} */}
          {/*   /> */}
          {/* )} */}

          <article className="flexCenter mt-10 gap-5">
            <Button
              title="cancel"
              type="button"
              className="w-[180px] h-[50px]"
              onClick={() => setCreateState((prev) => prev - 1)}
            />

            <Button
              title="next"
              type={"button"}
              className="w-[180px] h-[50px]"
              onClick={handleValidate}
            />
          </article>
        </div>
      )}
    </div>
  );
};

export default AddBots;
