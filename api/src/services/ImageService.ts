import { AppDataSource } from "../data-source";
import { image } from "../entities/Image";

export const ImageRepository = AppDataSource.getRepository(image)

