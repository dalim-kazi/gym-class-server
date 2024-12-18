import { boolean } from 'zod';

export interface IResponse<T> {
    isSuccess: boolean;
    statusCode:number;
    message: string;
    data: T;
}

export type IPagination = {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    nextPage: number | null;
    itemCount: number;
    totalItemCount: number;
};

export interface IPaginatedResponse<T> {
    isSuccess: boolean;
    message: string;
    statusCode:number;
    pagination?: IPagination;
    data: T;
}

export interface IErrorResponse {
    isSuccess: false;
    message: string | string[];
    statusCode?: number;
}
