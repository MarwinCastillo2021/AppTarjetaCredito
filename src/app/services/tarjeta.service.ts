import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { TarjetaCredito } from '../models/tarjetaCredito';

@Injectable({
  providedIn: 'root'
})
export class TarjetaService {

  myAppUrl = 'https://webapitarjetacredito.azurewebsites.net/';
  myApiUrl = 'api/TarjetaCredito/';
  
  private actualizarFormulario = new BehaviorSubject<TarjetaCredito>({} as any);

  constructor(private http: HttpClient) { }

  guardarTarjeta(tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
    return this.http.post<TarjetaCredito>(this.myAppUrl + this.myApiUrl, tarjeta);
  }

  obtenerTarjetas(): Observable<TarjetaCredito[]>{
     return this.http.get<TarjetaCredito[]>(this.myAppUrl + this.myApiUrl);
  }

  eliminarTarjeta(id:number): Observable<TarjetaCredito> {
    return this.http.delete<TarjetaCredito>(this.myAppUrl + this.myApiUrl + id);
  }

 actualizarTarjeta(id:number, tarjeta: TarjetaCredito): Observable<TarjetaCredito> {
  return this.http.put<TarjetaCredito>(this.myAppUrl +this.myApiUrl + id, tarjeta);
 }
 
 
  actualizar(tarjeta : TarjetaCredito){
    this.actualizarFormulario.next(tarjeta);
  }

  obtenerTarjeta(): Observable<TarjetaCredito> {
    return this.actualizarFormulario.asObservable();
  }
}
