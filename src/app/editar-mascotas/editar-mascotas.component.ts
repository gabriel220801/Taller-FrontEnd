import { Component, OnInit } from '@angular/core';
import { MascotaModel } from '../shared/mascota.model';
import { MascotaService } from '../shared/mascota.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-mascotas',
  templateUrl: './editar-mascotas.component.html',
  styleUrl: './editar-mascotas.component.css'
})
export class EditarMascotasComponent implements OnInit {
  idMascota= '';
  mascota = new MascotaModel('','','','','','');

  constructor(private mascotaService : MascotaService, private route: ActivatedRoute, private router: Router){
  }

  ngOnInit(){
    this.idMascota=this.route.snapshot.params['idMascota'];
    console.log(`el id es ${this.idMascota}`);

    if(this.idMascota){
      //ruta para editar
      this.mascotaService.buscarMascota(this.idMascota).subscribe({
        next: data=>{
          this.mascota=data;
        },
        error: error=>{
          console.log(`Ocurrio un error ${error}`);
        }
      });
    }
    else{
      //ruta para crear

    }
  }

  onSubmit(){
    console.log("ON Submit");
    if(this.idMascota){
      this.mascotaService.actualizarMascota(this.mascota).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/mascotas']);

        },
        error: error=>{
          console.log(`Ocurrio un error ${error}`);
        }
      });
    }
    else{
      //desde nueva mascota
      this.mascotaService.agregarMascota(this.mascota).subscribe({
        next: data=>{
          console.log(data);
          this.router.navigate(['/mascotas']);
        },
        error: error=>{
          console.log(`Ocurrio un error al agregar ${error}`);
        }
      });
    }
    
  }


}
