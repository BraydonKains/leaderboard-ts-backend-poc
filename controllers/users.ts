import express, { Request, Response, Router } from "express";

import { accessToken } from "../auth/jwt";
import { comparePassword, hashPassword } from "../auth/passwords";
import { User } from "../entities/User";

export function userRouter(): Router {
  const router: Router = express.Router();
  router.get("/", index);
  router.get("/:id", show);
  router.post("/register", register);
  router.post("/login", login);
  return router
}

async function index(_: Request, res: Response): Promise<void> {
    const users: User[] = await User.find();
    res.json({
        data: {
        users
        },
    });
}

async function show(req: Request, res: Response): Promise<void> {
    if (req.params.id) {
        const id: number = parseInt(req.params.id);
        const user: User | undefined = await User.findOne(id);
        res.json({
            data: {
                user
            },
        });
    }
}

type RegisterBody = {
    username: string,
    email: string,
    password: string,
    passwordConfirm: string,
};

async function register(req: Request, res: Response): Promise<void> {
    const body = req.body as RegisterBody;

    if (body.password != body.passwordConfirm) {
        // TODO what do we usually say here
        res.sendStatus(400);
        return;
    }

    const newUser = new User();
    newUser.userName = body.username;
    newUser.email = body.email;
    newUser.password = hashPassword(body.password);
    try {
        await newUser.save();
    } catch (err: unknown) {
        // FIXME idk what to do here yet
        res.sendStatus(409);
        return
    }

    res.json({
        data: {
            user: newUser
        },
    });
}

type LoginBody = {
    email: string,
    password: string,
};

async function login(req: Request, res: Response): Promise<void> {
    const body = req.body as LoginBody;

    const user = await User.findOne({
        email: body.email
    });
    if (!user) {
        res.sendStatus(401);
        return;
    }

    if (!comparePassword(body.password, user.password)) {
        res.sendStatus(401);
        return;
    }

    res.json({
        data: {
            token: accessToken(user.userName),
        },
    });
}