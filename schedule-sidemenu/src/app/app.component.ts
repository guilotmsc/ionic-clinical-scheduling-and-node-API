import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { EventsServiceService } from './events-service.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public userType = null;
  public user = null;
  public appPages = [
    {
      title: 'Agendamento',
      url: '/person',
      icon: 'calendar'
    },
    {
      title: 'Consulta',
      icon: 'file-tray-stacked',
    },
    {
      title: 'Procedimento',
      url: '/folder/Favorites',
      icon: 'heart'
    },
    {
      title: 'Relatórios',
      url: '/folder/Archived',
      icon: 'newspaper'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router:  Router,
    private events: EventsServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.events.getObservable().subscribe((data) => {
      this.userType = data.userType
      this.user = data.user.Usuario
    })
  }

  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  logout(){
    this.router.navigateByUrl('login');
  }
}
