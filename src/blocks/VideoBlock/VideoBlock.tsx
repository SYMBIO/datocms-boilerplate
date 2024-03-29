import React, { ReactElement } from 'react';
import graphql from 'graphql-tag';
import { BlockWrapper } from '../../components/base/BlockWrapper/BlockWrapper';
import { Video } from '../../components/organisms/Video/Video';
import styles from './VideoBlock.module.scss';
import { VideoBlock_content } from './__generated__/VideoBlock_content.graphql';

export interface VideoBlockProps {
    content: VideoBlock_content;
}

graphql`
    fragment VideoBlock_content on VideoBlockRecord {
        id
        autoplay
        video {
            ...appVideoFragment @relay(mask: false)
        }
    }
`;

function VideoBlock({ content, ...rest }: VideoBlockProps): ReactElement<VideoBlockProps, 'BaseBlock'> {
    const { autoplay, video } = content;
    return (
        <BlockWrapper className={styles.wrapper} {...rest}>
            <Video video={{ uploadedVideo: video }} autoPlay={autoplay} />
        </BlockWrapper>
    );
}

VideoBlock.whyDidYouRender = true;

export default VideoBlock;
