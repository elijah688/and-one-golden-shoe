import { Component, OnInit, OnDestroy } from '@angular/core';
import { ShoeService } from '../list/shoe.service';
import { ActivatedRoute } from '@angular/router';
import { Shoe } from '../list/shoe/shoe.model';
import { Subscription } from 'rxjs';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.sass'],
})
export class DetailsPage implements OnInit, OnDestroy {
  currentShoe:Shoe;
  private shoeSub:Subscription = new Subscription()
  constructor(private shoeServ:ShoeService, private cartServ:CartService , private route:ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params=>{
      const id:string = params.get('id');
      this.shoeServ.getShoeById(id);
      this.shoeSub = this.shoeServ.singleShoeSubject.subscribe(shoe=>{
        this.currentShoe = shoe;
      })
    })
  }

  ngOnDestroy(): void {
    this.shoeSub.unsubscribe()
  } 

  addToCart(color:string):void{
    if(this.currentShoe){
      this.cartServ.addToCart(this.currentShoe,color)
      this.cartServ.getCart()
    }
    else{
      return
    }
  }



}
