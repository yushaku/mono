import {
  GeneralStep,
  PersonalityStep,
  ProcessStep,
  SelectBkdFrom,
} from "@/components/bots";
import { BotLayout } from "@/components/layout";
import { useCreateBot, useGetProjects } from "@/services";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateBotDto } from "types";
import { Button } from "ui";
import * as Yup from "yup";

const validate = Yup.object().shape({
  name: Yup.string().required("This field is required"),
  description: Yup.string().required("This field is required"),
  model: Yup.string(),
  knowledge_base: Yup.array(),
  relevance_score: Yup.string(),
});

const processState = ["General", "Knowledge", "Personality"];

const AddBots = () => {
  const router = useRouter();
  const [createState, setCreateState] = useState(0);

  const { mutate: createBot } = useCreateBot();
  const { data: projectList } = useGetProjects();
  const { handleSubmit, handleChange, validateField, isValid, values, errors } =
    useFormik({
      validateOnChange: false,
      initialValues: {
        name: "",
        description: "",
        model: "Gpt-3.5",
        knowledge_base: [""],
        relevance_score: "Balanced",
      },
      validationSchema: validate,
      onSubmit: async (values) => {
        createBot(values as CreateBotDto);
      },
    });

  const handleNext = () => {
    if (createState === 0) {
      validateField("name");
      if (isValid) setCreateState((prev) => prev + 1);
    } else if (createState === 2) {
      handleSubmit();
    } else setCreateState((prev) => prev + 1);
  };

  const handleBack = () => {
    if (createState === 0) router.back();
    setCreateState((prev) => prev - 1);
  };

  return (
    <section>
      <h4 className="text-[20px] text-grayColor font-semibold mb-[30px]">
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
          {createState === 0 && (
            <GeneralStep
              isShowGpts={true}
              values={values as CreateBotDto}
              errors={errors}
              onChange={handleChange}
            />
          )}

          {createState === 1 && (
            <SelectBkdFrom
              projectList={projectList ?? []}
              formValue={values as CreateBotDto}
              setValues={handleChange}
            />
          )}

          {createState === 2 && (
            <PersonalityStep
              errors={errors}
              formValue={values as CreateBotDto}
            />
          )}

          <article className="flexCenter mt-10 gap-5">
            <Button
              title="cancel"
              type="button"
              className="w-[180px] h-[50px] border-primaryColor"
              onClick={handleBack}
            />

            <Button
              title="next"
              type={"button"}
              className="w-[180px] h-[50px] bg-primaryColor text-white"
              onClick={handleNext}
            />
          </article>
        </div>
      )}
    </section>
  );
};

AddBots.auth = { required: true };
AddBots.Layout = BotLayout;

export default AddBots;
