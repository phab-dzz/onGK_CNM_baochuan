const express = require('express');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT;
// const subjectRoute = require("./routes/index");



app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./views"));
app.set('view engine', 'ejs');
app.set('views', './views');

// app.get("/", (req, res) => {
//     res.send("Hello, world!"); // Định nghĩa route để tránh lỗi
// });

// app.listen(3000, () => {
//     console.log("Server is running on port 3000");
// });
// app.use("/subjects", subjectRoute);
app.use("/", require("./routes/index"));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});