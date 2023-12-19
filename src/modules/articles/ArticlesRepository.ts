import { Importations, Items, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default class ArticlesRepository {
  public async createImportation(
    data: Omit<Importations, 'id' | 'updatedAt' | 'createdAt'>,
  ): Promise<Importations> {
    const importation = await prisma.importations.create({ data })

    return importation
  }

  public async getItems(): Promise<Items[]> {
    const items = await prisma.items.findMany()

    return items
  }

  public async createOrUpdateItems({
    title,
    description,
    externalId,
    importDate,
    importationId,
    link,
    mainPicture,
    publicationDate,
  }: Omit<Items, 'id' | 'updatedAt' | 'createdAt'>): Promise<Items> {
    return await prisma.items.upsert({
      where: {
        externalId,
      },
      update: {
        externalId,
        title,
        description,
        publicationDate,
        importDate,
        link,
        mainPicture,
        importationId,
      },
      create: {
        externalId,
        title,
        description,
        publicationDate,
        importDate,
        link,
        mainPicture,
        importationId,
      },
    })
  }

  public async removeAll(): Promise<void> {
    await prisma.items.deleteMany()
    await prisma.importations.deleteMany()
  }
}
