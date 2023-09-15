import { Router } from "express"
import { ProductPageController } from "./controllers/ProductPageController"
import { ClientPageController } from "./controllers/ClientPageController"
import { UserPageController } from "./controllers/UserPageController"

const routes = Router()

//listar todos os usuario
routes.get('/user', new UserPageController().listUser)

//Responsavel por criar os produtos 
routes.post('/products', new ProductPageController().CreateProduct)
// Rota para excluir um produto pelo ID
routes.delete('/products/:id', new ProductPageController().deleteProduct);
//Listar todos os produtos
routes.get('/products/:idUser/listProduct', new ProductPageController().listProducts)


//Responsavel por adicionar dados dos clientes 
routes.post('/client', new ClientPageController().CreateClient)
//Listar todos os clientes
routes.get('/client', new ClientPageController().listClients)

//Responsavel por listar tudo que os clientes cadastrados compraram
//routes.get('/client', new ClientPageController().listPurchase)


export default routes