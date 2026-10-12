export type Categoria = 'Tecnología' | 'Educación' | 'Turismo' | 'Comercial';

export type OrigenNoticia = 'base' | 'usuario';

export interface Noticia {
  id: string;
  titulo: string;
  categoria: Categoria;
  resumen: string;
  contenido: string[];
  imagen: string;
  autor: string;
  fecha: string;
  destacada: boolean;
  origen: OrigenNoticia;
}

export interface NuevaNoticia {
  titulo: string;
  categoria: Categoria;
  resumen: string;
  imagen?: string;
}
