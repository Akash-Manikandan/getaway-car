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
      fields: [userTousergroup.a],
      references: [user.id],
    }),
    usergroup: one(usergroup, {
      fields: [userTousergroup.b],
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
    fields: [roleTouser.a],
    references: [role.id],
  }),
  user: one(user, {
    fields: [roleTouser.b],
    references: [user.id],
  }),
}));

export const roleTousergroupRelations = relations(
  roleTousergroup,
  ({ one }) => ({
    role: one(role, {
      fields: [roleTousergroup.a],
      references: [role.id],
    }),
    usergroup: one(usergroup, {
      fields: [roleTousergroup.b],
      references: [usergroup.id],
    }),
  }),
);

export const permissionToroleRelations = relations(
  permissionTorole,
  ({ one }) => ({
    permission: one(permission, {
      fields: [permissionTorole.a],
      references: [permission.id],
    }),
    role: one(role, {
      fields: [permissionTorole.b],
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
    fields: [accountTouser.a],
    references: [account.id],
  }),
  user: one(user, {
    fields: [accountTouser.b],
    references: [user.id],
  }),
}));
