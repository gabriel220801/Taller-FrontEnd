import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { SolicitudModel } from '../shared/solicitud.model';

@Component({
  selector: 'app-lista-solicitudes',
  templateUrl: './lista-solicitudes.component.html',
  styleUrls: ['./lista-solicitudes.component.css']
})
export class ListaSolicitudesComponent {
  solicitudes: SolicitudModel[] = []; // Arreglo para almacenar las solicitudes

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.obtenerSolicitudes();
  }

  // Obtener todas las solicitudes
  obtenerSolicitudes(): void {
    this.http.get<SolicitudModel[]>('http://localhost:4000/solicitudes/buscarSolicitud')
      .subscribe(
        data => {
          this.solicitudes = data;
        },
        error => {
          console.error('Error al obtener solicitudes:', error);
        }
      );
  }

  // Redirigir al formulario de edición de solicitud
  editarSolicitud(id: number): void {
    this.router.navigate(['/solicitudes/editar', id]);
  }

  // Eliminar una solicitud
  borrarSolicitud(id: number): void {
    this.http.delete(`http://localhost:4000/solicitudes/eliminarSolicitud/${id}`)
      .subscribe(
        response => {
          console.log('Solicitud eliminada:', response);
          this.obtenerSolicitudes(); // Refrescar la lista después de eliminar
        },
        error => {
          console.error('Error al eliminar solicitud:', error);
        }
      );
  }
}
