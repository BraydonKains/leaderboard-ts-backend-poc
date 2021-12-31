import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

export function accessToken(username: string): string {
    console.log(process.env.TOKEN_SECRET);
    return jwt.sign({ username }, process.env.TOKEN_SECRET, { expiresIn: "1h", algorithm: "HS256" })
}

export function authenticateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
        return res.sendStatus(401);
    }

    const token: string = req.headers.authorization.split(" ")[1];

    let decodedPayload: jwt.JwtPayload;
    try {
        decodedPayload = jwt.verify(token, process.env.TOKEN_SECRET) as jwt.JwtPayload;
    } catch(err: unknown) {
        return res.sendStatus(403);
    }

    if (decodedPayload.exp > Date.now()) {
        // TODO remove the cookie or some shit
        return res.sendStatus(403);
    }

    if (!decodedPayload["username"]) {
        return res.sendStatus(500);
    }

    req.params["username"] = decodedPayload["username"];

    next();
}