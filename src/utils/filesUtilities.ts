import fs from "fs";
import asyncFs from "fs/promises";
import Mustache from "mustache";
import { Directory } from "./directoryUtilities";
import { AcceptedType, Config } from "../config";

type PropertyType =
  | AcceptedType.STRING
  | AcceptedType.NUMBER
  | AcceptedType.BOOLEAN
  | AcceptedType.DATE;

const typescriptTypeByProperty: Record<PropertyType, string> = {
  string: "string",
  number: "number",
  boolean: "boolean",
  date: "Date",
};

class FileUtilities {
  private _createdDirectories: string[] = [];
  private _createdFiles: string[] = [];
  private _directory: Directory;

  constructor(config: Config) {
    this._directory = new Directory(
      config.sourceDirectory,
      config.databaseDirectory
    );
  }

  getCreatedDirectories() {
    return this._createdDirectories;
  }

  getCreatedFiles() {
    return this._createdFiles;
  }

  async createDirectories() {
    const routesPath = this._directory.routesPath;
    const servicesPath = this._directory.servicesPath;
    const repositoriesPath = this._directory.repositoriesPath;
    const entitiesPath = this._directory.entitiesPath;
    const paths = [routesPath, servicesPath, repositoriesPath, entitiesPath];

    for (const path of paths) {
      await this.createDirectory(path).then(({ created, directory }) => {
        if (created && directory) {
          this._createdDirectories.push(directory);
        }
      });
    }
  }

  private async createDirectory(
    directoryPath: string
  ): Promise<{ created: boolean; directory?: string }> {
    return asyncFs
      .access(directoryPath, fs.constants.F_OK)
      .then(() => {
        console.log(`Directory ${directoryPath} already exists`);
        return { created: false };
      })
      .catch(async () => {
        return asyncFs
          .mkdir(directoryPath, { recursive: true })
          .then(() => ({
            created: true,
            directory: directoryPath,
          }))
          .catch((err) => {
            console.log(err);
            return { created: false };
          });
      });
  }

  async createFiles(resourceName: string, config: Config) {
    const lowercaseResourceName = this.lowercaseFirstLetter(resourceName);
    const uppercaseResourceName = this.uppercaseFirstLetter(resourceName);
    const routesPath = this._directory.routesPath;
    const servicesPath = this._directory.servicesPath;
    const repositoriesPath = this._directory.repositoriesPath;
    const entitiesPath = this._directory.entitiesPath;
    const templatesPath = this._directory.templatesPath;
    const dataSourcePath = this._directory.dataSourcePath;

    const routesFilePath = `${routesPath}/${lowercaseResourceName}Routes.ts`;
    const routesTemplatePath = `${templatesPath}/routesTemplate.txt`;
    const serviceFilePath = `${servicesPath}/${lowercaseResourceName}Service.ts`;
    const serviceTemplatePath = `${templatesPath}/serviceTemplate.txt`;
    const repositoryFilePath = `${repositoriesPath}/${lowercaseResourceName}Repository.ts`;
    const repositoryTemplatePath = `${templatesPath}/repositoryTemplate.txt`;
    const entityFilePath = `${entitiesPath}/${uppercaseResourceName}.ts`;
    const entityTemplatePath = `${templatesPath}/entityTemplate.txt`;
    const dataSourceFilePath = `${dataSourcePath}/data-source.ts`;
    const dataSourceTemplatePath = `${templatesPath}/dataSourceTemplate.txt`;

    const files = [
      { templatePath: routesTemplatePath, path: routesFilePath },
      { templatePath: serviceTemplatePath, path: serviceFilePath },
      { templatePath: repositoryTemplatePath, path: repositoryFilePath },
      { templatePath: entityTemplatePath, path: entityFilePath },
    ];

    let fields = [];

    for (const property of config.properties) {
      fields.push(
        `\t@Column\n\t${property.name}: ${
          typescriptTypeByProperty[property.type as PropertyType]
        };`
      );
    }

    let replacements: Record<string, string | number> = {
      lowercaseResourceName,
      uppercaseResourceName,
      databaseDirectoryName: config.databaseDirectory,
      goUp: "../".repeat(config.sourceDirectory.split("/").length - 1),
      fields: fields.join("\n\n"),
    };

    for (const file of files) {
      await this.createFile(file.templatePath, file.path, replacements).then(
        ({ created, filepath }) => {
          if (created && filepath) {
            this._createdFiles.push(filepath);
          }
        }
      );
    }

    replacements = {
      databaseEngine: config.databaseEngine,
      databasePort: config.databasePort,
      databaseUserName: "YOUR_DB_USERNAME_HERE",
      databasePassword: "YOUR_DB_PASSWORD_HERE",
      databaseName: "YOUR_DB_NAME_HERE",
    };

    await this.createFile(
      dataSourceTemplatePath,
      dataSourceFilePath,
      replacements
    ).then(({ created, filepath }) => {
      if (created && filepath) {
        this._createdFiles.push(filepath);
      }
    });
  }

  private async createFile(
    templatePath: string,
    filePath: string,
    replacements: Record<string, string | number> = {}
  ): Promise<{ created: boolean; filepath?: string }> {
    return asyncFs
      .access(filePath, fs.constants.F_OK)
      .then(() => ({ created: false }))
      .catch(async () => {
        return asyncFs
          .readFile(templatePath, "utf8")
          .then(async (templateContent) => {
            const content = Mustache.render(templateContent, {
              ...replacements,
            });

            return asyncFs
              .writeFile(filePath, content, "utf8")
              .then(() => ({
                created: true,
                filepath: filePath,
              }))
              .catch(() => ({ created: false }));
          });
      });
  }

  lowercaseFirstLetter(string: string) {
    const result = string[0].toLowerCase() + string.slice(1);
    return result;
  }

  uppercaseFirstLetter(string: string) {
    const result = string[0].toUpperCase() + string.slice(1);
    return result;
  }
}

export default FileUtilities;
