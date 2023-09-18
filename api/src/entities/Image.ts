import { Column, Entity,  JoinColumn,  ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./Product";

@Entity('image')
export class image {

    //Chave estrangeira
    @PrimaryGeneratedColumn()
    id: number
    // Adicione um campo para o serviço desejado
    @Column({ type: 'text' })
    name: string
    //Declarando string para receber a URL
    @Column({ type: 'text' })
    url: string 
    //Declara que são varias imagens para um produto
    @ManyToOne(() => Product, product => product.images)
    //Passo qual coluna na tabela de user vou estar referenciando  
    @JoinColumn({name: "product_id"})
    // Defina a relação com Product
    product: Product; 
    
}
  

