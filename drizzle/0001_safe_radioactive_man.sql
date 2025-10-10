ALTER TABLE "estimations" DROP CONSTRAINT "estimation_positive";--> statement-breakpoint
ALTER TABLE "estimations" ADD CONSTRAINT "estimation_positive" CHECK ("estimations"."estimation" >= 0);