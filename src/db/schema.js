import {
  boolean,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

// CREATE TABLE task (
//  id UUID PRIMARY KEY DEFAULT gen_random_uuid()
//  name VARCHAR(255) NOT NULL UNIQUE
//  description TEXT NOT NULL
//  created_at TIMESTAMP DEFAULT now() NOT NULL
//  updated_at TIMESTAMP DEFAULT now() NOT NULL
// )

export const TaskTable = pgTable("task", {
  // id UUID PRIMARY KEY DEFAULT gen_random_uuid()
  id: uuid("id").primaryKey().defaultRandom(),
  // name VARCHAR(255) NOT NULL UNIQUE
  name: varchar("name", { length: 255 }).notNull().unique(),
  // description TEXT NOT NULL
  description: text("description").notNull(),
  // completed BOOLEAN DEFAULT FALSE NOT NULL
  completed: boolean("completed").default(false).notNull(),
  // created_at TIMESTAMP DEFAULT NOW NOT NULL
  createdAt: timestamp("created_at").defaultNow().notNull(),
  // updated_at TIMESTAMP DEFAULT NOW NOT NULL
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});
