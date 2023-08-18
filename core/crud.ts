//const fs = require("fs"); - CommonJS
import fs from "fs"; //ES6
const DB_FILLE_PATH = "./core/db";

console.log("[ C R U D ]");
interface Todo {
  creationDate: string;
  content: string;
  isDone: boolean;
}
function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILLE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    // Fail Fast Validations
    return [];
  }
  return db;
}

function create(content: string) {
  const todo: Todo = {
    creationDate: new Date().toISOString(),
    content: content,
    isDone: false,
  };
  const todos: Array<Todo> = [...read(), todo];
  fs.writeFileSync(DB_FILLE_PATH, JSON.stringify({ todos }, null, 2));
  return content;
}

const clearDB = () => {
  fs.writeFileSync(DB_FILLE_PATH, "");
};
clearDB();
create("PRIMEIRA todo");
create("Segunda TODO.");
create("Terceira atividado.");
console.log(read());
