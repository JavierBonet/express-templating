#!/usr/bin/env node

import { generateResourceHandler } from "./commands";
import { Property } from "./config";
import { createCommand } from "commander";
import { helpMessage } from "./messaging";
const pkg = require("../package.json");

enum Cmd {
  GenerateResourceCommand = "generate-resource",
}

const program = createCommand();

program
  .name(pkg["name"])
  .description(
    "Utility that contains some tools to accelerate building express APIs."
  )
  .version(pkg["version"]);

program.configureHelp({
  sortSubcommands: true,
  helpWidth: 130,
});

program
  .command(Cmd.GenerateResourceCommand)
  .description(
    "Generates resource's routes, service, repository and entity files in their respective folders. It also creates the data source file."
  )
  .argument("<string>", "resource name")
  .argument("<properties...>", "properties", parseProperties, [])
  .option("--dbEngine <string>", "database engine", "mysql")
  .option("--dbPort <number>", "database port", "3306")
  .option("--dbDirectory <string>", "database directory", "database")
  .option("--srcDirectory <string>", "source directory", "src")
  .action(generateResourceHandler);

program.addHelpText("after", helpMessage);

function parseProperties(value: string, previousProperties: Property[]) {
  let newProperties = [...previousProperties];
  const sanitizedValue = value.replace(",", "");
  const [name, type] = sanitizedValue.split(":");
  newProperties.push({ name, type });
  return newProperties;
}

program.parse();
