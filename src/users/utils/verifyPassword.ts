import * as argon2 from 'argon2';

export const verifyPassword = async (
  password: string,
  hash: string,
): Promise<boolean> => await argon2.verify(hash, password);
