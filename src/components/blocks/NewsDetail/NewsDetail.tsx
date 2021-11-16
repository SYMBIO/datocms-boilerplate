import dayjs from 'dayjs';
import timeZone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React, { ReactElement } from 'react';
import dynamic from 'next/dynamic';
import symbio from '../../../../symbio.config.json';
import { Heading } from '../../primitives/Heading/Heading';
import { RichText } from '../../primitives/RichText/RichText';
import { BlocksProps } from '../../base/Blocks/Blocks';
import { NewsDetailBlockProps } from '../../../blocks/NewsDetailBlock/NewsDetailBlock';
import { NewsDetailBlock_content } from '../../../blocks/NewsDetailBlock/__generated__/NewsDetailBlock_content.graphql';

const Blocks = dynamic<BlocksProps>(() => import('../../base/Blocks/Blocks').then((mod) => mod.Blocks));

export type NewsDetailProps = Omit<NewsDetailBlockProps, 'content' | 'relatedItems'> &
    Omit<NewsDetailBlock_content, 'id' | '__typename' | ' $refType'>;

const NewsDetail = ({ item, app }: NewsDetailProps): ReactElement => {
    dayjs.extend(utc);
    dayjs.extend(timeZone);
    return (
        <>
            <Heading tag={'h1'}>aaa</Heading>
            <div className="text-base italic">
                {dayjs.tz(String(item?.dateFrom), symbio.tz).format()}
                {item?.perex && <RichText content={item.perex} />}
            </div>
            {app && item?.content && <Blocks blocksData={item.content} initialProps={{}} app={app} />}
        </>
    );
};

NewsDetail.whyDidYouRender = true;

export { NewsDetail };
