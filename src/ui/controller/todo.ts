import { todoRepository } from "@ui/repository/todo";

interface TodoUiControllerGetParams {
    page: number;
}

async function get(params: TodoUiControllerGetParams) {
    return todoRepository.get({ page: params.page, limit: 5 });
}
export const todoUIController = {
    get,
};
