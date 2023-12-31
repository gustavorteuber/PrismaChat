export interface IHttpServer {
    listen: (port: number) => void;
    on: (method: string, url: string, callback: (req: any, res: any, next: any) => void) => void ;
    close: () => void;
}