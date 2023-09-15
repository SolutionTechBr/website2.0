import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarrinhoService {

  carrinho: any[] = [];

  constructor() {}

  adicionarProdutoAoCarrinho(produto: any) {
    // Lógica para adicionar um produto ao carrinho
    this.carrinho.push(produto);
  }

  obterProdutosDoCarrinho() {
    // Retorna a lista de produtos no carrinho
    return this.carrinho;
  }

  limparCarrinho() {
    this.carrinho = [];
  }
}
