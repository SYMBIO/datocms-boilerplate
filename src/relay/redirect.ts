import { graphql } from 'react-relay';

graphql`
    fragment redirectFragment on RedirectRecord {
        id
        from
        to
        permanent
    }
`;

export const redirectListQuery = graphql`
    query redirectListQuery($filter: RedirectModelFilter, $limit: IntType, $offset: IntType) {
        meta: _allRedirectsMeta(filter: $filter) {
            count
        }
        items: allRedirects(filter: $filter, first: $limit, skip: $offset) {
            ...redirectFragment @relay(mask: false)
        }
    }
`;

export const redirectDetailQuery = graphql`
    query redirectDetailQuery($filter: RedirectModelFilter) {
        item: redirect(filter: $filter) {
            ...redirectFragment @relay(mask: false)
        }
    }
`;
