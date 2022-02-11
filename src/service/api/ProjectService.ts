import BaseService from '@/service/api/BaseService';
import {AxiosPromise} from 'axios';
import {ProjectItem, ProjectListResponse} from '@/service/api/types/ProjectTypes';

export default class ProjectService extends BaseService {
  static getAll(): AxiosPromise<ProjectListResponse> {
    return this.get(`projects`);
  }

  static getDetail(projectId: string): AxiosPromise<ProjectItem> {
    return this.get(`projects/${projectId}`);
  }

  static createProject(project: ProjectItem): AxiosPromise<any> {
    return this.post(`projects`, project);
  }

  static updateProject(project: ProjectItem): AxiosPromise<any> {
    return this.put(`projects/${project.id}`, project);
  }
}
