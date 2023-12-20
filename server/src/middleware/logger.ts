import { NextFunction, Request, Response } from "express";

const logger = (req: Request, res: Response, next: NextFunction) => {
  const { rawHeaders, method, url } = req;
  console.log({ rawHeaders, method, url });
  next();
};

export default logger;
