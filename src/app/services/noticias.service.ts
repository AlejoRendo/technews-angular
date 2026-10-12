import { Injectable, inject, signal } from '@angular/core';
import { NOTICIAS_BASE } from '../data/noticias.data';
import { Noticia, NuevaNoticia } from '../models/noticia.model';
import { StorageService } from './storage.service';

const CLAVE_USUARIO = 'technews.noticias.usuario';
const CLAVE_ELIMINADAS = 'technews.noticias.eliminadas';

@Injectable({ providedIn: 'root' })
export class NoticiasService {
  private readonly storage = inject(StorageService);

  private readonly catalogo = signal<Noticia[]>(this.calcular());

  readonly noticias = this.catalogo.asReadonly();

  // El catálogo base manda; el almacenamiento solo guarda los cambios del usuario.
  private calcular(): Noticia[] {
    const eliminadas = this.storage.leerLista<string>(CLAVE_ELIMINADAS);
    const base = NOTICIAS_BASE.filter(({ id }) => !eliminadas.includes(id));
    return [...base, ...this.storage.leerLista<Noticia>(CLAVE_USUARIO)];
  }

  private refrescar(): void {
    this.catalogo.set(this.calcular());
  }

  listar(): Noticia[] {
    return this.catalogo();
  }

  obtenerPorId(id: string): Noticia | null {
    return this.catalogo().find((noticia) => noticia.id === id) ?? null;
  }

  destacadas(): Noticia[] {
    return this.catalogo().filter(({ destacada }) => destacada);
  }

  filtrarPorCategoria(categoria: string): Noticia[] {
    return !categoria || categoria === 'Todas'
      ? this.catalogo()
      : this.catalogo().filter((noticia) => noticia.categoria === categoria);
  }

  crear({ titulo, categoria, resumen, imagen = '' }: NuevaNoticia): Noticia {
    const nueva: Noticia = {
      id: `u-${Date.now()}`,
      titulo,
      categoria,
      resumen,
      contenido: [resumen],
      imagen,
      autor: 'Redacción TechNews',
      fecha: new Date().toISOString().slice(0, 10),
      destacada: false,
      origen: 'usuario'
    };

    const usuario = this.storage.leerLista<Noticia>(CLAVE_USUARIO);
    this.storage.escribir(CLAVE_USUARIO, [...usuario, nueva]);
    this.refrescar();

    return nueva;
  }

  eliminar(id: string): boolean {
    const noticia = this.obtenerPorId(id);
    if (!noticia) return false;

    if (noticia.origen === 'usuario') {
      const restantes = this.storage
        .leerLista<Noticia>(CLAVE_USUARIO)
        .filter((item) => item.id !== id);
      this.storage.escribir(CLAVE_USUARIO, restantes);
    } else {
      const eliminadas = this.storage.leerLista<string>(CLAVE_ELIMINADAS);
      this.storage.escribir(CLAVE_ELIMINADAS, [...new Set([...eliminadas, id])]);
    }

    this.refrescar();
    return true;
  }
}
