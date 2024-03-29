/**
 * Import blocks which should be included in SSR
 */
import dynamic from 'next/dynamic';
import { BlockType } from '@symbio/headless';
import { PageProps } from '../types/page';
import { WebSettingsProps } from '../types/webSettings';
import { Providers } from '../types/providers';
import { Locale } from '../types/locale';

/**
 * Define fragment for blocks to load with app data
 */
import { graphql } from 'relay-runtime';
import ButtonBlock from './ButtonBlock/ButtonBlock';
import CarouselBlock from './CarouselBlock/CarouselBlock';
import CmsFormBlock from './CmsFormBlock/CmsFormBlock';
import Error404Block from './Error404Block/Error404Block';
import GalleryBlock from './GalleryBlock/GalleryBlock';
import ImageBlock from './ImageBlock/ImageBlock';
import MapBlock from './MapBlock/MapBlock';
import NewsDetailBlock from './NewsDetailBlock/NewsDetailBlock';
import NewsListBlock from './NewsListBlock/NewsListBlock';
import NewsListFloorBlock from './NewsListFloorBlock/NewsListFloorBlock';
import RichTextBlock from './RichTextBlock/RichTextBlock';
import SubpageListBlock from './SubpageListBlock/SubpageListBlock';
import VideoBlock from './VideoBlock/VideoBlock';
import YoutubeVimeoBlock from './YoutubeVimeoBlock/YoutubeVimeoBlock';

graphql`
    fragment blocksContent on PageModelContentField {
        __typename
        ...ButtonBlock_content @relay(mask: false)
        ...CarouselBlock_content @relay(mask: false)
        ...CmsFormBlock_content @relay(mask: false)
        ...Error404Block_content @relay(mask: false)
        ...GalleryBlock_content @relay(mask: false)
        ...ImageBlock_content @relay(mask: false)
        ...MapBlock_content @relay(mask: false)
        ...NewsDetailBlock_content @relay(mask: false)
        ...NewsListBlock_content @relay(mask: false)
        ...NewsListFloorBlock_content @relay(mask: false)
        ...RichTextBlock_content @relay(mask: false)
        ...SubpageListBlock_content @relay(mask: false)
        ...VideoBlock_content @relay(mask: false)
        ...YoutubeVimeoBlock_content @relay(mask: false)
    }
`;

const blocks: { [name: string]: BlockType<PageProps, WebSettingsProps, Providers, Locale> } =
    process.env.NODE_ENV === 'production'
        ? {
              ButtonBlock: dynamic(() => import('./ButtonBlock/ButtonBlock')),
              CarouselBlock: dynamic(() => import('./CarouselBlock/CarouselBlock')),
              CmsFormBlock: dynamic(() => import('./CmsFormBlock/CmsFormBlock')),
              Error404Block: dynamic(() => import('./Error404Block/Error404Block')),
              GalleryBlock: dynamic(() => import('./GalleryBlock/GalleryBlock')),
              ImageBlock: dynamic(() => import('./ImageBlock/ImageBlock')),
              MapBlock: dynamic(() => import('./MapBlock/MapBlock')),
              NewsDetailBlock: dynamic(() => import('./NewsDetailBlock/NewsDetailBlock')),
              NewsListBlock: dynamic(() => import('./NewsListBlock/NewsListBlock')),
              NewsListFloorBlock: dynamic(() => import('./NewsListFloorBlock/NewsListFloorBlock')),
              RichTextBlock: dynamic(() => import('./RichTextBlock/RichTextBlock')),
              SubpageListBlock: dynamic(() => import('./SubpageListBlock/SubpageListBlock')),
              VideoBlock: dynamic(() => import('./VideoBlock/VideoBlock')),
              YoutubeVimeoBlock: dynamic(() => import('./YoutubeVimeoBlock/YoutubeVimeoBlock')),
          }
        : {
              ButtonBlock,
              CarouselBlock,
              CmsFormBlock,
              Error404Block,
              GalleryBlock,
              ImageBlock,
              MapBlock,
              NewsDetailBlock,
              NewsListBlock,
              NewsListFloorBlock,
              RichTextBlock,
              SubpageListBlock,
              VideoBlock,
              YoutubeVimeoBlock,
          };

export default blocks;
