import jwtmod from "jsonwebtoken";

export default async (req, res, next) => {
  try {
    // console.log(process.env.PUBLICKEY);
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) {
      return res.sendStatus(401);
    }

    const token = bearerHeader.split(" ")[1];
    if (!token) {
      return res.sendStatus(401);
    }

    // console.log(token);

    const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;

    const decodedToken = jwtmod.verify(token, public_key, {
      algorithms: ["RS256"],
    });

    // console.log(decodedToken);

    const { email } = decodedToken;
    req.user = email;
    next();
  } catch (err) {
    console.error(`Authentication error: ${err.message}`);
    return res.sendStatus(401);
  }
};
