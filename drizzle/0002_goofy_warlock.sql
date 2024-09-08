ALTER TABLE "accounts" ADD COLUMN "api_key" varchar DEFAULT gen_random_uuid() NOT NULL;--> statement-breakpoint
ALTER TABLE "permissions" ADD COLUMN "extras" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "roles" ADD COLUMN "extras" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "services" ADD COLUMN "extras" jsonb DEFAULT '{}'::jsonb;--> statement-breakpoint
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_api_key_unique" UNIQUE("api_key");