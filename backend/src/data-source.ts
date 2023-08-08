import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { User } from "./Entities/user.entity";
import { Annoucement } from "./Entities/annoucement.entity";
import { Image } from "./Entities/image.entity";
import { Address } from "./Entities/addresses.entity";
import { Comments } from "./Entities/comments.entity";
import { a1681926720044 } from "./Migrations/1681926720044-a";
import { cascade1682421781005 } from "./Migrations/1682421781005-cascade";
import { Comments1683203764512 } from "./Migrations/1683203764512-comments";
import { createEntities1683651986483 } from "./Migrations/1683651986483-createEntities";

const AppDataSource = new DataSource(
  process.env.NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        synchronize: true,
        entities: ["src/Entities/*.ts"],
      }
    : {
        type: "postgres",
        host: process.env.PGHOST,
        port: parseInt(process.env.PGPORT!),
        username: process.env.PGUSER,
        password: `${process.env.PGPASSWORD!}`,
        database: process.env.PGDATABASE,
        logging: true,
        synchronize: false,
        ssl: Boolean(process.env.SSLMODE),
        entities: [User, Annoucement, Image, Address, Comments],
        migrations: [
          a1681926720044,
          cascade1682421781005,
          Comments1683203764512,
          createEntities1683651986483,
        ],
      }
);

export default AppDataSource;
