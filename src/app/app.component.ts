import { Component, OnInit } from '@angular/core';

// Service Worker
import { SwUpdate } from '@angular/service-worker';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  constructor(
    private swUpdate: SwUpdate,
  ) {

  }

  ngOnInit(): void {
    // Validate browser SW support and auto refresh of the app
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }


}
