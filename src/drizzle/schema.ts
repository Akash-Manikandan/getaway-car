import {
  pgTable,
  uniqueIndex,
  text,
  boolean,
  timestamp,
  foreignKey,
  index,
  pgEnum,
  jsonb,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { createId } from '@paralleldrive/cuid2';
import { createUUID, UTC } from 'src/drizzle/utils';

export const permissionTypes = pgEnum('permission_types', [
  'CREATE',
  'READ',
  'EDIT',
  'LIST',
  'HARD_DELETE',
  'SOFT_DELETE',
]);

export const user = pgTable(
  'user',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    name: text('name').notNull(),
    description: text('description'),
    isActive: boolean('is_active').default(false).notNull(),
    email: text('email').notNull(),
    password: text('password').notNull(),
    isSuperUser: boolean('is_super_user').default(false).notNull(),
    lastLogin: timestamp('last_login', { precision: 3, mode: 'string' }),
    clientId: text('client_id').notNull().default(createUUID()).unique(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      precision: 3,
      mode: 'string',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    extras: jsonb('extras').default({}),
  },
  (table) => {
    return {
      clientIdKey: uniqueIndex('user_client_id_key').using(
        'btree',
        table.clientId.asc().nullsLast(),
      ),
      emailKey: uniqueIndex('user_email_key').using(
        'btree',
        table.email.asc().nullsLast(),
      ),
    };
  },
);

export const usergroup = pgTable('usergroup', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: text('name').notNull(),
  description: text('description'),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 3,
    mode: 'string',
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => UTC()),
  extras: jsonb('extras').default({}),
});

export const account = pgTable(
  'account',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    name: text('name').notNull(),
    description: text('description'),
    isActive: boolean('is_active').default(true).notNull(),
    apiKey: text('api_key').notNull().default(createUUID()).unique(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      precision: 3,
      mode: 'string',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    extras: jsonb('extras').default({}),
  },
  (table) => {
    return {
      apiKeyKey: uniqueIndex('account_api_key_key').using(
        'btree',
        table.apiKey.asc().nullsLast(),
      ),
      nameKey: uniqueIndex('account_name_key').using(
        'btree',
        table.name.asc().nullsLast(),
      ),
    };
  },
);

export const permission = pgTable('permission', {
  id: text('id')
    .$defaultFn(() => createId())
    .primaryKey()
    .notNull(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  type: permissionTypes('type').notNull(),
  createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp('updated_at', {
    precision: 3,
    mode: 'string',
  })
    .notNull()
    .defaultNow()
    .$onUpdate(() => UTC()),
  extras: jsonb('extras').default({}),
});

export const role = pgTable(
  'role',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    serviceId: text('service_id').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      precision: 3,
      mode: 'string',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    extras: jsonb('extras').default({}),
  },
  (table) => {
    return {
      roleServiceIdFkey: foreignKey({
        columns: [table.serviceId],
        foreignColumns: [service.id],
        name: 'role_service_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('restrict'),
    };
  },
);
export const service = pgTable(
  'service',
  {
    id: text('id')
      .$defaultFn(() => createId())
      .primaryKey()
      .notNull(),
    name: text('name').notNull(),
    description: text('description').notNull(),
    isActive: boolean('is_active').default(false).notNull(),
    accountId: text('account_id').notNull(),
    createdAt: timestamp('created_at', { precision: 3, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', {
      precision: 3,
      mode: 'string',
    })
      .notNull()
      .defaultNow()
      .$onUpdate(() => UTC()),
    extras: jsonb('extras').default({}),
  },
  (table) => {
    return {
      nameKey: uniqueIndex('service_name_key').using(
        'btree',
        table.name.asc().nullsLast(),
      ),
      serviceAccountIdFkey: foreignKey({
        columns: [table.accountId],
        foreignColumns: [account.id],
        name: 'service_account_id_fkey',
      })
        .onUpdate('cascade')
        .onDelete('restrict'),
    };
  },
);

export const userTousergroup = pgTable(
  '_userTousergroup',
  {
    userId: text('user_id').notNull(),
    usergroupId: text('usergroup_id').notNull(),
  },
  (table) => {
    return {
      abUnique: uniqueIndex('_userTousergroup_AB_unique').using(
        'btree',
        table.userId.asc().nullsLast(),
        table.usergroupId.asc().nullsLast(),
      ),
      bIdx: index().using('btree', table.usergroupId.asc().nullsLast()),
      userTousergroupAFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: '_userTousergroup_A_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
      userTousergroupBFkey: foreignKey({
        columns: [table.usergroupId],
        foreignColumns: [usergroup.id],
        name: '_userTousergroup_B_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  },
);

export const roleTouser = pgTable(
  '_roleTouser',
  {
    roleId: text('role_id').notNull(),
    userId: text('user_id').notNull(),
  },
  (table) => {
    return {
      abUnique: uniqueIndex('_roleTouser_AB_unique').using(
        'btree',
        table.roleId.asc().nullsLast(),
        table.userId.asc().nullsLast(),
      ),
      bIdx: index().using('btree', table.userId.asc().nullsLast()),
      roleTouserAFkey: foreignKey({
        columns: [table.roleId],
        foreignColumns: [role.id],
        name: '_roleTouser_A_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
      roleTouserBFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: '_roleTouser_B_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  },
);

export const roleTousergroup = pgTable(
  '_roleTousergroup',
  {
    roleId: text('role_id').notNull(),
    usergroupId: text('usergroup_id').notNull(),
  },
  (table) => {
    return {
      abUnique: uniqueIndex('_roleTousergroup_AB_unique').using(
        'btree',
        table.roleId.asc().nullsLast(),
        table.usergroupId.asc().nullsLast(),
      ),
      bIdx: index().using('btree', table.usergroupId.asc().nullsLast()),
      roleTousergroupAFkey: foreignKey({
        columns: [table.roleId],
        foreignColumns: [role.id],
        name: '_roleTousergroup_A_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
      roleTousergroupBFkey: foreignKey({
        columns: [table.usergroupId],
        foreignColumns: [usergroup.id],
        name: '_roleTousergroup_B_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  },
);

export const permissionTorole = pgTable(
  '_permissionTorole',
  {
    permissionId: text('permission_id').notNull(),
    roleId: text('role_id').notNull(),
  },
  (table) => {
    return {
      abUnique: uniqueIndex('_permissionTorole_AB_unique').using(
        'btree',
        table.permissionId.asc().nullsLast(),
        table.roleId.asc().nullsLast(),
      ),
      bIdx: index().using('btree', table.roleId.asc().nullsLast()),
      permissionToroleAFkey: foreignKey({
        columns: [table.permissionId],
        foreignColumns: [permission.id],
        name: '_permissionTorole_A_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
      permissionToroleBFkey: foreignKey({
        columns: [table.roleId],
        foreignColumns: [role.id],
        name: '_permissionTorole_B_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  },
);

export const accountTouser = pgTable(
  '_accountTouser',
  {
    accountId: text('account_id').notNull(),
    userId: text('user_id').notNull(),
  },
  (table) => {
    return {
      abUnique: uniqueIndex('_accountTouser_AB_unique').using(
        'btree',
        table.accountId.asc().nullsLast(),
        table.userId.asc().nullsLast(),
      ),
      bIdx: index().using('btree', table.userId.asc().nullsLast()),
      accountTouserAFkey: foreignKey({
        columns: [table.accountId],
        foreignColumns: [account.id],
        name: '_accountTouser_A_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
      accountTouserBFkey: foreignKey({
        columns: [table.userId],
        foreignColumns: [user.id],
        name: '_accountTouser_B_fkey',
      })
        .onUpdate('cascade')
        .onDelete('cascade'),
    };
  },
);
