import jwt from "jsonwebtoken";
const SECRET_KEY = "helloworld";

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log("Received token:", token);

    if (token && token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, SECRET_KEY);
      req.role = user.role;
      req.email = user.email;
      next();
    } else {
      return res.status(401).json({ message: "Unauthorized Access - Token Missing" });
    }
  } catch (err) {
    console.log("JWT Error:", err.message);
    return res.status(401).json({ message: "Unauthorized - Token Invalid" });
  }
};

export default auth;
