import React, { SetStateAction, useEffect, useState } from "react";
import { CreateBotDto, Project } from "types";
import { InputCheckbox } from "ui";

type Props = {
  projectList: Project[];
  selected?: Project[];
  formValue: CreateBotDto;
  setValues: (
    values: SetStateAction<CreateBotDto>,
    shouldValidate?: boolean
  ) => void;
};

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
        <input
          type="checkbox"
          id="allFolder"
          className="w-6 h-6 accent-primaryColor"
          onChange={handleSelectAll}
          checked={isCheckAll}
        />
        <span className="ml-4 font-medium">All Folders</span>
      </label>

      <ul className="flex flex-wrap gap-10 md:gap-5">
        {projectList.map(({ title, id }) => {
          return (
            <li key={id} className="w-[25%] flex gap-2">
              <InputCheckbox
                value={id}
                title={title}
                name="project_list"
                isChecked={isCheck.includes(id)}
                onClick={handleClick}
              />
              <span>( 0 )</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
