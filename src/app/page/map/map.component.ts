import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  map: L.Map
  markers: L.Layer[] = [];

  popupText = "Some popup text";

  markerIcon = {
    icon: L.icon({
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
      // specify the path here
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    })
  };

  options = {
    layers: [
      L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 57,
        attribution: ""
      })
    ],
    zoom: 10,
    center: L.latLng(6.930830, 126.280320)
  };

  addMarker() {
    const newMarker = L.marker([6.930830, 126.280320], this.markerIcon);

    this.markers.push(newMarker);

    newMarker.addTo(this.map);
  }

  onMapReady(map: L.Map) {
    this.map = map;
    // Do stuff with map
  }
  open = false

  ngOnInit(): void {
    setTimeout(() => {
      this.open = true
    }, 100);
    setTimeout(()=>{
      this.addMarker()
    }, 500)
  }
}
