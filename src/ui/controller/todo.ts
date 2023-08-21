import { todoRepository } from "@ui/repository/todo";

interface TodoUiControllerGetParams {
    page?: number;
}

async function get({ page }: TodoUiControllerGetParams = {}) {
    return todoRepository.get({ page: page || 1, limit: 1 });
}
export const todoUIController = {
    get,
};
