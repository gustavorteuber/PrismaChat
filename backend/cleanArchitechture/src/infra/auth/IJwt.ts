export interface IJwt {
    sign: (payload: any) => any;
    verify: (token: string) => any;
}