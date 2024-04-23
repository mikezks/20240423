import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderbarComponent } from './core/headerbar/headerbar.component';
import { SidebarComponent } from './core/sidebar/sidebar.component';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: true,
    imports: [
        SidebarComponent,
        HeaderbarComponent,
        RouterOutlet,
    ],
})
export class AppComponent {
  title = 'Hello World!';
}
