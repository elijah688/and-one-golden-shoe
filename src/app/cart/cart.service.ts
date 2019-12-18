import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Shoe } from '../list/shoe/shoe.model';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private _cartSubject:Subject<Shoe[]> =new Subject<Shoe[]>()
  constructor(private http:HttpClient) { }

  addToCart(shoe:Shoe, color:string):void{
    const url:string = 'https://and-one-golden-shoe.firebaseio.com/cart.json'

    const purchased:Shoe = {...shoe, colors:[color]}
    this.http.post<any>(url,purchased).subscribe(res=>{
      console.log(res);
      this.getCart()
    })
  }

  getCart():void{
    const url:string = 'https://and-one-golden-shoe.firebaseio.com/cart.json'
    this.http.get<any>(url).pipe(
      map(res=>{
        return[...Object.keys(res)].map(x=>{
          return {...res[x],id:x}
        }
        )})).subscribe(items=>{
      this._cartSubject.next(items)
    })
  }


  removeItemFromCart(id:string){
    const url:string = `https://and-one-golden-shoe.firebaseio.com/cart/${id}.json`
    this.http.delete(url).subscribe(res=>{
      console.log(res);
      this.getCart()
    });

  }

  get cartSubject():Observable<Shoe[]>{
    return this._cartSubject.asObservable();
  }


}
