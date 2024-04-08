import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SwipersComponent } from "./components/swipers/swipers.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, SwipersComponent]
})
export class AppComponent {
  title = 'swiper-prueba';
}
