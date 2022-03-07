import React, { ReactElement } from 'react';
import { graphql } from 'react-relay';
import { AppContextProps, OmitRefType } from '@symbio/headless';
import { ButtonBlock_content } from './__generated__/ButtonBlock_content.graphql';
import { Button } from '../../components/blocks/Button/Button';
import { PageProps } from '../../types/page';
import { WebSettingsProps } from '../../types/webSettings';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ButtonBlockStaticProps {}

export interface ButtonBlockContent extends OmitRefType<ButtonBlock_content> {
    __typename: 'ButtonBlockRecord';
}

export interface ButtonBlockProps extends ButtonBlockStaticProps {
    content: ButtonBlockContent;
    app?: AppContextProps<PageProps, WebSettingsProps>;
    className?: string;
}

graphql`
    fragment ButtonBlock_content on ButtonBlockRecord {
        id
        file {
            id
            size
            title
            url
        }
        icon {
            id
        }
        page {
            id
        }
        label
    }
`;

const ButtonBlock = ({ content, ...otherProps }: ButtonBlockProps): ReactElement => (
    <Button {...{ ...content, id: undefined, __typename: undefined }} {...otherProps} />
);

if (typeof window === 'undefined') {
    // put your getStaticProps or getStaticPaths here
    /*
    ButtonBlock.getStaticProps = async ({
        locale,
        providers,
    }: StaticBlockContext): Promise<ButtonBlockStaticProps> => {
        const provider = providers.x;

        return {};
    };
    */
}

ButtonBlock.whyDidYouRender = true;

export default ButtonBlock;
