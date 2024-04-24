import fs from "fs";
import asyncFs from "fs/promises";
import Mustache from "mustache";

const sourceDirectory = "src";
const databaseDirectory = "database";
const entitiesDirectory = `${databaseDirectory}/entities`;
const routesPath = `${sourceDirectory}/routes`;
const servicesPath = `${sourceDirectory}/services`;
const repositoriesPath = `${sourceDirectory}/repositories`;
const templatesDirectory = `${__dirname}/file-content`;

class FileUtilities {
  private _createdDirectories: string[] = [];
  private _createdFiles: string[] = [];

  getCreatedDirectories() {
    return this._createdDirectories;
  }

  getCreatedFiles() {
    return this._createdFiles;
  }

  async createDirectories() {
    return Promise.all([
      this.createDirectory("routes").then(({ created, directory }) => {
        if (created && directory) {
          this._createdDirectories.push(directory);
        }
      }),

      this.createDirectory("services").then(({ created, directory }) => {
        if (created && directory) {
          this._createdDirectories.push(directory);
        }
      }),

      this.createDirectory("repositories").then(({ created, directory }) => {
        if (created && directory) {
          this._createdDirectories.push(directory);
        }
      }),
    ]);
  }

  private async createDirectory(
    directoryName: string
  ): Promise<{ created: boolean; directory?: string }> {
    const directoryPath = `${sourceDirectory}/${directoryName}`;

    return asyncFs
      .access(directoryPath, fs.constants.F_OK)
      .then(() => ({ created: false }))
      .catch(async () => {
        return asyncFs
          .mkdir(directoryPath)
          .then(() => ({
            created: true,
            directory: directoryPath,
          }))
          .catch(() => ({ created: false }));
      });
  }

  async createFiles(resourceName: string) {
    const lowercaseResourceName = this.lowercaseFirstLetter(resourceName);
    const routesFilePath = `${routesPath}/${lowercaseResourceName}Routes.ts`;
    const routesTemplatePath = `${templatesDirectory}/routesTemplate.txt`;
    const serviceFilePath = `${servicesPath}/${lowercaseResourceName}Service.ts`;
    const serviceTemplatePath = `${templatesDirectory}/serviceTemplate.txt`;
    const repositoryFilePath = `${repositoriesPath}/${lowercaseResourceName}Repository.ts`;
    const repositoryTemplatePath = `${templatesDirectory}/repositoryTemplate.txt`;

    return Promise.all([
      this.createFile(routesTemplatePath, routesFilePath, resourceName).then(
        ({ created, filepath }) => {
          if (created && filepath) {
            this._createdFiles.push(filepath);
          }
        }
      ),
      this.createFile(serviceTemplatePath, serviceFilePath, resourceName).then(
        ({ created, filepath }) => {
          if (created && filepath) {
            this._createdFiles.push(filepath);
          }
        }
      ),
      this.createFile(
        repositoryTemplatePath,
        repositoryFilePath,
        resourceName
      ).then(({ created, filepath }) => {
        if (created && filepath) {
          this._createdFiles.push(filepath);
        }
      }),
    ]);
  }

  private async createFile(
    templatePath: string,
    filePath: string,
    resourceName: string
  ): Promise<{ created: boolean; filepath?: string }> {
    const lowercaseResourceName = this.lowercaseFirstLetter(resourceName);
    const uppercaseResourceName = this.uppercaseFirstLetter(resourceName);

    return asyncFs
      .access(filePath, fs.constants.F_OK)
      .then(() => ({ created: false }))
      .catch(async () => {
        return asyncFs
          .readFile(templatePath, "utf8")
          .then(async (templateContent) => {
            const content = Mustache.render(templateContent, {
              lowercaseResourceName,
              uppercaseResourceName,
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
