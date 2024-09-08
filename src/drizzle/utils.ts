import { sql, SQL } from 'drizzle-orm';
import { AnyPgColumn } from 'drizzle-orm/pg-core';

export function lower(email: AnyPgColumn): SQL {
  return sql`lower(${email})`;
}

export function UTC(): SQL {
  return sql`CURRENT_TIMESTAMP AT TIME ZONE 'UTC'`;
}

export function createUUID(): SQL {
  return sql`gen_random_uuid()`;
}
