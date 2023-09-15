import { Component, OnInit  } from '@angular/core';
import { CarrinhoService } from '../../services/carrinho.service';

@Component({
  selector: 'app-finalize-order',
  templateUrl: './finalize-order.component.html',
  styleUrls: ['./finalize-order.component.css']
})
export class FinalizeOrderComponent implements OnInit {

  metodoPagamento: string = 'pix';
  metodoEntrega: string = 'retirar';
  enderecoEntrega: string = '';
  dataHora: string = '';
  numeroLoja: string = '+5519999372133';
  produtosDoCarrinho: any[] = []; // Declare a propriedade produtosDoCarrinho aqui

  constructor(private carrinhoService: CarrinhoService ) {}

  ngOnInit() {
    // Obtenha os produtos do carrinho usando o serviço
    this.produtosDoCarrinho = this.carrinhoService.obterProdutosDoCarrinho();
  }

  
  calcularPrecoTotal(): number {
    let total = 0;
    for (const item of this.produtosDoCarrinho) {
      total += item.price * item.quantidade;
    }
    return total;
  }

  concluirCompra() {
    if (this.produtosDoCarrinho.length === 0) {
      return;
    }

    const mensagem =
      'Olá, gostaria de realizar um pedido!\n\n' +
      this.produtosDoCarrinho.map(item => `${item.quantidade}x ${item.name} - R$${(item.price * item.quantidade).toFixed(2)}`).join('\n') +
      '\n-------------------------------\n' +
      `Ficando no Total: R$${this.calcularPrecoTotal().toFixed(2)}\n\n` +
      `O método de pagamento vai ser: ${this.metodoPagamento}\n` +
      `Metodo de entrega: ${this.metodoEntrega === 'retirar' ? 'Vou retirar o pedido' : 'Vou querer que entregue (' + this.enderecoEntrega + ')'}\n` +
      `Tudo isso quero para o dia: ${this.dataHora}`;

    const linkWhatsApp = `https://wa.me/${this.numeroLoja}?text=${encodeURIComponent(mensagem)}`;

    window.open(linkWhatsApp, '_blank');
  }

}
