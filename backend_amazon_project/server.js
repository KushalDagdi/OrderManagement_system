const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());


const CLIENT_ID = "Ov23liXdHdMlCjWQ59S5";
const CLIENT_SECRET = "";
const REDIRECT_URI = "";


app.get("/", (req, res) => {
  res.send("Server running");
});

app.get("/auth/github", (req, res) => {
  const url =
    `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}` +
    `&redirect_uri=${REDIRECT_URI}` +
    `&scope=read:user`;

  res.redirect(url);
});


app.get("/auth/github/callback", async (req, res) => {
  const code = req.query.code;

  try {
    // get access token
    const tokenRes = await axios.post(
      "https://github.com/login/oauth/access_token",
      {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code,
      },
      {
        headers: { Accept: "application/json" },
      }
    );

    const access_token = tokenRes.data.access_token;

    // get user
    const userRes = await axios.get("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const user = userRes.data;

    // redirect to frontend
    res.redirect(
      `http://localhost:5173/?user=${encodeURIComponent(
        JSON.stringify(user)
      )}`
    );

  } catch (err) {
    console.error(err);
    res.send("OAuth Failed");
  }
});


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});