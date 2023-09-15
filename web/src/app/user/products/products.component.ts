import { Component, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from '../../services/product.service';
import { CarrinhoService } from '../../services/carrinho.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  // Defina suas categorias aqui
  categories: string[] = ['bolo', 'cone_trufado', 'bolo_pote'];
  filteredProducts: any[] = []; // Array para armazenar produtos filtrados
  allProducts: any[] = []; // Array para armazenar todos os produtos
  selectedCategory: string = '*'; // Inicialmente, define como '*' (todos)
  precoTotal: number = 0;
  itenTotal: number = 0;
  cancelarClicado: boolean = false;

  
  // Carrinho de compras
  carrinho: any[] = [];
  cart: any[] = [];
  modalRef?: BsModalRef;
  title: any;
  successMessage: string = ''; // Mensagem de sucesso
  errorMessage: string = '';   // Mensagem de erro
  
  Product: any = {
    imageUrl: '',
    category: '',
    name: '',
    content: '',
    price: '',
  };

  constructor(
    private modalService: BsModalService,
    private carrinhoService: CarrinhoService,
    private router: Router,
    private ProductService: ProductService // Injete o serviço aqui
  ) {
    this.carrinho = []; // Inicialize a variável carrinho aqui
  }  


  ngOnInit(): void {
    // Carregue todos os produtos ao inicializar o componente
    this.loadProducts();
  }

  filterProducts(category: string) {
    // Filtrar produtos com base na categoria selecionada
    this.filteredProducts = this.allProducts.filter((product) => product.category === category);
    this.selectedCategory = category;
    if (category === '*') {
      // Se a categoria for '*' (Todos), não aplique nenhum filtro
      this.filteredProducts = this.allProducts;
    } else {
      // Caso contrário, filtre os produtos com base na categoria selecionada
      this.filteredProducts = this.allProducts.filter(product => product.category === category);
    }
  }

  loadProducts() {
    // Chame o serviço para carregar todos os produtos
    this.ProductService.getAllProducts().subscribe((products) => {
      this.allProducts = products as any[]; // Forçar a tipagem para um array
      // Inicialmente, exiba todos os produtos
      this.filteredProducts = this.allProducts;
    });
  }
  

  openModal(buttonNumber: number) {
    this.title = `Comprar produtos`;
    this.cancelarClicado = false; // Reinicie a variável para false
    this.modalRef = this.modalService.show(this.modalTemplate);
  }
  

  //responsavel pelo carrinho

  adicionarAoCarrinho(product: any) {
    const itemNoCarrinho = this.getCarrinhoItem(product);
  
    if (itemNoCarrinho) {
      // Se o produto já estiver no carrinho, apenas atualize a quantidade
      itemNoCarrinho.quantidade++;
    } else {
      // Se o produto não estiver no carrinho, crie um novo item no carrinho
      const newItem = { ...product, quantidade: 1 };
      this.carrinho.push(newItem);
    }
  
    // Atualizar o preço total do carrinho
    this.itenTotal = this.calcularItenTotal();
    this.precoTotal = this.calcularPrecoTotal();
    this.carrinhoService.adicionarProdutoAoCarrinho(product);
  }
  
  removerDoCarrinho(item: any) {
    if (item.quantidade === 1) {
      // Se a quantidade for 1, removemos completamente o item do carrinho
      const index = this.carrinho.findIndex((i) => i.id === item.id);
      if (index !== -1) {
        this.carrinho.splice(index, 1);
      }
    } else {
      // Se a quantidade for maior que 1, diminuímos a quantidade
      item.quantidade--;
    }
  
    // Atualizar o preço total do carrinho
    this.itenTotal = this.calcularItenTotal();
    this.precoTotal = this.calcularPrecoTotal();
  }

  limparCarrinho() {
    this.carrinho = [];
  }
  
  calcularItenTotal(): number {
    let total = 0;
    for (const item of this.carrinho) {
      total += item.quantidade;
    }
    return total;
  }


  calcularPrecoTotal(): number {
    let total = 0;
    for (const item of this.carrinho) {
      total += item.price * item.quantidade;
    }
    return total;
  }

  getCarrinhoItem(product: any) {
    return this.carrinho.find((item) => item.id === product.id);
  }

  estaNoCarrinho(product: any): boolean {
    return this.carrinho.some((item) => item.id === product.id);
  }


  finalizarCompra() {
     // Feche o modal antes de navegar
    this.modalRef?.hide();
    // Navegue para a página de revisão de pedidos
    this.router.navigate(['/pedido']);
  }
  
  
  @ViewChild('modalTemplate') modalTemplate!: string;
}

