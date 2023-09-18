import { Request, Response } from "express"
import { ImageRepository } from "../services/ImageService"

export class ImagePageController {

    async UploadImage(req: Request, res: Response) {

        const { name } = req.body

        const file = req.file

        if (!name) {
          return res.status(400).json({ message: 'Informe o nome da imagem!'})
        }
        
        try {
            const newImage = ImageRepository.create({
            name,
            url: file?.path,
            })

            await ImageRepository.save(newImage)

            return res.status(201).json(newImage)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'Error ao salvar imagem' })
        }

    }

    async deleteImage(req: Request, res: Response) {
        const { id } = req.params;

        
        // Certifique-se de que o id seja um número
        const productId = parseInt(id);
      
        try {
          // Verifique se o produto existe
          const product = await ImageRepository.findOneBy({ id: Number(productId) });

          if (!product) {
            return res.status(404).json({ message: 'Produto não encontrado' });
          }
      
          // Remova o produto do banco de dados
          await ImageRepository.remove(product);
      
          return res.status(200).json({ message: 'Imagem salva com sucesso' });
        } catch (error) {
          console.error(error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
      
      
    
   //async listImage(req: Request, res: Response) {
   //    try {
   //     const products = await ImageRepository.find(); // Isso irá buscar todos os produtos no banco de dados
     
   //      return res.json(images);
   //   } catch (error) {
   //      console.log(error);
   //      return res.status(500).json({ message: 'Internal Server Error' });
   //     }
   // }
      

}


