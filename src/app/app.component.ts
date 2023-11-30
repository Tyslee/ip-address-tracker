import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MapComponent } from './map/map.component';
import { IpGeolocationService } from './services/ip-geolocation.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MapComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild(MapComponent, { static: true }) mapComp: MapComponent;
  regex =
    /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  ipAddress;
  currIP = '192.212.174.101';
  location;
  timezone;
  ISP;
  coord;

  onKey(event) {
    this.currIP = event?.target.value;
  }

  changeIP() {
    if (this.regex.test(this.currIP)) {
      this.ipAddress = this.currIP;
      this.ipGeolocationService
        .getLocationByIP(this.ipAddress)
        .subscribe((data) => {
          this.location = data.city + ', ' + data.region + ', ' + data.country;
          this.timezone = data.timezone;
          this.ISP = data.isp;
          this.coord = [data.lat, data.lon];
          this.update();
        });
      return true;
    } else {
      alert('Invalid IP!' + this.ipAddress);
      return false;
    }
  }
  update() {
    this.mapComp.removeMap();
    this.mapComp.initMap(this.coord);
  }

  constructor(private ipGeolocationService: IpGeolocationService) {}

  public ngOnInit(): void {
    this.changeIP();
    this.currIP = '';
  }
}
