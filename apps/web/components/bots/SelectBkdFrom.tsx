import { Field } from "formik";
import React, { SetStateAction, useEffect, useState } from "react";
import { CreateBotDto, ProjectDetail } from "types";
import { InputCheckbox } from "ui";

interface Props {
  projectList: ProjectDetail[];
  selected?: ProjectDetail[];
  formValue: CreateBotDto;
  setValues: (
    values: SetStateAction<CreateBotDto>,
    shouldValidate?: boolean
  ) => void;
}

export const SelectBkdFrom = ({
  projectList,
  selected,
  formValue,
  setValues,
}: Props) => {
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<Array<string>>([]);

  useEffect(() => {
    if (selected) setIsCheck(selected.map((item) => item.id));
  }, [selected]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    const listId = projectList.map((li) => li.id);
    setIsCheck(listId);
    setValues({ ...formValue, project_list: listId });
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setIsCheck([...isCheck, value]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== value));
    }
  };

  return (
    <section>
      <label
        className="mb-8 flex justify-start items-start"
        htmlFor="allFolder"
      >
        <Field
          type="checkbox"
          id="allFolder"
          className="w-6 h-6 accent-primaryColor"
          onChange={handleSelectAll}
          checked={isCheckAll}
        />
        <span className="ml-4 font-medium">All Folders</span>
      </label>

      <ul className="flex flex-wrap gap-10 md:gap-5">
        {projectList.map(({ title, id, subproject_count }) => {
          return (
            <li key={id} className="w-[25%] flex gap-2">
              <InputCheckbox
                value={id}
                title={title}
                name="project_list"
                isChecked={isCheck.includes(id)}
                onClick={handleClick}
              />
              <span>( {subproject_count} )</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
