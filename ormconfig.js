module.exports = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: "5432",
  username: "",
  password: "",
  database: "webshop",
  entities: [__dirname + "/src/entity/*.ts"],
};
