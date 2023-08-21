//Model/Schema
interface Todo {
    id: string;
    content: string;
    creationDate: Date;
    isDone: boolean;
}
interface TodoRepositoryGetParams {
    page: number;
    limit: number;
}
interface TodoRepositoryGetOutput {
    todos: Todo[];
    total: number;
    pages: number;
}
function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    return fetch("http://localhost:3000/api/todos").then(
        async (todosDoServidor) => {
            const todosString = await todosDoServidor.text();
            const todosFromServer = JSON.parse(todosString).todos;
            const allTodos = todosFromServer;
            const startIndex = (page - 1) * limit;
            const endIndex = page * limit;
            const paginatedTodos = allTodos.slice(startIndex, endIndex);
            const totalPages = Math.ceil(allTodos.length / limit);

            return {
                todos: paginatedTodos,
                total: allTodos.length,
                pages: totalPages,
            };
        }
    );
}

export const todoRepository = {
    get,
};
