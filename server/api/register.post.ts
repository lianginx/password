export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  // 验证用户名和密码是否合法
  verify(username, password);

  // 将密码进行哈希编码
  const salt = getSalt();
  const nextPassword = hashPassword(password, salt);

  // 将用户名、哈希密码和盐值一起保存到数据库中
  const user = saveToDB(username, nextPassword, salt);

  // 返回注册结果
  return user;
});

const verify = (username: string, password: string) => {
  // 验证用户名和密码是否为空
  if (!(username && password)) {
    throw createError({
      statusCode: 400,
      message: "用户名或密码不能为空",
    });
  }

  // 省略验证用户名、密码是否符合要求的逻辑
  // 省略验证用户名是否存在的逻辑
  // ……
};

const saveToDB = (username: string, password: string, salt: string) => {
  // 省略数据库操作过程
  // 记住：只返回可以公开的用于确认用户身份的信息，千万不要将密码和盐值暴露出去
  return {
    userId: 1,
    username,
  };
};
