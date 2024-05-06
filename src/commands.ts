import { Config } from "./config";
import FileUtilities from "./utils/filesUtilities";
import { printInfoMessage, printSuccessMessages } from "./messaging";

export async function generateResource(resourceName: string, config: Config) {
  const fileUtilities = new FileUtilities(config);

  printInfoMessage("Creating files and directories...");

  await fileUtilities.createDirectories();
  await fileUtilities.createFiles(resourceName, config);

  const createdDirectories = fileUtilities.getCreatedDirectories();
  const createdFiles = fileUtilities.getCreatedFiles();

  if (createdDirectories.length > 0) {
    printSuccessMessages("Created directories:", ...createdDirectories);
  }

  if (createdFiles.length > 0) {
    printSuccessMessages("Created files:", ...createdFiles);
  }
}
