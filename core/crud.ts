import fs from "fs"; //ES6
import { v4 } from "uuid";

const DB_FILLE_PATH = "./core/db";

console.log("[ C R U D ]");

type UUID = string;
interface Todo {
  id: UUID;
  creationDate: string;
  content: string;
  isDone: boolean;
}

function create(content: string): Todo {
  const todo: Todo = {
    id: uuid(),
    creationDate: new Date().toISOString(),
    content: content,
    isDone: false,
  };
  const todos: Array<Todo> = [...read(), todo];
  fs.writeFileSync(DB_FILLE_PATH, JSON.stringify({ todos }, null, 2));
  return todo;
}
function read(): Array<Todo> {
  const dbString = fs.readFileSync(DB_FILLE_PATH, "utf-8");
  const db = JSON.parse(dbString || "{}");
  if (!db.todos) {
    // Fail Fast Validations
    return [];
  }
  return db.todos;
}

function updateById(id: UUID, partialTodo: Partial<Todo>) {
  let updatedTodo;
  const todos = read();
  todos.forEach((currentTodo) => {
    const isToUpdate = currentTodo.id === id;
    if (isToUpdate) {
      updatedTodo = Object.assign(currentTodo, partialTodo);
    }
    fs.writeFileSync(DB_FILLE_PATH, JSON.stringify({ todos }, null, 2));
  });
  if (!updatedTodo) {
    throw new Error("Please provide another id");
  }
  return updatedTodo;
}
function deleteById(id: UUID): void {
  const todos = read();
  const todosWithoutOne = todos.filter((todo) => {
    if (id === todo.id) {
      return false;
    }
    return true;
  });

  fs.writeFileSync(DB_FILLE_PATH, JSON.stringify({ todosWithoutOne }, null, 2));
}

const clearDB = () => {
  fs.writeFileSync(DB_FILLE_PATH, "");
};
clearDB();
create("PRIMEIRA todo");
create("Segunda TODO.");
create("Terceira atividado.");
console.log(read());
function uuid(): string {
  throw new Error("Function not implemented.");
}
