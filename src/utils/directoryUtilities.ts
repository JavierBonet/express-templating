import { rootPath } from "get-root-path";

export class Directory {
  private _sourceDirectory: string;
  private _databaseDirectory: string;
  routesPath: string;
  servicesPath: string;
  repositoriesPath: string;
  entitiesPath: string;
  dataSourcePath: string;
  templatesPath: string;

  constructor(sourceDirectory: string, databaseDirectory: string) {
    this._sourceDirectory = sourceDirectory;
    this._databaseDirectory = databaseDirectory;

    this.routesPath = `${rootPath}/${this._sourceDirectory}/routes`;
    this.servicesPath = `${rootPath}/${this._sourceDirectory}/services`;
    this.repositoriesPath = `${rootPath}/${this._sourceDirectory}/repositories`;
    this.entitiesPath = `${rootPath}/${this._databaseDirectory}/entities`;
    this.dataSourcePath = `${rootPath}/${this._databaseDirectory}`;
    this.templatesPath = `${__dirname}/../file-content`;
  }
}
