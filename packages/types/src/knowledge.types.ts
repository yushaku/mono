export type CreateProjectDto = {
  title: string;
};

export type UpdateProjectDto = CreateProjectDto & {
  id: string;
};

export type Project = UpdateProjectDto & {
  team_id: string;
};

export type FolderContent = {
  folder: UpdateProjectDto;
  contentList: any[];
};
export type ActionType = "WRITE" | "UPLOAD" | "CRAWL";
