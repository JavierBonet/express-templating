import { centeredDot, pencilIcon } from "./icons";
import { PrettyConsole } from "./prettyConsole";

const prettyConsole = new PrettyConsole();

function initializePrettyConsole() {
  prettyConsole.clear();
}

initializePrettyConsole();

const helpMessageSections = [
  `
${pencilIcon} Valid commands
  ${centeredDot} generate-resource: Generates resource's routes, service and repository files in their respective folders
    ${centeredDot} Needed options: --name resourceName`,
  `
${pencilIcon} ANOTHER SECTION
  ${centeredDot} DESCRIPTION`,
];

export const printHelpMessage = () =>
  prettyConsole.info(...helpMessageSections);

export const printErrorMessage = (errorMessage: string) =>
  prettyConsole.error(errorMessage, "");

export const printSuccessMessage = (message: string) => {
  prettyConsole.success(message, "");
};

export const printSuccessMessages = (...message: string[]) => {
  prettyConsole.success(...message);
};

export const printInfoMessage = (message: string) => {
  prettyConsole.info(message, "");
};
