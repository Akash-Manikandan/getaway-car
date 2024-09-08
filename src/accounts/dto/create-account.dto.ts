export class CreateAccountDto {
    name: string;
    region: string;
    isActive: boolean('is_active').notNull().default(true),
    extras: jsonb('extras').default({}),
}
