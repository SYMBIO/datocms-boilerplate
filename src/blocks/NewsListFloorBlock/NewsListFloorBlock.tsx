import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { FindResponse } from '../../lib/provider/AbstractDatoCMSProvider';
import { newsListQueryResponse } from '../../relay/__generated__/newsListQuery.graphql';
import { StaticBlockContext } from '@symbio/headless/types/block';
import { NewsList } from '../../components/blocks/NewsList/NewsList';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';

type StaticProps = FindResponse<newsListQueryResponse['items']>;

type NewsListFloorBlockProps = StaticProps;

graphql`
    fragment NewsListFloorBlock_content on NewsListFloorBlockRecord {
        id
        allNewsPage {
            url
        }
        allNewsLinkText
        categories {
            id
        }
        count
        heading
    }
`;

function NewsListFloorBlock({
    content,
    data,
    ...rest
}: NewsListFloorBlockProps): ReactElement<NewsListFloorBlockProps, 'BaseBlock'> {
    const { heading, allNewsLinkText, allNewsPage } = content;

    return (
        <BlockWrapper tooltip={'NewsListFloorBlock'} {...rest}>
            <NewsList headline={heading} items={data} allNewsPage={allNewsPage} allNewsLinkText={allNewsLinkText} />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    NewsListFloorBlock.getStaticProps = async ({ locale, providers }: StaticBlockContext<PageProps, WebSettingsProps>): Promise<StaticProps> =>
        await providers.news.find({
            locale,
            limit: 3,
            offset: 0,
        });
}

NewsListFloorBlock.whyDidYouRender = true;

export default NewsListFloorBlock;