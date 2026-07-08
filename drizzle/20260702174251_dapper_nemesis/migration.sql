ALTER TABLE "task" ADD COLUMN "completed" boolean DEFAULT false NOT NULL;--> statement-breakpoint
ALTER TABLE "task" ALTER COLUMN "description" SET NOT NULL;