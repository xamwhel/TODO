const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
content: {
type: String,
required: true
},
date: {
type: Date,
default: Date.now
}
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);
/POST METHOD
app.post('/',async (req, res) => {
const todoTask = new TodoTask({
content: req.body.content
});
try {
await todoTask.save();
res.redirect("/");
} catch (err) {
res.redirect("/");
}
});
// GET METHOD
app.get("/", (req, res) => {
TodoTask.find({}, (err, tasks) => {
res.render("todo.ejs", { todoTasks: tasks });
});
});