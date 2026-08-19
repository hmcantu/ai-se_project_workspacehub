import type { Response } from "express";

export const sendSuccess = <T>(res: Response, data: T, statusCode = 200) => {
  return res.status(statusCode).json({
    success: true,
    data,
    error: null,
  });
};

export const sendError = (res: Response, message: string, statusCode = 400) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error: {
      message,
    },
  });
};
