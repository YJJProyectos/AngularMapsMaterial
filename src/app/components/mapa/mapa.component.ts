import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat: number;
  lng: number;
  marcadores: Marcador[] = [];

  constructor() { 
    if (navigator.geolocation) {
      console.log("GEOLOCATION");
      navigator.geolocation.getCurrentPosition( (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        const nuevoMarcador = new Marcador(this.lat, this.lng);
        console.log("LAT: " + this.lat + " LONG " + this.lng);
        
        this.marcadores.push(nuevoMarcador);
      });
      // navigator.geolocation.getCurrentPosition(showPosition);
    }
    let title: string = 'Mapa de google';
  }

  ngOnInit() {
  }


}
  function showPosition(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }
