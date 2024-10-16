import bcryptjs from "bcryptjs";

const saltRound = 5;

export const hashPassword = (password) => {
  return bcryptjs.hashSync(password, saltRound);
};

export const comparePassword = (password, hashPassword) => {
  return bcryptjs.compareSync(password, hashPassword);
};
