import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TarjetaCredito } from 'src/app/models/tarjetaCredito';
import { TarjetaService } from 'src/app/services/tarjeta.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit, OnDestroy {

  form : FormGroup;
  subscription: Subscription;
  tarjeta: TarjetaCredito;
  idTarjeta = 0;
  tarjetas: TarjetaCredito[] = [];

  constructor(private formBuilder: FormBuilder, private tarjetaService: TarjetaService, private toastr: ToastrService)
  {
    this.form = this.formBuilder.group({
      id: 0,
      titular: ['',[Validators.required, Validators.minLength(9)]],
      numeroTarjeta: ['', [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cw: ['', [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    });
  }

  ngOnInit(): void {
    this.subscription =
     this.tarjetaService.obtenerTarjeta().subscribe(data => {
      console.log(data);
      this.tarjeta = data;
      this.form.patchValue({
        id: this.tarjeta.id,
        titular: this.tarjeta.titular,
        numeroTarjeta: this.tarjeta.numeroTarjeta,
        fechaExpiracion: this.tarjeta.fechaExpiracion,
        cw:this.tarjeta.cw
      });
      
      this.idTarjeta = this.tarjeta.id;
    });

    if(this.tarjeta.id === undefined){
      this.idTarjeta = 0;
    }
    console.log(this.idTarjeta);
  }

  guardarTarjeta() {
    
    if(this.idTarjeta === 0){
      console.log(this.idTarjeta);
      this.agregarTarjeta();
    } else {
      console.log('llego al else para editar tarjeta');
      this.editarTarjeta();
    }
  }
  
  agregarTarjeta() {
    const tarjeta: TarjetaCredito = {
      id: this.form.get('id').value,
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cw: this.form.get('cw').value

    };

    this.tarjetaService.guardarTarjeta(tarjeta).subscribe( data => {
      this.toastr.success('Registro Agregado', 'Tarjeta agregada exitosamente!!!');
      this.tarjetaService.obtenerTarjetas().subscribe({
        next:(listaDeTarjetas) => {
          this.tarjetas = listaDeTarjetas;
        },
        error: (response) => {
          console.log(response);
        },
      });
      this.form.reset();
    });
  };

  editarTarjeta(){
    const tarjeta: TarjetaCredito = {
      id: this.tarjeta.id,
      titular: this.form.get('titular').value,
      numeroTarjeta: this.form.get('numeroTarjeta').value,
      fechaExpiracion: this.form.get('fechaExpiracion').value,
      cw: this.form.get('cw').value

    };
    this.tarjetaService.actualizarTarjeta(this.idTarjeta,tarjeta).subscribe(data => {
      this.toastr.info('Registro Actualizado', 'Tarjeta actualizada exitosamente!!!');
      this.tarjetaService.obtenerTarjetas();
      this.form.reset();
      this.idTarjeta = 0;
    });
  }
  
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
