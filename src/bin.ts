#!/usr/bin/env node

import yargs from "yargs";
import { generateResource } from "./commands";
import { printErrorMessage, printHelpMessage } from "./messaging";

enum Command {
  "generateResource" = "generate-resource",
}

const args = yargs.parseSync(process.argv.slice(2));

const command = args["_"][0] as Command;
const resourceName = args["name"] as string;

function processCommand(command: Command) {
  if (command !== "generate-resource") {
    printErrorMessage("Invalid command!");
    printHelpMessage();
    return;
  }

  if (command === Command.generateResource) {
    generateResource(resourceName);
  }
}

processCommand(command);
