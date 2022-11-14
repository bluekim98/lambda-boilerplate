import deepcopy from 'deepcopy';

export interface PagenationEdge {
    totalCount: number;
    totalPage: number;
    currentPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export class PagenationDto<T = any> {
    list: T[];
    page: number;
    count: number;
}

export const getPagination = <T>({ list, page, count }: PagenationDto<T>) => {
    const first = page * count - count;
    const last = first + count;
    const data = deepcopy(list).slice(first, last);
    return { data, edge: getEdge({ list, page, count }) };
};

export const getEdge = <T>({ list, page, count }: PagenationDto<T>) => {
    const totalCount = list.length;
    const totalPage = Math.ceil(totalCount / count);
    const edge: PagenationEdge = {
        totalCount: list.length,
        totalPage: Math.ceil(totalCount / count),
        hasNextPage: page < totalPage,
        hasPreviousPage: page === 1 || page > totalPage ? false : true,
        currentPage: totalPage > page ? page : totalPage,
    };
    return edge;
};
