module.exports = app => {
  app.use("/api", require("./auth.routes"));
  app.use("/api/users", require("./user.routes"));
  app.use("/api/homes", require("./home.routes"));
  app.use("/api/tasks", require("./task.routes"));
  app.use("/api/rewards", require("./reward.routes"));
  app.use("/api/points", require("./points.routes"));
  app.use("/api/tokens", require("./token.routes"));
}