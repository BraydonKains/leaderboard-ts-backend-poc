import { genSalt, hash, compare } from 'bcrypt';

export async function hashPassword(plaintextPassword: string): Promise<string> {
  const salt = await genSalt();
  return await hash(plaintextPassword, salt);
}

export async function comparePassword(
  plaintextPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return await compare(plaintextPassword, hashedPassword);
}
