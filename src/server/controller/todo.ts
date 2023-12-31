import { NextApiRequest, NextApiResponse } from "next";

import { todoRepository } from "@server/repository/todo";

function get(req: NextApiRequest, res: NextApiResponse) {
    const query = req.query;
    const page = Number(query.page);
    const limit = Number(query.limit);
    if (query.page && isNaN(page)) {
        res.status(400).json({
            error: { message: "Page must be a number" },
        });
    }
    if (query.limit && isNaN(limit)) {
        res.status(400).json({
            error: { message: "Limit must be a number" },
        });
    }
    const output = todoRepository.get({ page, limit });
    res.status(200).json({
        total: output.total,
        pages: output.pages,
        todos: output.todos,
    });
    return;
}
export const todoController = {
    get,
};
