import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderbarComponent } from './headerbar/headerbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';
import { CoreRoutingModule } from './core-routing.module';


@NgModule({
  declarations: [
    HeaderbarComponent,
    SidebarComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule
  ],
  exports: [
    HeaderbarComponent,
    SidebarComponent
  ]
})
export class CoreModule {}
