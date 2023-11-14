import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-map-dialog',
  templateUrl: './map-dialog.component.html',
  styleUrls: ['./map-dialog.component.scss']
})
export class MapDialogComponent implements OnInit{
  map: L.Map
  open = true
  ngOnInit(): void {
    setTimeout(() => {
      this.open = true
    }, 500);
  }
  constructor(private dialogRef: MatDialogRef<MapDialogComponent>){ }

  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 57,
        attribution: "© OpenStreetMap contributors"
      })
    ],
    zoom: 10,
    center: L.latLng(6.930830, 126.280320)
  };

  onMapReady(map: L.Map) {
    this.map = map;
    (L.Control as any).geocoder().addTo(map)
    map.on('click', (e)=> {
      var popup = L.popup()
      .setLatLng(e.latlng)
      .setContent('<p>Pinned</p>')
      .openOn(map);
      this.reverseGeocode(e.latlng.lat, e.latlng.lng)
        .then(locationName => {
          if (window.confirm(locationName)) {
              this.dialogRef.close(locationName)
          }
        })
        .catch(error => console.error('Error:', error));
    });
  }

  private reverseGeocode(lat: number, lng: number): Promise<string> {
    const apiUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data.display_name)
      .catch(error => {
        console.error('Error:', error);
        throw error;
      });
  }
}
