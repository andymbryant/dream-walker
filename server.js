const express = require("express");
const port = process.env.PORT || 8080;
const app = express();

app.get('/', (req, res) => {
  res.send('herro world');
})

app.listen(port, () => {
  console.log(`The magic happens on port ${port}`);
});
