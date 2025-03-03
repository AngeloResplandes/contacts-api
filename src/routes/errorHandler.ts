import { ErrorRequestHandler, RequestHandler } from "express";

export const NotFoundRequest: RequestHandler = (req, res) => {
    res.status(404).json({ error: "not found router" })
}

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    res.status(500).json({ error: "an unexpected error occurred" })
}