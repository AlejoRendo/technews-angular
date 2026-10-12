import { Component, computed, inject, signal } from '@angular/core';
import { CATEGORIAS } from '../../data/noticias.data';
import { NoticiasService } from '../../services/noticias.service';
import { CardNoticiaComponent } from '../../shared/card-noticia/card-noticia';
import { EstadoVacioComponent } from '../../shared/estado-vacio/estado-vacio';

@Component({
  selector: 'app-noticias',
  imports: [CardNoticiaComponent, EstadoVacioComponent],
  templateUrl: './noticias.html'
})
export class NoticiasComponent {
  private readonly noticiasService = inject(NoticiasService);

  readonly filtros = ['Todas', ...CATEGORIAS];
  readonly categoriaActual = signal('Todas');

  readonly noticias = computed(() =>
    this.noticiasService.filtrarPorCategoria(this.categoriaActual())
  );

  seleccionar(categoria: string): void {
    this.categoriaActual.set(categoria);
  }
}
