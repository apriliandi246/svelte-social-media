import sirv from "sirv";
import polka from "polka";
import compression from "compression";
import cookieParser from "cookie-parser";
import * as sapper from "@sapper/server";

const { PORT, NODE_ENV } = process.env;
const dev = NODE_ENV === "development";

export default polka()
  .use(
    compression({ threshold: 0 }),
    sirv("static", { dev }),
    cookieParser(),
    async (req, res, next) => {
      const { userId, username } = {
        userId: req.cookies["_userId"],
        username: req.cookies["_username"],
      };

      return sapper.middleware({
        session: () => ({
          _userId: userId ? userId : "",
          _username: username ? username : "",
        }),
      })(req, res, next);
    }
  )
  .listen(PORT, (err) => {
    if (err) console.log("error", err);
  });
