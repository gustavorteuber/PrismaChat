export interface IHttpServer {
    listen: (port: number) => void;
    on: (method: string, url: string, callback: (...args: any) => any) => void
    close: () => void;
}