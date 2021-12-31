import bcrypt from "bcrypt";

export function hashPassword(plaintextPassword: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(plaintextPassword, salt);
}

export function comparePassword(plaintextPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plaintextPassword, hashedPassword);
}