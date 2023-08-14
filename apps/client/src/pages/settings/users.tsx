import { SettingLayout } from "@/components/layout";
import React from "react";

const UserSettingsPage = () => {
  return (
    <section className="h-[85dvh]">
      <article>
        <h2 className="text-textColor text-xl font-semibold">
          Edit your profile
        </h2>
      </article>
    </section>
  );
};

UserSettingsPage.auth = { required: true };
UserSettingsPage.Layout = SettingLayout;

export default UserSettingsPage;
