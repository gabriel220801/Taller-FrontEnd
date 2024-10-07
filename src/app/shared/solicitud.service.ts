import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SolicitudModel } from './solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  BASE_URL= 'http://localhost:4000';

  constructor(private http: HttpClient) { }

  // Obtener todas las solicitudes
  obtenerSolicitudes() {
    return this.http.get<SolicitudModel[]>(`${this.BASE_URL}/solicitudes/buscarSolicitud`);
  }


  // Buscar solicitud por id
  buscarSolicitud(idSolicitud: string) {
    return this.http.get<SolicitudModel>(`${this.BASE_URL}/solicitudes/buscarSolicitudPorId/${idSolicitud}`);
  }

  // Agregar una nueva solicitud
  agregarSolicitud(solicitud: SolicitudModel) {
    return this.http.post<SolicitudModel>(`${this.BASE_URL}/solicitudes/crearSolicitud`, solicitud);
  }

  // Actualizar una solicitud existente
  actualizarSolicitud(solicitud: SolicitudModel) {
    return this.http.put<SolicitudModel>(`${this.BASE_URL}/solicitudes/editarSolicitud/${solicitud.id}`, solicitud);
  }

  // Borrar solicitud
  borrarSolicitud(idSolicitud: string) {
    return this.http.delete(`${this.BASE_URL}/solicitudes/eliminarSolicitud/${idSolicitud}`);
  }

}
