import * as cheerio from 'cheerio'
import config from './config.js'

export default function parseMEP(member) {
  const $memberData = cheerio.load(member)

  /**
   * This is quite volatile. The more reliable way might be to crawl
   * the `itemprop` elements, since they seem to use some microdata?
   * But is it actually well annotated?
   */
  const url = $memberData(config.scraper.MEMBER_URL).attr('href')

  /**
   * We could test that the image URL resolves.
   */
  const image = $memberData(config.scraper.MEMBER_IMAGE).attr('src')

  const name = $memberData(config.scraper.MEMBER_NAME).text()

  /**
   * See note below about lists and validation, i.e. the distance towards
   * known party groups.
   */
  const partyGroup = $memberData(config.scraper.MEMBER_PARTY_GROUP).text()

  /**
   * Since the list of EU countries is limited, we could rely on `ajv` to
   * parse the country and reject invalid results. Or use the Levenshtein
   * distance of the result against the list of known EU countries,
   * assuming the closest match.
   */
  const country = $memberData(config.scraper.MEMBER_COUNTRY).text()

  /**
   * I'm betting this blows up easily too. Maybe it's best to regex
   * against sequences of uppercase characters? Of course not everyone
   * has a last name or in the expected format.
   * @see https://www.kalzumeus.com/2010/06/17/falsehoods-programmers-believe-about-names/
   */
  const lastName = name.split(' ').at(-1)

  return {
    name,
    lastName,
    partyGroup,
    country,
    url,
    image,
  }
}
