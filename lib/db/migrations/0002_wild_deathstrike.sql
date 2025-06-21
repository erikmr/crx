ALTER TABLE "tickets" ADD COLUMN "id_usuario_responsable" uuid;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_id_usuario_responsable_User_id_fk" FOREIGN KEY ("id_usuario_responsable") REFERENCES "public"."User"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
