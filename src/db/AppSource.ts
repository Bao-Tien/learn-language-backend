import { DataSource } from "typeorm";
import { Folder } from "./entites/Folder";
import { User } from "./entites/User";
import { Word } from "./entites/Word";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: "18.143.181.19",
  port: 3306,
  username: "root",
  password: "AtWasdjMljx3",
  database: "learning_languages",
  synchronize: true,
  logging: true,
  entities: [Folder, Word, User],
  subscribers: [],
  migrations: [],
});

export async function initConnectionToDatabase() {
  if (AppDataSource.isInitialized === false) {
    await AppDataSource.initialize();
  }
}
