import { MapaEditarComponent } from './mapa-editar.component';
import { Component, OnInit } from '@angular/core';
import { Marcador } from '../../classes/marcador.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog, MatDialogRef} from '@angular/material';

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
    public snackBar: MatSnackBar,
    public dialog: MatDialog
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
    if (localStorage.getItem('marcadores')) {
      console.log("Cargar datos");
      this.marcadores = JSON.parse(localStorage.getItem('marcadores'));
      if ( this.marcadores.length == 0 ) {
        console.log("marcadores vacios");
        navigator.geolocation.getCurrentPosition( (position) => {
          this.lat = position.coords.latitude;
          this.lng = position.coords.longitude;
          const nuevoMarcador = new Marcador(this.lat, this.lng);
          console.log("CARGAR -- LAT: " + this.lat + " LONG " + this.lng);
          
          this.marcadores.push(nuevoMarcador);
          this.guardarStorage();
        });
      }
    } else {
        console.log("Si no hay datos de marcadores");
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

  editarMarcador( marcador : Marcador ) {

    let dialogRef = this.dialog.open( MapaEditarComponent, {
      width: '250px',
      data: { titulo: marcador.titulo, desc : marcador.desc }
    });
    
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // console.log(result);
      if (!result) {
        return;
      }
      marcador.titulo = result.titulo;
      marcador.desc = result.desc;
      this.guardarStorage();
      this.snackBar.open("Marcador actualizado", "Cerrar",{ duration: 1500});
    });

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
