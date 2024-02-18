import { IWebServer } from "@module/server";
import express, { Application, Request, Response } from "express";

export class Express implements IWebServer {
  private app: Application;

  constructor() {
    this.app = express();
  }

  start = (port: number) => {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  };

  loadConfig = () => {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  };

  loadRoutes = () => {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, server is working");
    });
  };
}
