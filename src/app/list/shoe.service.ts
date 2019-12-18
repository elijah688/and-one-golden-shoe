import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Shoe } from './shoe/shoe.model';
import { Subject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoeService {
  private url:string = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents/shoes?key=${environment.firebaseConfig.apiKey}`
  private _shoesSubject:Subject<Shoe[]> = new Subject<Shoe[]>();
  private _singleShoeSubject:Subject<Shoe> = new Subject<Shoe>();
  
  constructor(private http:HttpClient) {

   }

   getShoes():void{
    this.http.get<any>(this.url).pipe(map(res=>res.documents.map(x=>{
      return {
      id:x.name.split('/')[x.name.split('/').length-1],  
      title:x.fields.title.stringValue, 
      description:x.fields.description.stringValue,
      price:x.fields.price.doubleValue,
      colors:x.fields.colors.arrayValue.values.map(x=>x.stringValue) 
    }}))).subscribe(shoes=>{
      this._shoesSubject.next(shoes)
    }
    );
  }

  getShoeById(id:string):void{
    const url:string = this.url.split('?').join(`/${id}?`);
    this.http.get<any>(`${url}`).pipe(map(res=>[res].map(x=>{
      return {
      id:x.name.split('/')[x.name.split('/').length-1],  
      title:x.fields.title.stringValue, 
      description:x.fields.description.stringValue,
      price:x.fields.price.doubleValue,
      colors:x.fields.colors.arrayValue.values.map(x=>x.stringValue) 
    }}))).subscribe(shoe=>{
      this._singleShoeSubject.next(shoe[0])
    }
    );
  }

  addToCart(shoe:Shoe, color:string):void{
    const purchase:Shoe = {...shoe, colors: [color]}
    this._singleShoeSubject.next(purchase);
  }

   get shoesSubject():Observable<Shoe[]>{
     return this._shoesSubject.asObservable();
   }

   get singleShoeSubject():Observable<Shoe>{
    return this._singleShoeSubject.asObservable();
  }
}
