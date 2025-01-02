interface IBaseCRUDEvent {
    get?: string;
    created: string;
    updated?: string;
    deleted?: string;
}

export interface IBaseEvent {
    name: string;
    event: IBaseCRUDEvent
}
