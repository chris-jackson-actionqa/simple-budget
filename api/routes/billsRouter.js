const express = require("express");
const billsRouter = express.Router();

billsRouter
  .route("/")
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
  })
  .get((req, res) => {
    res.end("Will send all the bills to you");
  })
  .post((req, res) => {
    res.end(`Will add the bill: ${req.body.name}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on /bills");
  })
  .delete((req, res) => {
    res.end("Deleting all bills");
  });

module.exports = billsRouter;
