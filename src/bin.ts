#!/usr/bin/env node

import yargs from "yargs";
import { generateResource } from "./commands";
import { printErrorMessage, printHelpMessage } from "./messaging";
import { Config } from "./config";

enum Command {
  "generateResource" = "generate-resource",
}

const args = yargs.parseSync(process.argv.slice(2));

const command = args["_"][0] as Command;
const resourceName = args["name"] as string;
const databaseEngine = args["dbEngine"] as string;
const databasePort = args["dbPort"] as number;
const databaseDirectory = args["dbDirectory"] as string;
const sourceDirectory = args["srcDirectory"] as string;

function processCommand(command: Command) {
  if (command !== "generate-resource") {
    printErrorMessage("Invalid command!");
    printHelpMessage();
    return;
  }

  if (command === Command.generateResource) {
    const config = new Config(
      databaseEngine,
      databasePort,
      databaseDirectory,
      sourceDirectory
    );
    generateResource(resourceName, config);
  }
}

processCommand(command);
