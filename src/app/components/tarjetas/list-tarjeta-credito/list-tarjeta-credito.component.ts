import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-list-tarjeta-credito',
  templateUrl: './list-tarjeta-credito.component.html',
  styleUrls: ['./list-tarjeta-credito.component.css']
})
export class ListTarjetaCreditoComponent implements OnInit {

  tarjetas: TarjetaCredito[] = [];

  constructor(public tarjetaService: TarjetaService, public toastr: ToastrService) { }

  ngOnInit(): void {
          
    this.tarjetaService.obtenerTarjetas().subscribe({
      next: (listaDeTarjetas) => {
        this.tarjetas = listaDeTarjetas;
      },
      error: (response) => {
        console.log(response);
      }
    })
  }

  eliminarTarjeta(id:number){
    
    if(confirm('Esta seguro de Eliminar el Registro..?')) {
      this.tarjetaService.eliminarTarjeta(id).subscribe(data => {
        this.toastr.warning('Registro Eliminado', 'La Tarjeta fue Eliminada');

        this.tarjetaService.obtenerTarjetas().subscribe({
          next: (listaDeTarjetas) => {
            this.tarjetas = listaDeTarjetas;
          },
          error: (response) => {
            console.log(response);
          }
        })
      })
      
    }
  }

  editarTarjeta(tarjeta : TarjetaCredito) {
    this.tarjetaService.actualizar(tarjeta);
  }

}
