import { randomBytes, createHash } from "crypto";

/**
 * 生成盐值
 * @returns 返回盐值
 */
export const getSalt = () => randomBytes(32).toString("hex");

/**
 * 将密码进行哈希编码
 * @param password 明文密码
 * @param salt 盐值
 * @returns 返回哈希编码后的密码
 */
export const hashPassword = (password: string, salt: string) =>
  createHash("sha512").update(password).update(salt).digest("hex");

/**
 * 比对明文密码和哈希密码是否匹配
 * @param password 明文密码
 * @param hashedPassword 哈希密码
 * @param salt 盐值
 * @returns 返回密码比对结果
 */
export const comparePassword = (
  password: string,
  hashedPassword: string,
  salt: string
) => hashedPassword === hashPassword(password, salt);
