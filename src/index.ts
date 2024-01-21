import express, { Application, Request, Response } from "express";

class ExpressApp {
  private app: Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this.app.get("/", (req: Request, res: Response) => {
      res.send("Hello, Express with TypeScript!");
    });
  }

  public start(port: number): void {
    this.app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  }
}

const port = 3000;
const expressApp = new ExpressApp();
expressApp.start(port);
