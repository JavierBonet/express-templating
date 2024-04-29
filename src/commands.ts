import { Config } from "./config";
import FileUtilities from "./utils/filesUtilities";
import {
  printErrorMessage,
  printHelpMessage,
  printSuccessMessages,
} from "./messaging";

export async function generateResource(resourceName: string, config: Config) {
  if (!resourceName || typeof resourceName !== "string") {
    printErrorMessage("No resource name provided!");
    printHelpMessage();
    return;
  }

  const fileUtilities = new FileUtilities(config);

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
