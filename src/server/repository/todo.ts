import { read } from "@db-crud-todo";

//Model/Schema
interface Todo {
    id: string;
    content: string;
    creationDate: Date;
    isDone: boolean;
}
interface TodoRepositoryGetParams {
    page?: number;
    limit?: number;
}
interface TodoRepositoryFetOutput {
    todos: Todo[];
    total: number;
    pages: number;
}

function get({ page, limit }: TodoRepositoryGetParams = {}) {
    const currentPage = page || 1;
    const currentLimit = limit || 2;
    const allTodos = read();

    const startIndex = (currentPage - 1) * currentLimit;
    const endIndex = currentPage * currentLimit;
    const paginatedTodos = allTodos.slice(startIndex, endIndex);
    const totalPages = Math.ceil(allTodos.length / currentLimit);
    return {
        total: allTodos.length,
        todos: paginatedTodos,
        pages: totalPages,
    };
}

export const todoRepository = { get };
