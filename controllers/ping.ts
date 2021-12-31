import express, { Request, Response, Router } from "express";

import { authenticateTokenMiddleware } from "../auth/jwt";

export function pingRouter(): Router {
    const router = express.Router();
    router.get("/", ping);
    router.get("/auth", authenticateTokenMiddleware, authPing);
    return router;
}

async function ping(_: Request, res: Response): Promise<void> {
    res.json({
        "ping": "indeed",
    });
}

async function authPing(req: Request, res: Response): Promise<void> {
    res.json({
        "ping": `hello ${req.params["username"]}`,
    });
}