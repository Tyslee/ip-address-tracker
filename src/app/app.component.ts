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
  currIP = '8.8.8.8';
  location;
  timezone;
  ORG;
  coord;
  firstMap = true;

  onKey(event) {
    this.currIP = event?.target.value;
  }

  changeIP() {
    if (this.regex.test(this.currIP)) {
      this.ipAddress = this.currIP;
      this.ipGeolocationService
        .getLocationByIP(this.ipAddress)
        .subscribe((data) => {
          this.location =
            data.city + ', ' + data.region_code + ', ' + data.country_code;
          this.timezone = data.timezone;
          this.ORG = data.org;
          this.coord = [data.latitude, data.longitude];
          this.update();
        });
      return true;
    } else {
      alert('Invalid IP!' + this.ipAddress);
      return false;
    }
  }
  update() {
    if (!this.firstMap) {
      this.mapComp.removeMap();
    }

    this.mapComp.initMap(this.coord);
    this.firstMap = false;
  }

  constructor(private ipGeolocationService: IpGeolocationService) {}

  public ngOnInit(): void {
    this.changeIP();
    this.currIP = '';
  }
}
