/**
 * TypeScript type definitions for the application
 */

export interface User {
  userid?: number;
  nombre_completo: string;
  rut: string;
  nombre_usuario: string;
  contrasena: string;
  correo: string;
  rol?: string;
  token?: string;
}

export interface Product {
  idproducto?: number;
  nombreproducto: string;
  precioproducto: number;
  categoria?: string;
  imagen_url?: string;
}

export interface CartItem {
  idcarrito?: number;
  userid: number;
  idproducto: number;
  cantidad: number;
  product?: Product;
}

export interface Cart {
  idcarrito: number;
  usuario: User;
  producto: Product;
  cantidad: number;
}

export type Page = 'home' | 'products' | 'register' | 'login' | 'cart' | 'tech-support' | 'community' | 'profile' | 'anime-blog' | 'esports-blog';
