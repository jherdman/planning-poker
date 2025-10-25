ALTER TABLE "tickets" DROP CONSTRAINT "tickets_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "tickets" DROP COLUMN "user_id";