export class Config {
  databaseEngine: string;
  databasePort: number;
  sourceDirectory: string;
  databaseDirectory: string;

  constructor(
    databaseEngine: string = "mysql",
    databasePort: number = 3306,
    databaseDirectory: string = "database",
    sourceDirectory: string = "src"
  ) {
    this.databaseEngine = databaseEngine;
    this.databasePort = databasePort;
    this.databaseDirectory = databaseDirectory;
    this.sourceDirectory = sourceDirectory;
  }
}
