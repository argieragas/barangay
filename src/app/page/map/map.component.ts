import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import { GetLocation } from 'src/utils/data';
import { ServiceData } from 'src/app/client/servicedata.client';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit{
  map: L.Map

  constructor(private serviceData: ServiceData){}

  markers: GetLocation[] = []
  popupText = "Some popup text";

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

  private addMarkers() {
    this.markers.forEach(marker => {
      var popup = new L.Popup().setContent(marker.content)
      L.marker([marker.lat, marker.lng], { icon: L.icon({ iconUrl: marker.icon, iconSize: [30, 30] }) })
        .bindPopup(popup)
        .addTo(this.map);
    });
  }

  onMapReady(map: L.Map) {
    this.map = map;
    (L.Control as any).geocoder().addTo(map)
  }
  open = false

  ngOnInit(): void {
    this.serviceData.getLocationReport().subscribe(
      (response)=>{
        this.markers = response
      }
    )
    this.serviceData.getLocationCase().subscribe(
      (response)=>{
        response.forEach(data=>{
          this.markers.push(data)
        })
      }
    )
    setTimeout(() => {
      this.open = true
    }, 100);
    setTimeout(()=>{
      this.addMarkers()
      this.addLegend()
    }, 500)
  }


  private addLegend() {
    const legend = (L as any).control({ position: 'bottomright' })
    const arrayMarker = new Set<string>()
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'legend')
      const labels = []
      div.style.backgroundColor = 'white'
      div.style.padding = '7px'
      div.style.borderRadius = '3px'
      this.markers.forEach(marker => {
        arrayMarker.add(JSON.stringify({icon: marker.icon, label: marker.label}))
      });
      const array = Array.from(arrayMarker).map(el => JSON.parse(el))

      array.forEach(el => {
        console.log(el)
        labels.push('<div style="text-align: center"><img src="' + el.icon + '" style="width: 23px; height: 23px; margin: auto" alt="marker" /> '+el.label+'</div')
      })

      div.innerHTML = labels.join('<br>')
      return div
    }

    legend.addTo(this.map)
  }
}
