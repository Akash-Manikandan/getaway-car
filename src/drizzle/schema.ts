import { bigserial, pgTable } from "drizzle-orm/pg-core";

export const users = pgTable('users',{
    id: bigserial('id',{ mode: 'number' }).primaryKey()
})