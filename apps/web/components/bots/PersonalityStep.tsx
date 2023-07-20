import { FormikErrors } from "formik";
import React, { ReactElement } from "react";
import { CreateBotDto, UpdateBotDto } from "types";

type Props = {
  errors: FormikErrors<CreateBotDto | UpdateBotDto>;
  formValue: CreateBotDto | UpdateBotDto;
};

export const PersonalityStep = ({ errors, formValue }: Props) => {
  return (
    <section>
      <PersonalityBot title="Ai Information">
        <article className="grid grid-cols-1 md:grid-cols-3 gap-[30px] mt-4">
          {/* <FormInput<CreateBotDto> */}
          {/*   errors={errors.description} */}
          {/*   touched={touched} */}
          {/*   type="text" */}
          {/*   name="job_position" */}
          {/*   label="AI's Job Title/Position" */}
          {/*   placeholder="Eg. Assistant" */}
          {/* /> */}
          {/**/}
          {/* <FormInput<CreateBotDto> */}
          {/*   errors={errors} */}
          {/*   touched={touched} */}
          {/*   type="text" */}
          {/*   name="organization_name" */}
          {/*   label="Organization Name" */}
          {/*   placeholder="Eg. Story Ai LLC" */}
          {/* /> */}
        </article>
      </PersonalityBot>

      <PersonalityBot
        title="Knowledge Base Strictness"
        description="How much should the AI stick to the source knowledge."
      >
        <div></div>
        {/* <ul className="mt-4 flex flex-wrap gap-5"> */}
        {/*   {botKnowledgeBase.map(({ title, icon }, index) => { */}
        {/*     const isChecked = title === formValue.knowledge_base; */}
        {/*     return ( */}
        {/*       <RadioButton */}
        {/*         isChecked={isChecked} */}
        {/*         key={index} */}
        {/*         title={title} */}
        {/*         name="knowledge_base" */}
        {/*         icon={icon} */}
        {/*       /> */}
        {/*     ); */}
        {/*   })} */}
        {/* </ul> */}
      </PersonalityBot>

      <PersonalityBot
        title="Desired Output Types"
        description="Choose the types of output the AI should focus on."
      >
        <ul className="mt-4 flex flex-wrap gap-5">
          {/* {mocDesiredTypes.map((title, index) => { */}
          {/*   const isChecked = formValue.desired_output_type === title; */}
          {/*   return ( */}
          {/*     <RadioButton */}
          {/*       key={index} */}
          {/*       title={title} */}
          {/*       isChecked={isChecked} */}
          {/*       name="desired_output_type" */}
          {/*     /> */}
          {/*   ); */}
          {/* })} */}
        </ul>
      </PersonalityBot>

      <PersonalityBot
        title="Handling Unanswerable Queries"
        description="Decide how the AI should react when it cannot answer a
                    query."
      >
        <ul className="mt-4 flex flex-wrap gap-5">
          {/* {mocUnanswerableQueries.map((title, index) => { */}
          {/*   const isChecked = formValue.unanswerable_query === title; */}
          {/*   return ( */}
          {/*     <RadioButton */}
          {/*       key={index} */}
          {/*       title={title} */}
          {/*       isChecked={isChecked} */}
          {/*       name="unanswerable_query" */}
          {/*     /> */}
          {/*   ); */}
          {/* })} */}

          {/* <li className="lg:w-[528px]">
            <FormInput<CreateBotDto>
              errors={errors}
              touched={touched}
              type="text"
              name="unanswerable_query"
              placeholder="URL to Visit"
            />
          </li> */}
        </ul>
      </PersonalityBot>
    </section>
  );
};

const PersonalityBot = ({
  children,
  title,
  description,
}: {
  children: ReactElement;
  title: string;
  description?: string;
}) => {
  return (
    <div className="mt-[60px]">
      <h3 className="text-textColor font-bold text-xl">{title}</h3>
      <p className="text-grayColor text-sm mt-2">{description}</p>
      {children}
    </div>
  );
};
