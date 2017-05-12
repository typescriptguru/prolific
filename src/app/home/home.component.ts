import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  ngOnInit(): any {
    $('.newsletter-bg').css({'height':($('.localevents-bg').height()+'px')}); // @TODO: it should be doe by css
  }
}
