import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-estado-vacio',
  imports: [RouterLink],
  templateUrl: './estado-vacio.html'
})
export class EstadoVacioComponent {
  @Input({ required: true }) titulo!: string;
  @Input() texto = '';
  @Input() icono = '';
  @Input() enlace = '';
  @Input() etiquetaEnlace = '';
}
