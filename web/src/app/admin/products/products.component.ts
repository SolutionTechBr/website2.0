import { Component, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  allProducts: any[] = []; // Array para armazenar todos os produtos
  products: any[] = [];
  title: string = '';
  newProduct: any = {
    imageUrl: '',
    category: '',
    name: '',
    content: '',
    price: '',
    user_id: '1',
  };
  modalRef?: BsModalRef;
  
  constructor(
    private modalService: BsModalService,
    private ProductService: ProductService // Injete o serviço aqui
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

 
  loadProducts() {
    // Chame o serviço para carregar todos os produtos
    this.ProductService.getAllProducts().subscribe((products) => {
      this.allProducts = products as any[]; // Forçar a tipagem para um array
      // Inicialmente, exiba todos os produtos
      this.allProducts;
    });
  }
  
  addProduct() {
    if (!this.newProduct.name) {
      alert('Por favor, insira o nome do produto.');
      return;
    }

    this.ProductService.addProducts(this.newProduct).subscribe(
      (response) => {
        console.log('Produto adicionado com sucesso:', response);
        this.newProduct.name = ''; // Limpar o campo de entrada
        this.loadProducts(); // Recarregar a lista de produtos
      },
      (error) => {
        console.error('Erro ao adicionar produto:', error);
      }
    );
  }

  deleteProduct(productId: number) {
    this.ProductService.deleteProduct(productId).subscribe(
      () => {
        console.log('Produto excluído com sucesso.');
        this.loadProducts(); // Recarregar a lista de produtos após a exclusão
      },
      (error) => {
        console.error('Erro ao excluir produto:', error);
      }
    );
  }

  openModal(buttonNumber: number) {
    this.title = `Comprar produtos`;
    this.modalRef = this.modalService.show(this.modalTemplate);
  }

  @ViewChild('modalTemplate') modalTemplate!: string;

}
