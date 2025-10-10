CREATE TABLE "estimations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "estimations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"party_id" integer NOT NULL,
	"estimation" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "estimation_positive" CHECK ($1.estimation >= 0)
);
--> statement-breakpoint
CREATE TABLE "parties" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "parties_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"slug" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "parties_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "estimations" ADD CONSTRAINT "estimations_party_id_parties_id_fk" FOREIGN KEY ("party_id") REFERENCES "public"."parties"("id") ON DELETE no action ON UPDATE no action;