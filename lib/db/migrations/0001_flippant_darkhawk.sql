CREATE TABLE IF NOT EXISTS "tickets" (
	"id_ticket" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"asunto" varchar(200) NOT NULL,
	"descripcion" varchar(400) NOT NULL
);
