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
