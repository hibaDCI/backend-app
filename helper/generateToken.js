import jwt from "jsonwebtoken";
import {promisify} from "util";
/**
 * this funtion is a promise we need to use await when call it
 * @param {*} user
 * @returns
 */

const generateToken = (user) => {
  const payload = {id: user._id};

  return new Promise((resolve, reject) => {
    jwt.sign(payload, process.env.SECRET, {expiresIn: "1h"}, (err, token) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(token);
    });
  });
};
/**
 * this middleware is used to verfiy the token and check if the user is authenticated
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const isAuthorized = async (req, res, next) => {
  const token = req.cookies.access_token;
  console.log(token);

  if (!token) {
    return res
      .status(403)
      .json({msg: "you're not authorized , you should signup"});
  }

  // const decoded=jwt.verify(token ,process.env.SECRET)
  const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
  console.log(decoded);

  // return with req the id of the user(payload after decoded)
  req.user = decoded.id;
  next();
};

export default {generateToken, isAuthorized};
