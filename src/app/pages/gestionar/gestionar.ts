import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CATEGORIAS } from '../../data/noticias.data';
import { Categoria } from '../../models/noticia.model';
import { NoticiasService } from '../../services/noticias.service';
import { FechaPipe } from '../../shared/fecha.pipe';

@Component({
  selector: 'app-gestionar',
  imports: [ReactiveFormsModule, FechaPipe],
  templateUrl: './gestionar.html'
})
export class GestionarComponent {
  private readonly fb = inject(FormBuilder);
  private readonly noticiasService = inject(NoticiasService);

  readonly categorias = CATEGORIAS;
  readonly creada = signal(false);

  readonly noticias = computed(() => this.noticiasService.noticias());

  readonly contador = computed(() => {
    const total = this.noticias().length;
    return total === 1 ? '1 registro' : `${total} registros`;
  });

  readonly formulario = this.fb.nonNullable.group({
    titulo: ['', Validators.required],
    categoria: ['', Validators.required],
    imagen: [''],
    resumen: ['', [Validators.required, Validators.minLength(10)]]
  });

  mensajeError(campo: string, etiqueta: string): string {
    const control = this.formulario.get(campo);
    if (!control || control.valid || !control.touched) return '';

    if (control.hasError('required')) return `${etiqueta} es obligatorio.`;
    if (control.hasError('minlength')) {
      const { requiredLength } = control.getError('minlength');
      return `${etiqueta} debe tener al menos ${requiredLength} caracteres.`;
    }
    return '';
  }

  guardar(): void {
    this.creada.set(false);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const { titulo, categoria, resumen, imagen } = this.formulario.getRawValue();
    this.noticiasService.crear({
      titulo: titulo.trim(),
      categoria: categoria as Categoria,
      resumen: resumen.trim(),
      imagen: imagen.trim()
    });

    this.formulario.reset();
    this.creada.set(true);
  }

  cancelar(): void {
    this.formulario.reset();
    this.creada.set(false);
  }

  eliminar(id: string): void {
    const noticia = this.noticiasService.obtenerPorId(id);
    if (!noticia) return;

    if (confirm(`¿Eliminar la noticia "${noticia.titulo}"?`)) {
      this.noticiasService.eliminar(id);
      this.creada.set(false);
    }
  }
}
