import { IPagination } from '@/types/response';

export const calculatePagination = (
    totalItemCount: number,
    itemCount: number,
    skip: number,
    limit: number
): IPagination => {
    const currentPage = Math.floor(skip / limit) + 1;
    const totalPages = Math.ceil(totalItemCount / limit);
    const pageSize = limit;
    const nextPage = currentPage < totalPages ? currentPage + 1 : null;

    return {
        currentPage,
        nextPage,
        totalPages,
        pageSize,
        itemCount,
        totalItemCount
    };
};
