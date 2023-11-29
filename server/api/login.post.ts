export default defineEventHandler(async (event) => {
  const { username, password } = await readBody(event);

  // 验证用户名和密码是否为空
  verify(username, password);

  // 根据用户名从数据库中查询用户信息，获取到哈希密码和盐值
  const { password: hashPassword, salt } = getUserFromDB(username);

  // 密码错误
  if (!comparePassword(password, hashPassword, salt)) {
    throw createError({
      statusCode: 401,
      message: "用户名或密码错误",
    });
  }

  // 密码正确，登录成功
  return {
    userId: 1,
    username,
  };
});

const verify = (username: string, password: string) => {
  // 验证用户名和密码是否为空
  if (!(username && password)) {
    throw createError({
      statusCode: 400,
      message: "用户名或密码不能为空",
    });
  }
};

const getUserFromDB = (username: string) => {
  // 省略查询数据库的逻辑
  return {
    userId: 1,
    username,
    password:
      "5b5732738ea3c91afac0a7434e04e92ed69fc657562fc8e9dd0e730a1149d1fa539b979399c3e05431a9d84b661807b4792d98d09ee44bceaa072853378522bf",
    salt: "3f3e0239e402b582af64055c17884195",
  };
};
