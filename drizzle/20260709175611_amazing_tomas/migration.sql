CREATE TYPE "task_status_enum" AS ENUM('pending', 'in-progress', 'completed');--> statement-breakpoint
ALTER TABLE "task" RENAME COLUMN "completed" TO "status";--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "status" SET DATA TYPE "task_status_enum" USING "status"::"task_status_enum";--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "status" SET DEFAULT 'pending'::"task_status_enum";