export interface IWebServer {
  start: (port: number) => void;
  loadConfig: () => void;
  loadRoutes: () => void;
}
