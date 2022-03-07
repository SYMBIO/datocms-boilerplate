import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { GetStaticPathsResult } from 'next';
import { AppContextProps, StaticBlockContext } from '@symbio/headless';
import { getId } from '@symbio/headless/utils';
import styles from './NewsDetailBlock.module.scss';
import { newsDetailQueryResponse } from '../../relay/__generated__/newsDetailQuery.graphql';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { NewsDetail } from '../../components/blocks/NewsDetail/NewsDetail';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import symbio from '../../../symbio.config.json';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';
import { NewsDetailBlock_content } from './__generated__/NewsDetailBlock_content.graphql';

type NewsDetailBlockStaticProps = newsDetailQueryResponse;

graphql`
    fragment NewsDetailBlock_content on NewsDetailBlockRecord {
        id
    }
`;

export interface NewsDetailBlockProps extends NewsDetailBlockStaticProps {
    content: NewsDetailBlock_content;
    app?: AppContextProps<PageProps, WebSettingsProps>;
    className?: string;
}

function NewsDetailBlock({
    item,
    app,
    className,
}: NewsDetailBlockProps): ReactElement<NewsDetailBlockProps, 'BaseBlock'> {
    return (
        <BlockWrapper className={`flex-col ${styles.wrapper}`}>
            {item && item.content && (
                <NewsDetail
                    item={{
                        ...item,
                        dateFrom: String(item.dateFrom),
                        title: String(item.title),
                        slug: String(item.slug),
                        content: item.content as never,
                    }}
                    app={app}
                    className={className}
                />
            )}
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    NewsDetailBlock.getStaticPaths = async (
        locale: string | undefined,
        providers: Providers,
    ): Promise<GetStaticPathsResult['paths']> => {
        const provider = providers.news;
        return provider.getStaticPaths(locale || symbio.i18n.defaultLocale);
    };

    NewsDetailBlock.getStaticProps = async ({
        locale,
        context: { params },
        providers,
    }: StaticBlockContext<PageProps, WebSettingsProps, Providers, Locale>): Promise<NewsDetailBlockStaticProps> => {
        if (!params || !params.slug) {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const id = getId(params.slug);

        if (!id) {
            const err = new Error('Page not found') as Error & { code: string };
            err.code = 'ENOENT';
            throw err;
        }

        const item = (await providers.news.findOne({ id, locale })) as newsDetailQueryResponse['item'];

        return {
            item,
        };
    };
}

NewsDetailBlock.whyDidYouRender = true;

export default NewsDetailBlock;
