import jwt from "jsonwebtoken";
export function signToken(obj) {
  const token = jwt.sign(
    {
      data: {
        ...obj,
        password: null,
      },
    },
    process.env.SECRET,
    { expiresIn: "10h" }
  );

  return token;
}
