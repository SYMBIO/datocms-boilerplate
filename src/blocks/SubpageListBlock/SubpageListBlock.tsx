import React, { ReactElement, useState } from 'react';
import graphql from 'graphql-tag';
import clsx from 'clsx';
import { StaticBlockContext } from '@symbio/headless';
import styles from './SubpageListBlock.module.scss';
import { SubpageListBlock_content } from './__generated__/SubpageListBlock_content.graphql';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { SubpageList } from '../../components/organisms/SubpageList/SubpageList';
import { Heading } from '../../components/primitives/Heading/Heading';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';
import { Providers } from '../../types/providers';
import { Locale } from '../../types/locale';

interface Subpage {
    __typename: 'PageRecord';
    id: string;
    title: string;
    url: string;
}

interface ServerProps {
    count: number;
    items: Subpage[];
}

type SubpageListBlockProps = ServerProps & {
    content: SubpageListBlock_content;
    className?: string;
};

graphql`
    fragment SubpageListBlock_content on SubpageListBlockRecord {
        id
        page {
            __typename
            id
            ... on PageRecord {
                url
                title
            }
        }
        sortAlphabetically
        heading
    }
`;

function SubpageListBlock({
    content,
    items,
    count,
    className,
    ...rest
}: SubpageListBlockProps): ReactElement<SubpageListBlockProps, 'BaseBlock'> {
    const [page, setPage] = useState(1);

    return (
        <BlockWrapper className={clsx(styles.wrapper, className)} {...rest}>
            {content.heading && <Heading tag={'h2'}>{content.heading}</Heading>}
            <SubpageList
                items={items}
                page={page}
                setPage={setPage}
                count={count}
                pages={!!content.page}
                showImages={false}
            />
        </BlockWrapper>
    );
}

if (typeof window === 'undefined') {
    SubpageListBlock.getStaticProps = SubpageListBlock.getServerSideProps = async ({
        locale,
        page,
        block,
        providers,
    }: StaticBlockContext<PageProps, WebSettingsProps, Providers, Locale>): Promise<ServerProps> => {
        const parentId: string =
            (block && block.__typename === 'SubpageListBlockRecord' ? block.page?.id || page?.id : '') ?? '';

        if (page?.id) {
            const result = await providers.page.find({
                filter: {
                    parent: {
                        eq: parentId,
                    },
                },
                limit: 96,
                locale,
            });

            const items: Subpage[] = [];
            for (const item of result.data) {
                if (item && item.title && item.url) {
                    items.push({
                        __typename: 'PageRecord',
                        id: item.id,
                        title: item.title,
                        url: item.url,
                    });
                }
            }

            return {
                count: result.count,
                items,
            };
        } else {
            return {
                count: 0,
                items: [],
            };
        }
    };
}

SubpageListBlock.whyDidYouRender = true;

export default SubpageListBlock;
