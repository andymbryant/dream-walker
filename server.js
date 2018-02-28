const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

console.log('herro')

app.listen(port, () => {
  console.log(`The magic happens on port ${port}`);
});
