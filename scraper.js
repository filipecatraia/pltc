import axios from './lib/axios.js'
import * as cheerio from 'cheerio'
import parseMEP from './lib/parseMEP.js'
import config from './lib/config.js'

export const scrapeEULegislators = async () => {
  const result = []

  /**
   * I've added a cache mechanism in a couple of minutes, but really it's
   * only useful for long-running processes, otherwise it repopulates the
   * cache element on every re-run
   */
  const requestBody = await axios.get(config.scraper.MEMBER_PAGE)

  /**
   * This should be abstracted away, so it can load any page.
   * It's hard-coded for the current page as it is.
   */
  const $ = cheerio.load(requestBody.data)
  const $list = $(config.scraper.MEMBER_LIST)

  /**
   * This blows up quite easily. Have a member that doesn't parse,
   * and you're in trouble. If we really must parse HTML, we should
   * use something like `ajv` to ensure a consistent format — and
   * more unit tests around this. What happens if the new data is
   * conflicting with the existing one?
   *
   * We could also push these into a worker queue, so that the main
   * Node process isn't hung parsing a very large page. A different,
   * smaller service could fetch and parse websites, or at least be
   * used just to validate website crawling data against expectations.
   *
   * I also see an XML version of the page, which would be far more
   * reliable for continued parsing.
   */
  for (let member of $list) {
    result.push(parseMEP(member))
  }

  return result
}

