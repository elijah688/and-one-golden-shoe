import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-shoe',
  templateUrl: './shoe.component.html',
  styleUrls: ['./shoe.component.scss'],
})
export class ShoeComponent implements OnInit {
  @Input() title:string
  @Input() description:string
  @Input() price:number
  @Input() image:string
  constructor() { }

  ngOnInit() {}

}
