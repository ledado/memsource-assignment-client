export interface ProjectListResponse {
  _embedded: {
    projects: ProjectItem[];
  };
  _links: any;
}

export interface ProjectItem {
  id: number;
  name: string;
  sourceLanguage: string;
  status: ProjectStatusEnum;
  targetLanguages: string[];
  dateCreated: string;
  dateUpdated: string;
  dateDue: string;
}

export enum ProjectStatusEnum {
  NEW = 'NEW',
  COMPLETED = 'COMPLETED',
  DELIVERED = 'DELIVERED',
}

export enum ProjectFormTypeEnum {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
}
