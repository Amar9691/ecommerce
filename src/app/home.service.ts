import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { Product } from './product/product';
import { pipe, map } from 'rxjs';
import { env } from '../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}
  public products: Product[] = [];
  private product$ = new BehaviorSubject(this.products);
  currentProduct = this.product$.asObservable();
  updateProduct(product: Product[]) {
    this.product$.next(product);
  }
  getProductsList(): Observable<any> {
    return this.http.get(env.API_URL + 'products').pipe(
      tap({
        next: (value) => {
          console.log('Response Returned Successfully');
        },
        error: (error) => {
          retry(3);
        },
      })
    );
  }

  getProductDetails(id: number): Observable<any> {
    return this.http.get(env.API_URL + 'products/' + id).pipe(
      tap({
        next: (value) => {
          console.log('Response Returned Successfully');
        },
        error: (error) => {
          retry(3);
        },
      })
    );
  }

  searchProducts(term: string): Observable<any> {
    term = term.trim();
    const options = term ? { params: new HttpParams().set('q', term) } : {};
    return this.http.get(env.API_URL + 'products/search', options).pipe(
      tap({
        next: (value) => {
          console.log('Searched response returned successfully');
        },
        error: (error) => {
          retry(3);
        },
      })
    );
  }
}
