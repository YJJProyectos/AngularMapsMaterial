import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  lat: number;
  lng: number;
  marcadores: Marcador[] = [];
  mapa: boolean = false;

  constructor(
    public snackBar: MatSnackBar
  ) { 

    if (navigator.geolocation) {
      console.log("GEOLOCATION");
      navigator.geolocation.getCurrentPosition( (position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log("LAT: " + this.lat + " LONG " + this.lng);
        this.mapa = true;
      });
    }

    let title: string = 'Mapa de google';
    if (localStorage.getItem('marcadores') && localStorage.getItem('marcadores').length > 0) {
      console.log("Cargar datos");
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
    } else {
      if (navigator.geolocation) {
        console.log("Si no hay datos");
        navigator.geolocation.getCurrentPosition( (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          const nuevoMarcador = new Marcador(this.lat, this.lng);
          console.log("LAT: " + this.lat + " LONG " + this.lng);
          
          this.marcadores.push(nuevoMarcador);
          this.guardarStorage();
        });
        // navigator.geolocation.getCurrentPosition(showPosition);
      }
    }
  }

  ngOnInit() {
  }

  agregarMarcador(evento) {
    console.log(evento.coords.lat + " " + evento.coords.lng);
    const coords = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snackBar.open("Marcador agregado","Cerrar", {duration: 2000});
  }

  borrarMarcador(i : number) {
    console.log(i);
    this.marcadores.splice(i, 1);
    this.guardarStorage();
    this.snackBar.open("Marcador Borrado","Cerrar", {duration: 2000});
  }  

  guardarStorage() {

    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));

  }

  borrarMarcadores() {
    this.marcadores = [];
    this.guardarStorage();
    this.snackBar.open("Todos los marcadores borrados","Cerrar", {duration: 2000});
  }

}
  function showPosition(position) {
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
  }
