import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

const PATRON_CORREO = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

@Component({
  selector: 'app-contacto',
  imports: [ReactiveFormsModule],
  templateUrl: './contacto.html'
})
export class ContactoComponent {
  private readonly fb = inject(FormBuilder);

  readonly enviado = signal(false);

  readonly formulario = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    correo: ['', [Validators.required, Validators.pattern(PATRON_CORREO)]],
    asunto: ['', Validators.required],
    mensaje: ['', [Validators.required, Validators.minLength(10)]]
  });

  mensajeError(campo: string, etiqueta: string): string {
    const control = this.formulario.get(campo);
    if (!control || control.valid || !control.touched) return '';

    if (control.hasError('required')) return `${etiqueta} es obligatorio.`;
    if (control.hasError('pattern')) return 'Ingresa un correo electrónico válido.';
    if (control.hasError('minlength')) {
      const { requiredLength } = control.getError('minlength');
      return `${etiqueta} debe tener al menos ${requiredLength} caracteres.`;
    }
    return '';
  }

  enviar(): void {
    this.enviado.set(false);

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.formulario.reset();
    this.enviado.set(true);
  }

  limpiar(): void {
    this.formulario.reset();
    this.enviado.set(false);
  }
}
