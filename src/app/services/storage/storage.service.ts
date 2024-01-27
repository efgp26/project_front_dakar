import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage:any = {};

  constructor() { }

  public setItem(key: string, value: any): void {
    console.log(value)
    localStorage.setItem(key, value);
  }

  public getItem(key: string): any {
    return localStorage.getItem(key);
  }

  public clearItem(key: string): void {
    localStorage.removeItem(key);
  }

  public clearAll(): void {
    localStorage.clear();
  }
}
