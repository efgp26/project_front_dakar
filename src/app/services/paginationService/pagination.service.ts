import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaginationService {

  itemsPerPage = 5;
  startPage: number = 1;
  endPage: number = 2;
  paginatedData: any[] = [];
  objectPaginatijon: {list: any[], start: number, end: number} = {list:[], start: 0, end: 0};

  constructor() { }

  updatePaginatedData(array: any[], currentPage: number): any[] {
    const start = (currentPage - 1) * this.itemsPerPage;
    const end = Math.min(start + this.itemsPerPage, array.length);
    return [this.paginatedData = array.slice(start, end),start+1,end];
  }

  onPageChange(page: number, totalPages: number): any {
    if(page < 1) {
      return page = 1;
    }
    if(page > totalPages+1) {
        return 1;
    }
    else{
        let currentPage = page;
        return  currentPage;
    }
  }
}
