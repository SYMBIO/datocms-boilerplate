import graphql from 'graphql-tag';

graphql`
    fragment webSettingFragment on WebSettingRecord {
        logo {
            ...appImageFragment @relay(mask: false)
        }
        mainMenu {
            links {
                __typename
                ... on PageRecord {
                    id
                    url
                    title
                }
                ... on MenuRecord {
                    links {
                        __typename
                        ... on PageRecord {
                            id
                            url
                            title
                        }
                        ... on MenuRecord {
                            links {
                                __typename
                                ... on PageRecord {
                                    id
                                    url
                                    title
                                }
                            }
                        }
                    }
                }
            }
        }
        homepage {
            title
            url
        }
        newsPage {
            title
            url
        }
        footerMenu {
            links {
                __typename
                ... on PageRecord {
                    id
                    url
                    title
                }
                ... on MenuRecord {
                    links {
                        __typename
                        ... on PageRecord {
                            id
                            url
                            title
                        }
                    }
                }
            }
        }
    }
`;

export const webSettingQuery = graphql`
    query webSettingQuery($locale: SiteLocale) {
        item: webSetting(locale: $locale) {
            ...webSettingFragment @relay(mask: false)
        }
    }
`;
