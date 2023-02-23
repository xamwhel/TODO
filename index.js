//models
const TodoTask = require("./models/TodoTask");
const express = require("express");
const app = express();
app.listen(3000, () => console.log("Server Up and running"));
app.get('/',(req, res) => {
res.send('Hello World!');
});
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.post('/',(req, res) => {
console.log(req.body);
});
const dotenv = require(“dotenv”);
dotenv.config();
//UPDATE
app
.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
TodoTask.find({}, (err, tasks) => {
res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});
//DELETE
app.route("/remove/:id").get((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndRemove(id, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});



