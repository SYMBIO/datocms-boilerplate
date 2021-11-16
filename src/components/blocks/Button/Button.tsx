import React, { ReactElement } from 'react';
import clsx from 'clsx';
import { BlockWrapper } from '../../base/BlockWrapper/BlockWrapper';
import { ButtonBlockContent, ButtonBlockProps } from '../../../blocks/ButtonBlock/ButtonBlock';
import { Heading } from '../../primitives/Heading/Heading';
import styles from './Button.module.scss';

export type ButtonProps = Omit<ButtonBlockProps, 'content'> & Omit<ButtonBlockContent, 'id' | '__typename'>;

export const Button = ({ className, app, ...props }: ButtonProps): ReactElement => (
    <BlockWrapper className={clsx(styles.blockWrapper, className)}>
        <Heading tag={'h2'} className="mt-6">
            ButtonBlock
        </Heading>
        <pre className="p-8 bg-gray-300 w-full">{JSON.stringify(props, undefined, '    ')}</pre>
    </BlockWrapper>
);
