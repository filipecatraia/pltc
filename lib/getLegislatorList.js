import config from './config.js'
import * as cheerio from 'cheerio'
import axios from './axios.js'

export default async function getLegislatorList() {
  /**
   * I've added a cache mechanism in a couple of minutes, but really it's
   * only useful for long-running processes, otherwise it repopulates the
   * cache element on every re-run. We also need some kind of error handling
   * for failed requests.
   */
  const requestBody = await axios.get(config.scraper.MEMBER_PAGE)

  /**
   * This should be abstracted away, so it can load any page.
   * It's hard-coded for the current page as it is.
   */
  const $ = cheerio.load(requestBody.data)
  return $(config.scraper.MEMBER_LIST)
}
