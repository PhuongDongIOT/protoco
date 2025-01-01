export class ReponseResult {
    protected data: unknown;
    protected statusCode: number;
    constructor(data: unknown, statusCode: number) {
        this.data = data;
        this.statusCode = statusCode;
    } 
}
