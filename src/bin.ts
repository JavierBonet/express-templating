#!/usr/bin/env node

import { generateResource } from "./commands";
import { AcceptedType, Config, Property, acceptedTypes } from "./config";
import { createCommand } from "commander";
import { invalidPropertiesMessage, printWarningMessages } from "./messaging";
const pkg = require("../package.json");

enum Cmd {
  GenerateResourceCommand = "generate-resource",
}

interface Options {
  dbEngine?: string;
  dbPort?: string;
  dbDirectory?: string;
  srcDirectory?: string;
  properties: Property[];
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
  .option("--dbEngine <string>", "database engine", "mysql")
  .option("--dbPort <number>", "database port", "3306")
  .option("--dbDirectory <string>", "database directory", "database")
  .option("--srcDirectory <string>", "source directory", "src")
  .option(
    "-ps, --properties <properties...>",
    "comma separated name:type",
    parseProperties,
    []
  )
  .action((resourceName, options: Options) => {
    const { dbEngine, dbPort, dbDirectory, srcDirectory, properties } = options;
    if (propertiesAreValid(properties)) {
      console.log(properties);
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
      printWarningMessages(invalidPropertiesMessage);
    }
  });

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
function parseProperties(value: string, previousProperties: Property[]) {
  let newProperties = [...previousProperties];
  const sanitizedValue = value.replace(",", "");
  const [name, type] = sanitizedValue.split(":");
  newProperties.push({ name, type });
  return newProperties;
}

// program
//   .command("bla-bla")
//   .description("noooooooooooooooooo.")
//   .option("--name", "resource name")
//   .option("--dbEngine <string>", "database engine", "mysql")
//   .action((str, options) => {
//     // const limit = options.first ? 1 : undefined;
//     console.log("NOTHIIIING");
//   });

program.parse();
