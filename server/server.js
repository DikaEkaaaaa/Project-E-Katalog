import express from "express";
const app = express();
import bodyParser from "body-parser";
import mongoose from "mongoose";
import SiswaManager from "./Database/Models/Siswa.js";
import connectLivereload from "connect-livereload";
import livereload from "livereload";

// cookie
import cookieParser from "cookie-parser";
import csurf from "csurf";
const csrfProtection = csurf({ cookie: true });

mongoose.connect(
  "mongodb+srv://root:katalog123@cluster0.x4cq9fu.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
let url = bodyParser.urlencoded({
  extended: false,
  limit: "10mb",
});

/**
 * ! deprecated - will be removed in the future
 * @description - Live reload
 */
// const liveReloadServer = livereload.createServer();
// liveReloadServer.server.once("connection", () => {
//   setTimeout(() => {
//     liveReloadServer.refresh("/admin/upload-data");
//   }, 100);
// });
// app.use(connectLivereload());

app.set("views", "./views");
app.use(express.static("public"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.use(
  express.urlencoded({
    limit: "10mb",
    extended: false,
  })
);
app.use(
  bodyParser.urlencoded({
    extended: true,
    limit: "10mb",
  })
);
app.use(express.json({ limit: "10mb" }));

/**
 * @description - Import router for middleware
 */
import adminRouter from "./routes/admin.js";

/**
 * @param {object} csrfProtection - CSRF Protection
 * @param {object} url - Body Parser
 * @returns {object} - Router
 */
app.use("/admin", adminRouter(csrfProtection, url));

app.get("/", async (req, res) => {
  res.render("index");
});

/**
 * @method GET
 * @route /list
 * @description - Menampilkan daftar seluruh siswa yang terdaftar
 * @returns {object} - Rendered view
 */
app.get("/list", async (req, res) => {
  // ! will use API soon
  let data = await SiswaManager.find({});

  res.render("list", {
    data
  });
});

/**
 * @description - listen to port 3000
 * @example - http://localhost:3000
 * @returns {object} - Server
 */
app.listen(3000, function () {
  console.log("Server Active");
});
