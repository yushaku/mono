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
export type ActionType = "FILE" | "TEXT" | "WEBSITE";

export class CreateContentDto {
  knowledge_id: string;
  title: string;
  type: ActionType;
  file_link?: string;
  text?: string;
}

export type PreSignFile = {
  formData: FormData;
  postURL: string;
};

export type FormData = {
  key: string;
  policy: string;
  "Content-Type": string;
  "x-amz-algorithm": string;
  "x-amz-credential": string;
  "x-amz-date": string;
  "x-amz-signature": string;
};
