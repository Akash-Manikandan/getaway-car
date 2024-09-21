import { relations } from 'drizzle-orm/relations';
import {
  roles,
  rolePermissions,
  permissions,
  users,
  userRoles,
  accounts,
} from './schema';

export const rolePermissionsRelations = relations(
  rolePermissions,
  ({ one }) => ({
    role: one(roles, {
      fields: [rolePermissions.roleId],
      references: [roles.id],
    }),
    permission: one(permissions, {
      fields: [rolePermissions.permissionId],
      references: [permissions.id],
    }),
  }),
);

export const rolesRelations = relations(roles, ({ many }) => ({
  rolePermissions: many(rolePermissions),
  userRoles: many(userRoles),
}));

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));

export const usersRelations = relations(users, ({ one, many }) => ({
  userRoles: many(userRoles),
  account: one(accounts, {
    fields: [users.accountId],
    references: [accounts.id],
  }),
}));

export const accountsRelations = relations(accounts, ({ many }) => ({
  users: many(users),
}));
