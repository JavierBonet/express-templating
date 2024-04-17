#!/usr/bin/env node

import yargs from "yargs";
import fs from "fs";
import { marked } from "marked";
import { markedTerminal } from "marked-terminal";

// @ts-ignore
marked.use(markedTerminal());

enum Command {
  "generateResource" = "generate-resource",
}

const args = yargs.argv;

args;

// @ts-ignore
const command = args["_"][0];
// @ts-ignore
const resourceName = args["name"];

const helpMessageMarkdown = `
  # Valid commands
  - **generate-resource**: Generates resource's routes, service and repository files in their respective folders
    - Needed options: --name *resourceName*
  # Another title
  - baasdf **asdfas**
  - asfasdf
    - ewrwerew *sdfa* ffeefw`;

const helpMessage = marked.parse(helpMessageMarkdown);

function processCommand(command: Command) {
  if (command !== "generate-resource") {
    console.error("Invalid command!");
    console.log(helpMessage);
    return;
  }

  if (command === Command.generateResource) {
    generateResourceFiles(resourceName);
  }
}

function generateResourceFiles(resourceName: string) {
  if (!resourceName || typeof resourceName !== "string") {
    console.error("No resource name provided!");
    console.log(helpMessage);
    return;
  }

  createDirectories();
  console.log("command:", command);
  console.log("name:", resourceName);
}

function createDirectories() {
  createDirectory("routes");
  createDirectory("services");
  createDirectory("repositories");
}

function createDirectory(directoryName: string) {
  const directoryPath = `src/${directoryName}`;
  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
    console.log(`Created ${directoryName} directory`);
  }
}

processCommand(command);
