import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shoe } from '../list/shoe/shoe.model';
import { ShoeService } from '../list/shoe.service';
import { Subscription } from 'rxjs';
import { CartService } from './cart.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {

  cart:Shoe[] = []
  total:number = 0;
  private cartSub:Subscription = new Subscription();
  constructor(private cartServ:CartService) { }

  ngOnInit() {
    this.cartServ.getCart();
    this.cartSub = this.cartServ.cartSubject.subscribe(cart=>{
      this.cart = cart;
      this.getTotal();
    })
    
  }

  ngOnDestroy(){
    this.cartSub.unsubscribe()
  }

  getTotal():void{
    const total:number = this.cart.map(x=>x.price).reduce((acc,x)=>acc+x);
    this.total = total;
  }

  removeItem(id:string){
    console.log(id)
    this.cartServ.removeItemFromCart(id)
  }
}
