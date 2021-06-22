import express from "express";
const app = express();

app.get("/test", (request, response) => {
  response.send("Hello");
});

app.post("/test-post", (request, response) => {
  response.send("Hello from post");
});

app.listen(3000, () => {
  console.log("Server up and running on port 5000");
});
