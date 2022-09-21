import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import dotenv from "dotenv";

dotenv.config();

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || "",
};

const cookieExtractor = (req) => {
  var token = null;
  if (req && req.cookies) {
    token = req.cookies["jwt"];
  }
  return token;
};

passport.use(
  new Strategy(options, async (payload, done) => {
    const { type, username } = payload;
    if (!type || type !== "session") {
      return done(null, null);
    }
    if (username !== process.env.CORRECT_USERNAME) return done(null, null);
    return done(null, { username });
  })
);

export default passport.authenticate("jwt", { session: false });
