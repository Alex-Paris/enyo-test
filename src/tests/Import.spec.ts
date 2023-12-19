// import { PrismaClient } from '@prisma/client'
// import { execSync } from 'child_process'

import ArticlesRepository from '../modules/articles/ArticlesRepository'

// const prisma = new PrismaClient()
const repo = new ArticlesRepository()
const newImportation = {
  importationDate: new Date('2023-12-19T04:51:17.689Z'),
  rawContent: JSON.stringify({ title: 'fake XML' }),
}
const newItem = {
  importationId: -1,
  title:
    'En direct, guerre Israël-Hamas : les Etats-Unis annoncent la création d’une coalition internationale pour lutter contre « les attaques irresponsables » en mer Rouge',
  externalId:
    'https://www.lemonde.fr/international/live/2023/12/18/en-direct-guerre-israel-hamas-le-vote-du-conseil-de-securite-de-l-onu-sur-la-situation-a-gaza-reporte-a-mardi_6205941_3210.html',
  description:
    'Selon le secrétaire d’Etat à la défense américain, Lloyd Austin, l’« opération gardien de la prospérité » entend répondre aux actions de piraterie menées, depuis le début du conflit au Proche-Orient, par les rebelles houthistes du Yémen. Elle comprend dix pays dont la France.',
  publicationDate: new Date('2023-12-18T20:08:11.000Z'),
  importDate: new Date(),
  link: 'https://www.lemonde.fr/international/live/2023/12/18/en-direct-guerre-israel-hamas-le-vote-du-conseil-de-securite-de-l-onu-sur-la-situation-a-gaza-reporte-a-mardi_6205941_3210.html',
  mainPicture:
    'https://img.lemde.fr/2023/12/18/192/0/6908/3454/644/322/60/0/19e8307_de7f2253c40a404f9543359c049ea7ca-2-d737de3914874459a22417c3d83c5394.jpg',
}

describe('Importation of XML', () => {
  // beforeAll(() => {
  //   try {
  //     execSync('npx prisma migrate dev')
  //   } catch (error) {
  //     console.error('Error running migrations:', error)
  //     process.exit(1)
  //   }
  // })

  beforeEach(async () => {
    await repo.removeAll()
  })

  // afterAll(() => {
  //   try {
  //     execSync('npx prisma migrate reset')
  //   } catch (error) {
  //     console.error('Error running migrations:', error)
  //     process.exit(1)
  //   }
  // })

  it('should be able to import the XML', async () => {
    const response = await repo.createImportation(newImportation)

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('importationDate')
    expect(response).toHaveProperty('rawContent')
    expect(response).toHaveProperty('updatedAt')
    expect(response).toHaveProperty('createdAt')
    expect(response.importationDate).toStrictEqual(
      newImportation.importationDate,
    )
  })

  it('should be able to import articles', async () => {
    const { id: importationId } = await repo.createImportation(newImportation)

    newItem.importationId = importationId

    const response = await repo.createOrUpdateItems(newItem)

    expect(response).toHaveProperty('id')
    expect(response).toHaveProperty('externalId')
    expect(response).toHaveProperty('importDate')
    expect(response).toHaveProperty('title')
    expect(response).toHaveProperty('description')
    expect(response).toHaveProperty('publicationDate')
    expect(response).toHaveProperty('link')
    expect(response).toHaveProperty('mainPicture')
    expect(response).toHaveProperty('importationId')
    expect(response).toHaveProperty('updatedAt')
    expect(response).toHaveProperty('createdAt')
    expect(response.title).toBe(newItem.title)
    expect(response.description).toBe(newItem.description)
    expect(response.externalId).toBe(newItem.externalId)
    expect(response.importDate).toStrictEqual(newItem.importDate)
    expect(response.importationId).toBe(newItem.importationId)
    expect(response.link).toBe(newItem.link)
    expect(response.mainPicture).toBe(newItem.mainPicture)
    expect(response.publicationDate).toStrictEqual(newItem.publicationDate)
  })

  it('should be able to retrieve articles', async () => {
    const { id: importationId } = await repo.createImportation(newImportation)

    newItem.importationId = importationId

    await repo.createOrUpdateItems(newItem)

    const response = await repo.getItems()

    expect(response[0]).toHaveProperty('id')
    expect(response[0]).toHaveProperty('externalId')
    expect(response[0]).toHaveProperty('importDate')
    expect(response[0]).toHaveProperty('title')
    expect(response[0]).toHaveProperty('description')
    expect(response[0]).toHaveProperty('publicationDate')
    expect(response[0]).toHaveProperty('link')
    expect(response[0]).toHaveProperty('mainPicture')
    expect(response[0]).toHaveProperty('importationId')
    expect(response[0]).toHaveProperty('updatedAt')
    expect(response[0]).toHaveProperty('createdAt')
    expect(response[0].title).toBe(newItem.title)
    expect(response[0].description).toBe(newItem.description)
    expect(response[0].externalId).toBe(newItem.externalId)
    expect(response[0].importDate).toStrictEqual(newItem.importDate)
    expect(response[0].importationId).toBe(newItem.importationId)
    expect(response[0].link).toBe(newItem.link)
    expect(response[0].mainPicture).toBe(newItem.mainPicture)
    expect(response[0].publicationDate).toStrictEqual(newItem.publicationDate)
  })

  it('should not be able to duplicate articles', async () => {
    const { id: importationId } = await repo.createImportation(newImportation)

    newItem.importationId = importationId
    await repo.createOrUpdateItems(newItem)
    await repo.createOrUpdateItems(newItem)

    const response = await repo.getItems()

    expect(response.length).toBe(1)
  })

  it('should be able to update article if it already exists', async () => {
    const { id: importationId } = await repo.createImportation(newImportation)
    newItem.importationId = importationId
    await repo.createOrUpdateItems(newItem)

    const duplicatedImportation = {
      ...newImportation,
      importationDate: new Date(),
    }
    const { id: importationId2 } = await repo.createImportation(
      duplicatedImportation,
    )
    const duplicatedItem = {
      ...newItem,
      importationId: importationId2,
      title: 'Fake title',
    }
    await repo.createOrUpdateItems(duplicatedItem)

    const response = await repo.getItems()

    expect(response.length).toBe(1)
    expect(response[0].title).toBe(duplicatedItem.title)
    expect(response[0].importationId).toBe(duplicatedItem.importationId)
    expect(response[0].externalId).toBe(newItem.externalId)
    expect(response[0].description).toBe(newItem.description)
    expect(response[0].importDate).toStrictEqual(newItem.importDate)
    expect(response[0].link).toBe(newItem.link)
    expect(response[0].mainPicture).toBe(newItem.mainPicture)
    expect(response[0].publicationDate).toStrictEqual(newItem.publicationDate)
  })

  // await expect(createUser.execute(newUser)).rejects.toBeInstanceOf(
  //   CreateUserError.EmailAlreadyUsed,
  // )
})
