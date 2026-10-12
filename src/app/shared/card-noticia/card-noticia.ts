import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia.model';

@Component({
  selector: 'app-card-noticia',
  imports: [RouterLink],
  templateUrl: './card-noticia.html'
})
export class CardNoticiaComponent {
  @Input({ required: true }) noticia!: Noticia;
}
