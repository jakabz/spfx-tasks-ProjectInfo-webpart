import * as React from 'react';
import styles from './ToggleWebPart.module.scss';

export interface IToggleWebPartContentProps {
    isOpen: boolean;
    content: any;
}

export interface IToggleWebPartContentState {

}

export default class ToggleWebPartContent extends React.Component<IToggleWebPartContentProps, IToggleWebPartContentState> {    
    public render(): any {
        return (
            <div className={ this.props.isOpen ? styles.ToggleWebPartContent : styles.ToggleWebPartContentClose }>
                { this.props.content }
            </div>
        );
    }
}