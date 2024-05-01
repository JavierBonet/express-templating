const defaultDBDirectory = "database";
const defaultSrcDirectory = "src";

export class Config {
  databaseEngine: string;
  databasePort: number;
  sourceDirectory: string;
  databaseDirectory: string;

  constructor(
    databaseEngine: string = "mysql",
    databasePort: number = 3306,
    databaseDirectory: string,
    sourceDirectory: string
  ) {
    this.databaseEngine = databaseEngine;
    this.databasePort = databasePort;
    this.databaseDirectory = databaseDirectory ?? defaultDBDirectory;
    this.sourceDirectory = sourceDirectory ?? defaultSrcDirectory;
  }
}
