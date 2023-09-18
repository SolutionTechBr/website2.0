import { Request, Response } from "express"
import { ImageRepository } from "../services/ImageService"
import fs from "fs"

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
      const imageId = parseInt(id);
    
      try {
        // Verifique se o produto existe
        const image = await ImageRepository.findOneBy({ id: Number(imageId) });

        if (!image) {
          return res.status(404).json({ message: 'Imagem não encontrado' });
        }

        fs.unlinkSync(image.url)
    
        // Remova o produto do banco de dados
        await ImageRepository.remove(image);
    
        return res.status(200).json({ message: 'Imagem deletada com sucesso' });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
    }
      
      
    
   async listImage(req: Request, res: Response) {
      try {
       const images = await ImageRepository.find(); // Isso irá buscar todos os produtos no banco de dados
     
        return res.json(images);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
  }
      

}


