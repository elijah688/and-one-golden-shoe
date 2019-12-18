import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.sass'],
})
export class AuthPage implements OnInit {

  constructor(private navCtrl:NavController, private fb:FormBuilder) { }
  
  authForm = this.fb.group({
    email: [''],
    password: [''],
  });

  ngOnInit() {
  }

  authenticate(){
    this.navCtrl.navigateForward('/list')
  }

}
