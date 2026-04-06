const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

// form page
app.get("/", (req, res) => {
  res.send(`
    <h2>User Form</h2>
    <form method="POST" action="/submit">
      Name: <input type="text" name="name"><br><br>
      Email: <input type="email" name="email"><br><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

// form submit
app.post("/submit", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;

  res.send("Name: " + name + "<br>Email: " + email);
});

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});