export type CreateProjectDto = {
  title: string;
};

export type UpdateProjectDto = CreateProjectDto & {
  id: string;
};

export type Project = UpdateProjectDto & {
  team_id: string;
};
