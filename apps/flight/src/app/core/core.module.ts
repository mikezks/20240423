import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core-routing.module';


@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        HeaderbarComponent,
        SidebarComponent,
        HomeComponent
    ],
    exports: [
          HeaderbarComponent,
          SidebarComponent
    ]
})
export class CoreModule {}
