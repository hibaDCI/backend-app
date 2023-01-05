import bcrypt from "bcrypt";

export const hashedPasswordFun = async (text) => {
  const hashedPassword = await bcrypt.hash(text, 12);
  return hashedPassword;
};

export const comparePass = async (plainPass, databasePassword) => {
  const isMatch = await bcrypt.compare(plainPass, databasePassword);
  return isMatch;
};
