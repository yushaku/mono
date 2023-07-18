export type CreateProjectDto = {
  title: string;
};

export type ProjectDetail = {
  id: string;
  title: string;
  subproject_count: number;
};

export type UpdateProjectDto = CreateProjectDto & {
  id: string;
};

export type Project = UpdateProjectDto & {
  team_id: string;
};

export type FolderContent = {
  folder: UpdateProjectDto;
  contentList: Content[];
};
export type ActionType = "FILE" | "TEXT" | "WEBSITE";

export type Content = {
  id: string;
  category: string | null;
  knowledge_id: string;
  text: string;
  file_link: string;
  title: string;
  type: ActionType;
  is_trained: boolean;
  created_at: string;
  updated_at: string;
};

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
