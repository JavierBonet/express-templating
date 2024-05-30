import { acceptedDbEngines, acceptedTypes } from "./config";
import { centeredDot, pencilIcon } from "./icons";
import { PrettyConsole } from "./prettyConsole";

const prettyConsole = new PrettyConsole();

function initializePrettyConsole() {
  prettyConsole.clear();
}

initializePrettyConsole();

export const printErrorMessage = (errorMessage: string) =>
  prettyConsole.error(errorMessage, "");

export const printErrorMessages = (errorMessage: string[]) =>
  prettyConsole.error(...errorMessage);

export const printSuccessMessage = (message: string) => {
  prettyConsole.success(message, "");
};

export const printSuccessMessages = (...message: string[]) => {
  prettyConsole.success(...message);
};

export const printInfoMessage = (message: string) => {
  prettyConsole.info(message, "");
};

export const printWarningMessage = (message: string) => {
  prettyConsole.warn(message, "");
};

export const printWarningMessages = (messages: string[]) => {
  prettyConsole.warn(...messages);
};

export const invalidPropertiesMessage = [
  "Check the properties, all of them must have the format name:type",
  `Allowed types are: \n\t- ${Array.from(acceptedTypes).join(",\n\t- ")}`,
];

export const invalidDbEngine = [
  `Check the dbEngine option, the allowed values are: \n\t- ${Array.from(
    acceptedDbEngines
  ).join(",\n\t- ")}`,
];

const acceptedTypesMessage = `Allowed types are: \n\t- ${Array.from(
  acceptedTypes
).join("\n\t- ")}`;

export const helpMessage = `
Complete generate resource command call:
  generate-resource <resourceName> <field1>:number <field2>:string <field3>:date --dbEngine postgres --dbPort 3307 --dbDirectory myDir/database --srcDirectory myDir/src

${acceptedTypesMessage}
`;
