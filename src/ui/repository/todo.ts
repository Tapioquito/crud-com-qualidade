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

function parseTodoFromServer(responseBody: unknown): {
    total: number;
    pages: number;
    todos: Array<Todo>;
} {
    if (
        responseBody !== null &&
        typeof responseBody === "object" &&
        "todos" in responseBody &&
        "total" in responseBody &&
        "pages" in responseBody &&
        Array.isArray(responseBody.todos)
    ) {
        return {
            total: Number(responseBody.total),
            pages: Number(responseBody.pages),
            todos: responseBody.todos.map((todo: unknown) => {
                if (todo === null && typeof todo !== "object") {
                    throw new Error("Invalid todo from API");
                }
                const { id, content, isDone, creationDate } = todo as {
                    id: string;
                    content: string;
                    creationDate: string;
                    isDone: string;
                };
                return {
                    id,
                    content,
                    creationDate: new Date(creationDate),
                    isDone: String(isDone).toLowerCase() === "true",
                };
            }),
        };
    }
    return { pages: 1, total: 0, todos: [] };
}

function get({
    page,
    limit,
}: TodoRepositoryGetParams): Promise<TodoRepositoryGetOutput> {
    return fetch(
        `http://localhost:3000/api/todos?page=${page}&limit=${limit}`
    ).then(async (todosDoServidor) => {
        const todosString = await todosDoServidor.text();
        const responseParsed = parseTodoFromServer(JSON.parse(todosString));

        return {
            total: responseParsed.total,
            todos: responseParsed.todos,
            pages: responseParsed.pages,
        };
    });
}

export const todoRepository = {
    get,
};
