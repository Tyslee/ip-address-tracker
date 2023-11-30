import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css',
})
export class MapComponent {
  public map;

  public removeMap(): void {
    this.map.off();
    this.map.remove();
  }

  public initMap(coord): void {
    this.map = L.map('map', {
      center: [coord[0], coord[1]],
      zoom: 18,
    });

    var locationIcon = L.icon({
      iconUrl: 'assets/location-icon.png',

      iconSize: [50, 50],
      iconAnchor: [25, 50],
    });
    L.marker(coord, { icon: locationIcon }).addTo(this.map);

    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    );

    tiles.addTo(this.map);
  }

  constructor(http: HttpClient) {}
}
