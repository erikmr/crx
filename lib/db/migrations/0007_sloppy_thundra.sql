CREATE TABLE IF NOT EXISTS "Persona" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"nombreRazonSocial" varchar(200)
);
