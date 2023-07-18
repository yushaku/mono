import { FormikErrors, FormikTouched } from "formik";
import React from "react";
import { CreateBotDto } from "types";
import { FormInput, InputRadio } from "ui";

type Props = {
  isShowGpts: boolean;
  errors: FormikErrors<CreateBotDto>;
  touched: FormikTouched<CreateBotDto>;
};

export const GeneralStep = ({ isShowGpts, errors, touched }: Props) => {
  const isFreePlan = true;

  return (
    <section className="flex flex-col md:flex-row justify-center gap-[30px]">
      <div className="flex flex-col md:w-1/2 gap-5">
        <FormInput<CreateBotDto>
          type="text"
          name="name"
          label="Bot Name*"
          placeholder="Eg. Factual Story Ai"
        />

        <FormInput<CreateBotDto>
          type="text"
          name="description"
          label="Bot Description*"
          placeholder="Eg. Factual Story Ai"
        />
      </div>

      {isShowGpts && (
        <div className="md:w-1/2">
          <p className="font-bold text-base mb-3">Model</p>
          <div className="grid gap-y-5">
            <InputRadio
              name="gpt_name"
              title="GPT-3.5"
              description="The fastest and cheapest model good for most use cases."
            />

            <InputRadio
              name="gpt_name"
              title="GPT-4"
              description="More powerful but slower model for advanced reasoning or content creation need."
              isDisable={isFreePlan}
            />
          </div>
        </div>
      )}
    </section>
  );
};
