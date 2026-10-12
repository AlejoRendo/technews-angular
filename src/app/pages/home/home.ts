import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NoticiasService } from '../../services/noticias.service';
import { CardNoticiaComponent } from '../../shared/card-noticia/card-noticia';

@Component({
  selector: 'app-home',
  imports: [RouterLink, CardNoticiaComponent],
  templateUrl: './home.html'
})
export class HomeComponent {
  private readonly noticiasService = inject(NoticiasService);

  readonly destacadas = this.noticiasService.destacadas().slice(0, 3);
}
