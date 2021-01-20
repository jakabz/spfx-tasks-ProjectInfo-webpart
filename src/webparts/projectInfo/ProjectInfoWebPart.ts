import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'ProjectInfoWebPartStrings';
import ProjectInfo from './components/ProjectInfo';
import { IProjectInfoProps } from './components/IProjectInfoProps';

import ListViewService from './services/ListViewService';

export interface IProjectInfoWebPartProps {
  editorGroup: string;
  enableEdit: boolean;
  currentSiteItem: any[];
  openWebpart: boolean;
}

export default class ProjectInfoWebPart extends BaseClientSideWebPart<IProjectInfoWebPartProps> {

  protected onInit(): Promise<void> {  
    return super.onInit().then(() => {  
      ListViewService.setup(this.context); 
    });
  }
  
  public render(): void {
    this.properties.enableEdit = false;
    ListViewService.getCurrentUserGroups().then(userGroups => {
      userGroups.map((group) => {
        if(group.Title.toUpperCase() === 'SP-WING-UZLETAGVEZETO-GRP' || group.Title.toUpperCase() === 'SP-WING-PROJECTMANAGER-GRP') {
          this.properties.enableEdit = true;
        }
      });
      ListViewService.getCurrentSiteItems().then(listItems => {
        const element: React.ReactElement<IProjectInfoProps> = React.createElement(
          ProjectInfo,
          {
            enableEdit: this.properties.enableEdit,
            currentSiteItem: listItems,
            openWebpart: this.properties.openWebpart
          }
        );
  
        ReactDom.render(element, this.domElement);
      });
    });
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // @ts-ignore
  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneToggle('openWebpart', {
                  label: 'Default WebPart View',
                  onText: 'Open',
                  offText: 'Close'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
