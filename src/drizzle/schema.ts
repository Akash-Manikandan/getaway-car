import {
  boolean,
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from 'drizzle-orm/pg-core';
import { createUUID, lower, UTC } from './utils';
import { createId } from '@paralleldrive/cuid2';

export const accounts = pgTable(
  'accounts',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    apiKey: varchar('api_key').default(createUUID()).unique().notNull(),
    region: varchar('region', { length: 256 }).notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    isActive: boolean('is_active').notNull().default(true),
    extras: jsonb('extras').default({}),
  },
  (table) => ({
    nameIndex: index('account_name_index').on(table.name),
  }),
);

export const users = pgTable(
  'users',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name', { length: 256 }),
    email: varchar('email', { length: 256 }).unique().notNull(),
    password: text('password').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    isSuperuser: boolean('is_superuser').notNull().default(false),
    isActive: boolean('is_active').notNull().default(true),
    last_login: timestamp('last_login'),
    extras: jsonb('extras').default({}),
    clientApiKey: varchar('client_api_key')
      .default(createUUID())
      .unique()
      .notNull(),
    accountId: varchar('account_id', { length: 128 }).references(
      () => accounts.id,
    ),
  },
  (table) => ({
    emailUniqueIndex: uniqueIndex('email_unique_index').on(lower(table.email)),
    nameIndex: index('user_name_index').on(table.name),
  }),
);

export const roles = pgTable(
  'roles',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    extras: jsonb('extras').default({}),
  },
  (table) => ({
    nameIndex: uniqueIndex('roles_name_index').on(table.name),
  }),
);

export const permissions = pgTable(
  'permissions',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name', { length: 256 }).notNull().unique(),
    description: text('description'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    extras: jsonb('extras').default({}),
  },
  (table) => ({
    nameIndex: uniqueIndex('permissions_name_index').on(table.name),
  }),
);

export const services = pgTable(
  'services',
  {
    id: varchar('id', { length: 128 })
      .$defaultFn(() => createId())
      .primaryKey(),
    name: varchar('name', { length: 256 }).notNull(),
    description: text('description'),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at')
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    extras: jsonb('extras').default({}),
  },
  (table) => ({
    nameIndex: uniqueIndex('services_name_index').on(table.name),
  }),
);

export const userRoles = pgTable(
  'user_roles',
  {
    userId: varchar('user_id', { length: 128 }).references(() => users.id),
    roleId: varchar('role_id', { length: 128 }).references(() => roles.id),
  },
  (table) => ({
    userRoleIndex: uniqueIndex('user_roles_index').on(
      table.userId,
      table.roleId,
    ),
  }),
);

export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: varchar('role_id', { length: 128 }).references(() => roles.id),
    permissionId: varchar('permission_id', { length: 128 }).references(
      () => permissions.id,
    ),
  },
  (table) => ({
    rolePermissionIndex: uniqueIndex('role_permissions_index').on(
      table.roleId,
      table.permissionId,
    ),
  }),
);
