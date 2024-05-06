import { acceptedTypes } from "./config";
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
