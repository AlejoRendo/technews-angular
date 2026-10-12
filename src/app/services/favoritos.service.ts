import { Injectable, inject, signal } from '@angular/core';
import { Noticia } from '../models/noticia.model';
import { NoticiasService } from './noticias.service';
import { StorageService } from './storage.service';

const CLAVE = 'technews.favoritos';

@Injectable({ providedIn: 'root' })
export class FavoritosService {
  private readonly storage = inject(StorageService);
  private readonly noticiasService = inject(NoticiasService);

  private readonly ids = signal<string[]>(this.storage.leerLista<string>(CLAVE));

  readonly favoritos = this.ids.asReadonly();

  private guardar(ids: string[]): void {
    this.storage.escribir(CLAVE, ids);
    this.ids.set(ids);
  }

  listarIds(): string[] {
    return this.ids();
  }

  esFavorito(id: string): boolean {
    return this.ids().includes(id);
  }

  alternar(id: string): boolean {
    const actuales = this.ids();
    const agregado = !actuales.includes(id);

    this.guardar(agregado ? [...actuales, id] : actuales.filter((guardado) => guardado !== id));
    return agregado;
  }

  quitar(id: string): void {
    this.guardar(this.ids().filter((guardado) => guardado !== id));
  }

  // Descarta los identificadores cuya noticia ya no existe para evitar favoritos huérfanos.
  listarNoticias(): Noticia[] {
    return this.ids()
      .map((id) => this.noticiasService.obtenerPorId(id))
      .filter((noticia): noticia is Noticia => noticia !== null);
  }

  contar(): number {
    return this.listarNoticias().length;
  }
}
