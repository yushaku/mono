import { dropdownFolderItem } from "@/components/ListItem";
import ConfirmDelete from "@/components/dialog/ConfirmDelete";
import EditRoleModal from "@/components/dialog/updateRole";
import { SettingLayout } from "@/components/layout/SettingLayout";
import { useGetTeamInfo } from "@/services/teamServices";
import moment from "moment";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Action, Member } from "types";
import { DropdownMenu, IconCopy } from "ui";

type UpdateNember = Pick<Member, "id" | "role" | "name">;
const Settings = () => {
  const { data } = useGetTeamInfo();
  const [open, setOpen] = useState({ editDialog: false, deleteDialog: false });
  const [member, setMember] = useState<UpdateNember>({
    id: "",
    role: "Member",
    name: "",
  });

  const path = `http://localhost:3000/auth/register?team_id=${data?.team.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(path);
    toast.success("Copyed!!!");
  };

  const handleAction = (type: Action, member: UpdateNember) => {
    const { id, role, name } = member;
    setMember({ id, role, name });

    switch (type) {
      case "delete":
        setOpen({ ...open, deleteDialog: true });
        break;
      case "update":
        setOpen({ ...open, editDialog: true });
        break;
    }
  };

  const handleUpdateRole = () => {};
  const handleDelete = () => {};

  return (
    <section className="h-[85dvh]">
      <article>
        <h2 className="text-textColor text-xl font-semibold">
          Invite your peers
        </h2>
        <div className="flex items-center gap-4 mt-4">
          <span className="flex-1 text-grayColor py-2 px-4 border border-primaryColor rounded-lg">
            {path}
          </span>
          <button
            onClick={handleCopy}
            className="bg-primaryColor py-2 px-4 rounded-lg"
          >
            <IconCopy color="white" width={25} height={25} />
          </button>
        </div>
      </article>

      <article className="mt-8">
        <h2 className="text-textColor text-xl font-semibold">
          Users list in team{" "}
          <span className="text-primaryColor">{data?.team.name}</span>
        </h2>

        <ul className="mt-4 flex flex-col gap-4">
          {data?.members.map((user) => {
            return (
              <li
                key={user.id}
                className="flex text-grayColor items-center justify-between px-2 py-2 rounded-lg"
              >
                <p className="flexCenter gap-4 w-1/5 justify-start">
                  <Image
                    src={user.avatar ? user.avatar : "/man.png"}
                    alt="user avata"
                    width={30}
                    height={30}
                  />
                  <span>{user.name}</span>
                </p>
                <span>{user.role}</span>
                <time>{moment(user.created_at).format("LL")}</time>
                <time>{moment(user.updated_at).format("LL")}</time>

                <div>
                  <DropdownMenu
                    menuFeatures={dropdownFolderItem}
                    handleAction={(type) => handleAction(type, user)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </article>

      <EditRoleModal
        role={member.role}
        name={member.name}
        isOpen={open.editDialog}
        toggleOpen={() => setOpen({ ...open, editDialog: !open.editDialog })}
      />

      <ConfirmDelete
        name={member.name}
        isOpen={open.deleteDialog}
        toggleOpen={() =>
          setOpen({ ...open, deleteDialog: !open.deleteDialog })
        }
      />
    </section>
  );
};

Settings.auth = { required: true };
Settings.Layout = SettingLayout;

export default Settings;
