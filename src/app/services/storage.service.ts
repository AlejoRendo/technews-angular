import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class StorageService {
  // El acceso puede fallar en modo privado o con el almacenamiento deshabilitado.
  leer<T>(clave: string, porDefecto: T): T {
    try {
      const crudo = localStorage.getItem(clave);
      return crudo === null ? porDefecto : (JSON.parse(crudo) as T);
    } catch {
      return porDefecto;
    }
  }

  escribir<T>(clave: string, valor: T): boolean {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
      return true;
    } catch {
      return false;
    }
  }

  leerLista<T>(clave: string): T[] {
    const valor = this.leer<T[]>(clave, []);
    return Array.isArray(valor) ? valor : [];
  }
}
