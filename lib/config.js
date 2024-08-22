const config = {
  scraper: {
    MEMBER_PAGE: 'https://europarl.europa.eu/meps/en/full-list/all',
    MEMBER_LIST: '.erpl_member-list .erpl_member-list-item',
    MEMBER_URL: 'a.erpl_member-list-item-content',
    MEMBER_IMAGE: '.erpl_image-frame img[loading]',
    MEMBER_NAME: '.erpl_title-h4',
    MEMBER_PARTY_GROUP: '.sln-additional-info:nth-of-type(1)',
    MEMBER_COUNTRY: '.sln-additional-info:nth-of-type(2)',
  }
}

export default config
