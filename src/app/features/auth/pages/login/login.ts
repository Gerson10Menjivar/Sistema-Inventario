import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth'; 
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  mensajeError = '';

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  // --- GETTERS para las validaciones del HTML ---
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  ingresar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.authService.login(this.loginForm.value).subscribe({
      next: (resp: any) => {
        // 1. Guardamos el token para las peticiones
        this.authService.guardarToken(resp.token); 
        
        // 2. Guardamos el rol (Admin/User)
        if (resp.rol) {
          localStorage.setItem('rol', resp.rol);
        }

        // 3. CLAVE: Guardamos el usuario para que Gestión de Stock tenga el ID
        // Intentamos capturar 'usuario' o 'user' según lo mande tu backend
        const infoUsuario = resp.usuario || resp.user || resp.data;
        if (infoUsuario) {
          localStorage.setItem('user', JSON.stringify(infoUsuario));
        }

        console.log('Login exitoso, usuario guardado:', infoUsuario);
        this.router.navigate(['/dashboard']); 
      },
      error: (err) => {
        console.error('Error en login:', err);
        this.mensajeError = 'Correo o contraseña incorrectos'; 
      }
    });
  }
}