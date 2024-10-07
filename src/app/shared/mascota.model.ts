export class MascotaModel {
    constructor(
      public id: string,            // ID de la mascota
      public nombre: string,        // Nombre de la mascota
      public descripcion: string,   // Descripción de la mascota
      public edad: string,          // Edad de la mascota
      public genero: string, // Género de la mascota (Macho o Hembra)
      public imagen: string         // URL o ruta de la imagen de la mascota
    ) {}
}
