export class SolicitudModel {
  constructor(
    public id: number,
    public nombreAdoptante: string,
    public fechaSolicitud: Date,
    public estado: string
  ) {}
}