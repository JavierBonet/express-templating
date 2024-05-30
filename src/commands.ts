import {
  AcceptedDbEngine,
  AcceptedType,
  Config,
  Property,
  acceptedDbEngines,
  acceptedTypes,
} from "./config";
import FileUtilities from "./utils/filesUtilities";
import {
  invalidDbEngine,
  invalidPropertiesMessage,
  printInfoMessage,
  printSuccessMessages,
  printWarningMessages,
} from "./messaging";

interface Options {
  dbEngine?: string;
  dbPort?: string;
  dbDirectory?: string;
  srcDirectory?: string;
}

export function generateResourceHandler(
  resourceName: string,
  properties: Property[],
  options: Options
) {
  const { dbEngine, dbPort, dbDirectory, srcDirectory } = options;
  if (propertiesAreValid(properties)) {
    console.log(properties);
    if (!dbEngine || dbEngineIsValid(dbEngine)) {
      generateResource(
        resourceName,
        new Config(
          properties,
          dbEngine,
          parseInt(dbPort || ""),
          dbDirectory,
          srcDirectory
        )
      );
    } else {
      printWarningMessages(invalidDbEngine);
    }
  } else {
    printWarningMessages(invalidPropertiesMessage);
  }
}

function propertiesAreValid(properties: Property[]) {
  let valid = true;
  for (const property of properties) {
    if (!property.type || !acceptedTypes.has(property.type as AcceptedType)) {
      valid = false;
      break;
    }
  }
  return valid;
}

/**
 * Checks if the given database engine is valid.
 *
 * @param {string} dbEngine - The database engine to check.
 * @return {boolean} True if the database engine is valid, false otherwise.
 */ function dbEngineIsValid(dbEngine: string): boolean {
  return acceptedDbEngines.has(dbEngine as AcceptedDbEngine);
}

async function generateResource(resourceName: string, config: Config) {
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
