import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipe-app-angular';
  menu: string = 'recipe';

  onGetNavigate(selectedNav: string){
    
    this.menu = selectedNav;
    
  }
}
