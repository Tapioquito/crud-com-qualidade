import { NextApiRequest, NextApiResponse } from "next";
import { read } from "@db-crud-todo";

function get(req: NextApiRequest, res: NextApiResponse) {
    const allTodos = read();
    res.status(200).json({ todos: allTodos });
    return;
}
export const todoController = {
    get,
};
