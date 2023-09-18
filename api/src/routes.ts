import { Router } from "express"
import { ProductPageController } from "./controllers/ProductPageController"
import { ClientPageController } from "./controllers/ClientPageController"
import { UserPageController } from "./controllers/UserPageController"
import { ImagePageController } from "./controllers/ImagePageController"
import configureMulter from "./config/multer"

const routes = Router()
const upload = configureMulter(); // Obtenha o middleware Multer configurado



//listar todos os usuario
routes.get('/user', new UserPageController().listUser)


//Responsavel por criar os produtos 
routes.post('/products', new ProductPageController().CreateProduct)
// Rota para excluir um produto pelo ID 
routes.delete('/products/:id', new ProductPageController().deleteProduct);
//Listar todos os produtos
routes.get('/products/:idUser/listProduct', new ProductPageController().listProducts)


//Responsavel por adicionar  dados dos clientes 
routes.post('/client', new ClientPageController().CreateClient)
//Listar todos os clientes
routes.get('/client', new ClientPageController().listClients)


//rota responsavel por Salvar a imagem
routes.post('/image', upload.single('file'), new ImagePageController().UploadImage)
//rota responsavel por Deletar a imagem
routes.delete('/image/:id', upload.single('file'), new ImagePageController().deleteImage)
//rota responsavel por Listar as imagens
routes.get('/image', upload.single('file'), new ImagePageController().listImage)


export default routes