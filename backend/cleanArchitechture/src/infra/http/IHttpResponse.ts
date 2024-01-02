export interface IExpressResponseAdapter {
    json: (data: any) => void
    send: (data: any) => void;
    status: (code: number) => void;
}