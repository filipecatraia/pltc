import parseMEP from './lib/parseMEP.js'
import getLegislatorList from './lib/getLegislatorList.js'

export const scrapeEULegislators = async () => {
  const result = []

  const $list = await getLegislatorList()

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

