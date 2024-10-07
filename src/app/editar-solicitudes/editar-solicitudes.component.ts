import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SolicitudModel } from '../shared/solicitud.model';

@Component({
  selector: 'app-editar-solicitudes',
  templateUrl: './editar-solicitudes.component.html',
  styleUrls: ['./editar-solicitudes.component.css']
})
export class EditarSolicitudesComponent implements OnInit {
  solicitud: SolicitudModel = new SolicitudModel(0, '', new Date(), 'Pendiente');
  idSolicitud: number | null = null;
  isLoading: boolean = false;
  errorMsg: string | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    // Obtener el id de la solicitud desde la URL
    this.idSolicitud = Number(this.route.snapshot.paramMap.get('idSolicitud'));  // Asegúrate de que sea 'idSolicitud'
    
    if (this.idSolicitud) {
      this.obtenerSolicitudPorId(this.idSolicitud);
    }
  }

  // Obtener solicitud por ID para editar
  obtenerSolicitudPorId(id: number): void {
    this.isLoading = true;
    this.http.get<SolicitudModel>(`http://localhost:4000/solicitudes/buscarSolicitudPorId/${id}`)
      .subscribe(
        data => {
          this.solicitud = data;
          this.isLoading = false;
        },
        error => {
          console.error('Error al obtener solicitud:', error);
          this.errorMsg = 'Error al cargar la solicitud. Intenta de nuevo.';
          this.isLoading = false;
        }
      );
  }

  // Guardar o actualizar la solicitud
  onSubmit(): void {
    this.isLoading = true;

    if (this.idSolicitud) {
      // Editar solicitud existente
      this.http.put(`http://localhost:4000/solicitudes/editarSolicitud/${this.idSolicitud}`, this.solicitud)
        .subscribe(
          response => {
            console.log('Solicitud actualizada:', response);
            this.router.navigate(['/solicitudes']);
          },
          error => {
            console.error('Error al actualizar solicitud:', error);
            this.errorMsg = 'Error al actualizar la solicitud. Intenta de nuevo.';
            this.isLoading = false;
          }
        );
    } else {
      // Crear nueva solicitud
      this.http.post('http://localhost:4000/solicitudes/crearSolicitud', this.solicitud)
        .subscribe(
          response => {
            console.log('Solicitud creada:', response);
            this.router.navigate(['/solicitudes']);
          },
          error => {
            console.error('Error al crear solicitud:', error);
            this.errorMsg = 'Error al crear la solicitud. Intenta de nuevo.';
            this.isLoading = false;
          }
        );
    }
  }
}
