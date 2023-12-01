export interface PaginationResponse<T>{
    count: number;
    rows: T[]
}