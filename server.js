// import app from backend/app
const app = require("./backend/app");
// Server is listening on PORT 3000
// http://localhost:3000
app.listen(3000, () => {
  console.log("Express Server is Listening on PORT 3000 ...");
});
