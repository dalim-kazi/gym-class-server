import { IPagination } from "@/types/response";

export const getPagination = (
    totalItems: number,
    currentPage: number,
    pageSize: number
  ): IPagination => {
    const totalPages = Math.ceil(totalItems / pageSize);
  
    return {
      currentPage,
      totalPages,
      pageSize,
      nextPage: currentPage < totalPages ? currentPage + 1 : null,
      itemCount: Math.min(pageSize, totalItems - (currentPage - 1) * pageSize),
      totalItemCount: totalItems,
    };
  };
  