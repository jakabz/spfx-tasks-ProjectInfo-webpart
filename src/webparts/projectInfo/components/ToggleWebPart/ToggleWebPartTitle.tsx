import * as React from 'react';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import styles from './ToggleWebPart.module.scss';

export interface IToggleWebPartTitleProps {
    isOpen: boolean;
    title: string;
    click: () => void;
}

export interface IToggleWebPartTitleState {

}

export default class ToggleWebPartTitle extends React.Component<IToggleWebPartTitleProps, IToggleWebPartTitleState> {    
    public render(): any {
        return (
            <div className={ styles.ToggleWebPartTitle } onClick={ () => this.props.click() }>
                <div className={ styles.ToggleIconSpace }>
                <Icon iconName='ChevronUp' className={ this.props.isOpen ? styles.ToggleIconUp : styles.ToggleIconDown } />
                    {/* {
                        this.props.isOpen ? 
                        <Icon iconName='ChevronUp' className={ styles.ToggleIcon } /> :
                        <Icon iconName='ChevronDown' className={ styles.ToggleIcon } />
                    } */}
                    
                </div>
                <h3>{ this.props.title }</h3>
            </div>
        );
    }
}