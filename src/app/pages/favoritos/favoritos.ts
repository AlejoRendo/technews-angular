import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FavoritosService } from '../../services/favoritos.service';
import { EstadoVacioComponent } from '../../shared/estado-vacio/estado-vacio';

@Component({
  selector: 'app-favoritos',
  imports: [RouterLink, EstadoVacioComponent],
  templateUrl: './favoritos.html'
})
export class FavoritosComponent {
  private readonly favoritosService = inject(FavoritosService);

  readonly noticias = computed(() => {
    this.favoritosService.favoritos();
    return this.favoritosService.listarNoticias();
  });

  readonly resumen = computed(() => {
    const total = this.noticias().length;
    if (!total) return 'Aún no has guardado noticias.';
    return total === 1
      ? 'Tienes 1 noticia guardada en este navegador.'
      : `Tienes ${total} noticias guardadas en este navegador.`;
  });

  quitar(id: string): void {
    this.favoritosService.quitar(id);
  }
}
