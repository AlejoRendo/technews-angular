import { Component, computed, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Noticia } from '../../models/noticia.model';
import { FavoritosService } from '../../services/favoritos.service';
import { NoticiasService } from '../../services/noticias.service';
import { EstadoVacioComponent } from '../../shared/estado-vacio/estado-vacio';
import { FechaPipe } from '../../shared/fecha.pipe';

@Component({
  selector: 'app-detalle',
  imports: [RouterLink, FechaPipe, EstadoVacioComponent],
  templateUrl: './detalle.html'
})
export class DetalleComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly noticiasService = inject(NoticiasService);
  private readonly favoritosService = inject(FavoritosService);
  private readonly title = inject(Title);

  readonly noticia = signal<Noticia | null>(null);

  readonly textoBoton = computed(() => {
    const actual = this.noticia();
    if (!actual) return '';
    return this.favoritosService.favoritos().includes(actual.id)
      ? '♥ Quitar de favoritos'
      : '♥ Agregar a favoritos';
  });

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const encontrada = this.noticiasService.obtenerPorId(params.get('id') ?? '');
      this.noticia.set(encontrada);
      this.title.setTitle(encontrada ? `${encontrada.titulo} | TechNews` : 'TechNews');
    });
  }

  alternarFavorito(id: string): void {
    this.favoritosService.alternar(id);
  }
}
