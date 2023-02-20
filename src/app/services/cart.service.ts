import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cart } from '../dealer-dashboard/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8181/cart';

  constructor(private http: HttpClient) { }

  addCart(cart: Cart): Observable<Cart> {
    return this.http.post<Cart>("http://localhost:8181/cart/addCart", cart);
  }

  searchCartByCartId(cartId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.baseUrl}/findcartId/${cartId}`);
  }

  searchCartByUserId(userId: string): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/finduserId/${userId}`);
  }

  findCart(): Observable<Cart[]> {
    return this.http.get<Cart[]>(`${this.baseUrl}/findall`);
  }

  deleteCartById(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCart/${id}`, { responseType: 'text' });
  }

  getTotalPrice(userId: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/totalPrice/${userId}`);
  }

  deleteAllCart(userId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteAllCart/${userId}`, { responseType: 'text' });
  }

  updateCart(cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.baseUrl}/updateCart`, cart);
  }
  createOrder(order:any){
    return this.http.post("http://localhost:5555/payment/createOrder", order);
  }
}
