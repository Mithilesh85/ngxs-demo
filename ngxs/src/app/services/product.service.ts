import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Product } from '../components/Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product!:Product[];

  constructor(private http:HttpClient) { }

  addProduct(product:Product):Observable<Product>{
   return this.http.post<Product>('http://localhost:8080/api/addProduct',product);
  }

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`http://localhost:8080/api/getProducts`);
  }

  getSingleProduct(productId:number):Observable<Product>{
    return this.http.get<Product>(`http://localhost:8080/api/getProduct/${productId}`);
  }

  deleteProduct(productId:number):Observable<void>{
    return this.http.delete<void>(`http://localhost:8080/api/deleteProduct/${productId}`);
  }

  editProduct(productId:number, product:Product):Observable<Product>{
    return this.http.put<Product>(`http://localhost:8080/api/updateProduct/${productId}`,product);
  }
  



}
