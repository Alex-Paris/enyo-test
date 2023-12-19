import { Request, Response } from 'express'
import { parseStringPromise } from 'xml2js'

import AppError from '../../shared/errors/AppError'
import ArticlesRepository from './ArticlesRepository'

interface XmlItem {
  title: string
  pubDate: string
  description: string
  guid: {
    _: string
  }
  link: string
  'media:content': {
    $: {
      url: string
    }
  }
}

export default class ArticlesController {
  public async import(_: Request, resp: Response): Promise<Response> {
    const response = await fetch('https://www.lemonde.fr/rss/une.xml')

    // Verifying if our response is ok
    if (!response.ok) {
      throw new AppError(
        `HTTP error! Status: ${response.statusText}`,
        response.status,
      )
    }

    // Parsing xml file to JSON
    const xmlData = await response.text()
    const parsedData = await parseStringPromise(xmlData, {
      explicitArray: false,
    })

    // Importation data
    const importationDate = new Date()
    const rawContent = JSON.stringify(parsedData)

    // Inserting importation on db
    const repo = new ArticlesRepository()
    const importationId = await repo.createImportation({
      importationDate,
      rawContent,
    })

    // Items data
    const xmlItems: XmlItem[] = parsedData.rss.channel.item

    // Inserting/updating Items on db
    xmlItems.forEach(async (item) => {
      await repo.createOrUpdateItems({
        title: item.title,
        externalId: item.guid._,
        description: item.description,
        publicationDate: new Date(item.pubDate),
        importDate: new Date(),
        link: item.link,
        mainPicture: item['media:content'].$.url,
        importationId,
      })
    })

    return resp.json({})
  }
}
