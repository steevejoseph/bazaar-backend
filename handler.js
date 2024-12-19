const serverless = require("serverless-http");
const app = require("./app");

// Create handler for AWS Lambda
module.exports.handler = serverless(app);
