import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import handlebars from 'express-handlebars';

import { environment } from "./env.js";

import { __dirname } from "./path.js";

const { secret } = environment.cookie;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(secret));

app.use(express.static(path.join(__dirname, "../public")));

app.engine("handlebars", handlebars.engine());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("welcome");
});

app.use((req, res, next) => {
  
});

export default app;
