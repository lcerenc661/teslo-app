import { TbCurrencyReal } from "react-icons/tb";


export const generatePagination = ( currentPage: number, totalPages: number) =>{

    // If total pages is less or equal to 7 => display all pages without dots
    if ( totalPages <= 7)  return  Array.from({ length: totalPages}, (_, i) => i +1);

    // actual page within first 3 pages, and last 2 pages
    if ( currentPage <= 3){
        return [1,2,3, '...', totalPages-1, totalPages];
    }

    // actual page within the last 3 pages
    if ( currentPage >= totalPages - 2){
        return [1,2, '...', totalPages - 2, totalPages -1, totalPages];
    }

    // If actual page is on the middle
        return [
            1, 
            '...',
            currentPage - 1, 
            currentPage,
            currentPage + 1,
            '...',
            totalPages 
        ]

    



}