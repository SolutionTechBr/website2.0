import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:3000'; // Substitua pela URL do seu servidor back-end

  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${this.apiUrl}/products/1/listProduct`)
  }

  deleteProduct(productId: number) {
    return this.http.delete(`${this.apiUrl}/products/${productId}`);
  }

  addProduct(formData: FormData) {
    // Crie um cabeçalho personalizado para o FormData
    const headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data'); // Informe o tipo de conteúdo
  
    // Faça a solicitação POST usando o FormData e o cabeçalho personalizado
    return this.http.post(`${this.apiUrl}/products`, formData, { headers });
  }


  // Adicione outros métodos para interagir com seu servidor conforme necessário
}

export class CarrinhoService {
  carrinho: any[] = [];

  constructor() { }
}