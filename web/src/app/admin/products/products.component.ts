import { Component, ViewChild } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  
  filteredProducts: any[] = []; // Array para armazenar produtos filtrados
  selectedCategory: string = '*'; // Inicialmente, define como '*' (todos)
  successMessage: string = '';
  errorMessage: string = '';
  productToDeleteId: number | undefined;
  showDeleteConfirmationModal = false;


  allProducts: any[] = []; // Array para armazenar todos os produtos
  products: any[] = [];
  title: string = '';
  newProduct: any = {
    category: '',
    name: '',
    content: '',
    price: '',
    file: '',
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
  
  addProduct() {
    // Certifique-se de que this.newProduct contém as informações do produto
    this.ProductService.addProducts(this.newProduct).subscribe(
      () => {
        console.log('Produto adicionado com sucesso.');
        this.successMessage = 'Produto cadastrado com sucesso!';
        this.errorMessage = ''; // Limpar a mensagem de erro, se houver
        this.newProduct = {}; // Limpar o objeto newProduct
        this.loadProducts(); // Recarregar a lista de produtos
      },
      (error) => {
        console.error('Erro ao adicionar produto:', error);
        this.successMessage = ''; // Limpar a mensagem de sucesso, se houver
        this.errorMessage = 'Falha ao cadastrar o produto.';
      }
    );
  }
  
  
  modalDeleteProduct(productId: number) {
  this.productToDeleteId = productId;
  this.showDeleteConfirmationModal = false;
  }

  deleteProduct(productId: number) {
    this.ProductService.deleteProducts(productId).subscribe(
      () => {
        console.log('Produto excluído com sucesso.');
        this.loadProducts(); // Recarregar a lista de produtos após a exclusão
        this.showDeleteConfirmationModal = false; // Fechar o modal após a exclusão
        this.successMessage = 'Produto excluído com sucesso!';
        this.errorMessage = ''; // Limpar a mensagem de erro, se houver
      },
      (error) => {
        console.error('Erro ao excluir produto:', error);
        this.showDeleteConfirmationModal = false; // Fechar o modal em caso de erro
        this.successMessage = ''; // Limpar a mensagem de sucesso, se houver
        this.errorMessage = 'Falha ao excluir o produto.';
      }
    );
    this.productToDeleteId = productId;
    this.showDeleteConfirmationModal = true;
  }

  updateImagePreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.newProduct.file = e.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  
  cancelDelete() {
    this.productToDeleteId = undefined; // Limpar o ID do produto a ser excluído
    this.showDeleteConfirmationModal = false; // Fechar o modal
  }
  

  openModal(buttonNumber: number) {
    this.title = `Comprar produtos`;
    this.modalRef = this.modalService.show(this.modalTemplate);
  }

  openModal2(buttonNumber: number) {
    this.title = `Excluir Produto?`;
    this.modalRef = this.modalService.show(this.modalTemplate2);
  }

  closeModal() {
    this.modalRef?.hide();
  }
  

  @ViewChild('modalTemplate') modalTemplate!: string;
  @ViewChild('modalTemplate2') modalTemplate2!: string;

}
