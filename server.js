const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const userRoutes = require("./routes/UserRoutes");
const path = require('path')
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

//static file
//  app.use(express.static(path.join(__dirname, './netflix-ui/build')))

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname,  './client/build/index.html'))
// })
if (process.env.NODE_ENV) {
  //static folder add
app.use(express.static('app/netflix-ui/build'));
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname , "app/netflix-ui/build", "index.html"));
});
}

app.use("/api/user", userRoutes);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
