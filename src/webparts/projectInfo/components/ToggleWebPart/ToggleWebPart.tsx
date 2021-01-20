import * as React from 'react';
import ToggleWebPartTitle from './ToggleWebPartTitle';
import ToggleWebPartContent from './ToggleWebPartContent';
import styles from './ToggleWebPart.module.scss';

export interface IToggleWebPartProps {
    isOpen: boolean;
    title: string;
    content: any;
}

export interface IToggleWebPartState {
    isOpen: boolean;
}

export default class ToggleWebPart extends React.Component<IToggleWebPartProps, IToggleWebPartState> {    
    constructor(props: IToggleWebPartProps) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen
        };
    }

    public toggle = () => {
        this.state.isOpen ? this.setState({ isOpen: false }) : this.setState({ isOpen: true });
    }

    public render(): any {
        return (
            <div className={ styles.ToggleWebPart }>
                <ToggleWebPartTitle title={ this.props.title } isOpen={ this.state.isOpen } click={() => this.toggle() }/>
                <ToggleWebPartContent content={ this.props.content } isOpen={ this.state.isOpen } />
            </div>
        );
    }
}