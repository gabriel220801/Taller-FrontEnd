import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MascotaModel } from './mascota.model';

@Injectable({
  providedIn: 'root'
})
export class MascotaService {

  BASE_URL= 'http://localhost:4000'

  constructor(private http: HttpClient) {

  }
  
  //obtener las mascotas
  obtenerMascotas(){
    return this.http.get<MascotaModel[]>(`${this.BASE_URL}/mascotas/buscarTodos`);
  }

  //buscar una mascota por id
  buscarMascota(idMascota: string){
    return this.http.get<MascotaModel>(`${this.BASE_URL}/mascotas/buscarPorId/${idMascota}`);
  }

  //agregar mascota
  agregarMascota(mascota: MascotaModel){
    return this.http.post<string>(`${this.BASE_URL}/mascotas/crear`, mascota);
  }

  //actualizar mascota
  actualizarMascota(mascota: MascotaModel){
    return this.http.put<string>(`${this.BASE_URL}/mascotas/editar/${mascota.id}`,mascota );
  }

  //borrar mascota
  borrarMascota(idMascota: string){
    return this.http.delete<string>(`${this.BASE_URL}/mascotas/eliminar/${idMascota}`);
  }
}
