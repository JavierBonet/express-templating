#!/usr/bin/env node

import { generateResource } from "./commands";
import { Config } from "./config";
import { createCommand } from "commander";
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
  .option("--dbEngine <string>", "database engine", "mysql")
  .option("--dbPort <number>", "database port", "3306")
  .option("--dbDirectory <string>", "database directory", "database")
  .option("--srcDirectory <string>", "source directory", "src")
  .action((resourceName, options) => {
    const { dbEngine, dbPort, dbDirectory, srcDirectory } = options;
    generateResource(
      resourceName,
      new Config(dbEngine, parseInt(dbPort), dbDirectory, srcDirectory)
    );
  });

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
