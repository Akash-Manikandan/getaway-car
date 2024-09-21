import { relations } from 'drizzle-orm/relations';
import {
  service,
  role,
  user,
  userTousergroup,
  usergroup,
  roleTouser,
  roleTousergroup,
  permission,
  permissionTorole,
  account,
  accountTouser,
} from './schema';

export const roleRelations = relations(role, ({ one, many }) => ({
  service: one(service, {
    fields: [role.serviceId],
    references: [service.id],
  }),
  roleTousers: many(roleTouser),
  roleTousergroups: many(roleTousergroup),
  permissionToroles: many(permissionTorole),
}));

export const serviceRelations = relations(service, ({ one, many }) => ({
  roles: many(role),
  account: one(account, {
    fields: [service.accountId],
    references: [account.id],
  }),
}));

export const userTousergroupRelations = relations(
  userTousergroup,
  ({ one }) => ({
    user: one(user, {
      fields: [userTousergroup.userId],
      references: [user.id],
    }),
    usergroup: one(usergroup, {
      fields: [userTousergroup.usergroupId],
      references: [usergroup.id],
    }),
  }),
);

export const userRelations = relations(user, ({ many }) => ({
  userTousergroups: many(userTousergroup),
  roleTousers: many(roleTouser),
  accountTousers: many(accountTouser),
}));

export const usergroupRelations = relations(usergroup, ({ many }) => ({
  userTousergroups: many(userTousergroup),
  roleTousergroups: many(roleTousergroup),
}));

export const roleTouserRelations = relations(roleTouser, ({ one }) => ({
  role: one(role, {
    fields: [roleTouser.roleId],
    references: [role.id],
  }),
  user: one(user, {
    fields: [roleTouser.userId],
    references: [user.id],
  }),
}));

export const roleTousergroupRelations = relations(
  roleTousergroup,
  ({ one }) => ({
    role: one(role, {
      fields: [roleTousergroup.roleId],
      references: [role.id],
    }),
    usergroup: one(usergroup, {
      fields: [roleTousergroup.usergroupId],
      references: [usergroup.id],
    }),
  }),
);

export const permissionToroleRelations = relations(
  permissionTorole,
  ({ one }) => ({
    permission: one(permission, {
      fields: [permissionTorole.permissionId],
      references: [permission.id],
    }),
    role: one(role, {
      fields: [permissionTorole.roleId],
      references: [role.id],
    }),
  }),
);

export const permissionRelations = relations(permission, ({ many }) => ({
  permissionToroles: many(permissionTorole),
}));

export const accountRelations = relations(account, ({ many }) => ({
  services: many(service),
  accountTousers: many(accountTouser),
}));

export const accountTouserRelations = relations(accountTouser, ({ one }) => ({
  account: one(account, {
    fields: [accountTouser.accountId],
    references: [account.id],
  }),
  user: one(user, {
    fields: [accountTouser.userId],
    references: [user.id],
  }),
}));
