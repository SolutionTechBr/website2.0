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
    image: '',
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
  
  
  decodeImageBytesToBase64(dados: string): string {
    return `data:image/png;base64,${dados}`;
  }
  

  addProduct() {
    // Crie um novo FormData
    const formData = new FormData();
    formData.append('name', this.newProduct.name);
    formData.append('category', this.newProduct.category);
    formData.append('description', this.newProduct.description);
    formData.append('price', this.newProduct.price.toString()); // Certifique-se de converter o preço para string
  
    // Adicione a imagem ao FormData
    formData.append('image', this.newProduct.dados);
  
    this.ProductService.addProduct(formData).subscribe(
      () => {
        console.log('Produto adicionado com sucesso.');
        this.successMessage = 'Produto cadastrado com sucesso!';
        this.errorMessage = ''; // Limpar a mensagem de erro, se houver
        this.newProduct.name = ''; // Limpar o campo de entrada
        this.loadProducts(); // Recarregar a lista de produtos
      },
      (error) => {
        console.error('Erro ao adicionar produto:', error);
        this.successMessage = ''; // Limpar a mensagem de sucesso, se houver
        this.errorMessage = 'Falha ao cadastrar o produto.';
      }
    );
  }
  
  
  deleteProduct(productId: number) {
    this.productToDeleteId = productId;
    this.showDeleteConfirmationModal = true;
  }

  confirmDelete() {
    if (this.productToDeleteId) {
      this.ProductService.deleteProduct(this.productToDeleteId).subscribe(
        () => {
          console.log('Produto excluído com sucesso.');
          this.loadProducts(); // Recarregar a lista de produtos após a exclusão
          this.showDeleteConfirmationModal = false; // Fechar o modal após a exclusão
        },
        (error) => {
          console.error('Erro ao excluir produto:', error);
          this.showDeleteConfirmationModal = false; // Fechar o modal em caso de erro
        }
      );
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
