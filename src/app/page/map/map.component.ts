import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
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
      iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-shadow.png"
    })
  };

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

  addMarker() {
    const newMarker = L.marker([6.930830, 126.280320], this.markerIcon);
    newMarker.bindPopup("<b>Marker Information</b>")
    this.markers.push(newMarker);

    newMarker.addTo(this.map);
  }

  sample(text: String): Promise<String> {
    return
  }

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
          // Display the location name
          alert('Location Name: ' + locationName);
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
