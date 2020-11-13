const express = require("express");

const app = express();

app.get("/comments", (req, res) => {
  // jsonp cors
  res.set('Access-Control-Allow-Origin', '*');

  setTimeout(() => {
    res.json({
      code: 10000,
      data: [
        {
          id: 1,
          title: "hello",
        },
      ],
    });
  }, 3000);
});

app.listen(3000, "localhost", (err) => {
  if (err) {
    console.log("err", err);
    return;
  }
  console.log("服务器启动成功");
});
