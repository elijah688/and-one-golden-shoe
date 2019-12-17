import { Component, OnInit, OnDestroy } from '@angular/core';
import { Shoe } from './shoe/shoe.model';
import { ShoeService } from './shoe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit, OnDestroy {
  private selectedItem: any;
  
  public shoes:Shoe[] = [];
  private shoeSub:Subscription = new Subscription();
  constructor(private shoeServ:ShoeService) {
  }

  ngOnInit() {
    this.shoeServ.getShoes();
    this.shoeSub = this.shoeServ.shoesSubject.subscribe(shoes=>{
      this.shoes = shoes;
    })
  }
  ngOnDestroy(): void {
    this.shoeSub.unsubscribe();
  }
}
