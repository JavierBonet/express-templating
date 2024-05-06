export interface Property {
  name: string;
  type: string;
}

export enum AcceptedType {
  STRING = "string",
  NUMBER = "number",
  BOOLEAN = "boolean",
  DATE = "date",
}

export const acceptedTypes = new Set<AcceptedType>([
  AcceptedType.STRING,
  AcceptedType.NUMBER,
  AcceptedType.BOOLEAN,
  AcceptedType.DATE,
]);

const defaultDBDirectory = "database";
const defaultSrcDirectory = "src";
const defaultDatabaseEngine = "mysql";
const defaultDatabasePort = 3306;

export class Config {
  databaseEngine: string;
  databasePort: number;
  sourceDirectory: string;
  databaseDirectory: string;
  properties: Property[];

  constructor(
    properties: Property[],
    databaseEngine?: string,
    databasePort?: number,
    databaseDirectory?: string,
    sourceDirectory?: string
  ) {
    this.databaseEngine = databaseEngine ?? defaultDatabaseEngine;
    this.databasePort = databasePort ?? defaultDatabasePort;
    this.databaseDirectory = databaseDirectory ?? defaultDBDirectory;
    this.sourceDirectory = sourceDirectory ?? defaultSrcDirectory;
    this.properties = properties;
  }
}
