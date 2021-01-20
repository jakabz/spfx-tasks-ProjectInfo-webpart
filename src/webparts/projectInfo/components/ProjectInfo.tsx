import * as React from "react";
import styles from "./ProjectInfo.module.scss";
import { IProjectInfoProps } from "./IProjectInfoProps";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { DefaultButton, IButtonProps } from "office-ui-fabric-react/lib/Button";
import { TooltipHost } from "office-ui-fabric-react/lib/Tooltip";
import ListViewService from ".././services/ListViewService";
import ToggleWebPart from "./ToggleWebPart/ToggleWebPart";

export interface IProjectInfoState {
  disableInputs: boolean;
  Projectname: string;
  Address: string;
  Registrationnumber: string;
  Landsize: string;
  Zoning: string;
  GLA: string;
  GBA: string;
  Parking: string;
  Projectmanager: string;
  Projectmembers: string;
  Files: string;
  Cam: string;
  PlanDoc: string;
}

export default class ProjectInfo extends React.Component<
  IProjectInfoProps,
  IProjectInfoState
> {
  public baseState: IProjectInfoState;

  constructor(props: IProjectInfoProps) {
    super(props);
    this.state = {
      disableInputs: true,
      Projectname: this.props.currentSiteItem["Projectname"] ? this.props.currentSiteItem["Projectname"] : '',
      Address: this.props.currentSiteItem["Address"] ? this.props.currentSiteItem["Address"] : '',
      Registrationnumber: this.props.currentSiteItem["Registrationnumber"] ? this.props.currentSiteItem["Registrationnumber"] : '',
      Landsize: this.props.currentSiteItem["Landsize"] ? this.props.currentSiteItem["Landsize"] : '',
      Zoning: this.props.currentSiteItem["Zoning"] ? this.props.currentSiteItem["Zoning"] : '',
      GLA: this.props.currentSiteItem["GLA"] ? this.props.currentSiteItem["BLA"] : '',
      GBA: this.props.currentSiteItem["GBA"] ? this.props.currentSiteItem["GBA"] : '',
      Parking: this.props.currentSiteItem["Parking"] ? this.props.currentSiteItem["Parking"] : '',
      Projectmanager: this.props.currentSiteItem["Projectmanager"] ? this.props.currentSiteItem["Projectmanager"] : '',
      Projectmembers: this.props.currentSiteItem["Projectmembers"] ? this.props.currentSiteItem["Projectmembers"] : '',
      Files: this.props.currentSiteItem["Files"],
      Cam: this.props.currentSiteItem["Cam"],
      PlanDoc: this.props.currentSiteItem["PlanDoc"],
    };
    this.baseState = this.state;
  }

  public _saveForm = () => {
    this.setState({ disableInputs: true });
    const newItem = {
      Projectname: this.state.Projectname,
      Address: this.state.Address,
      Registrationnumber: this.state.Registrationnumber,
      Landsize: this.state.Landsize,
      Zoning: this.state.Zoning,
      GLA: this.state.GLA,
      GBA: this.state.GBA,
      Parking: this.state.Parking,
      Projectmanager: this.state.Projectmanager,
      Projectmembers: this.state.Projectmembers,
      Files: this.state.Files,
      Cam: this.state.Cam,
      PlanDoc: this.state.PlanDoc,
    };
    ListViewService.updateItem(this.props.currentSiteItem["Id"], newItem).then(
      (res) => {
        alert('Project info update success!');
      }
    );
  };

  public _cancelForm = () => {
    this.setState(this.baseState);
  };

  public render(): React.ReactElement<IProjectInfoProps> {
    //console.info(this.props);
    const projectInfo = (
      <div className={styles.projectInfoFrom}>
        <div className={styles.leftSide}>
          <TextField
            label="Project name"
            disabled={this.state.disableInputs}
            value={this.state.Projectname}
            onChanged={(value) => this.setState({ Projectname: value })}
          />
          <TextField
            label="Address"
            disabled={this.state.disableInputs}
            value={this.state.Address}
            onChanged={(value) => this.setState({ Address: value })}
          />
          <TextField
            label="Registration number"
            disabled={this.state.disableInputs}
            value={this.state.Registrationnumber}
            onChanged={(value) => this.setState({ Registrationnumber: value })}
          />
          <TextField
            label="Landsize"
            disabled={this.state.disableInputs}
            value={this.state.Landsize}
            onChanged={(value) => this.setState({ Landsize: value })}
          />
          <TextField
            label="Zoning"
            disabled={this.state.disableInputs}
            value={this.state.Zoning}
            onChanged={(value) => this.setState({ Zoning: value })}
          />
        </div>
        <div className={styles.rightSide}>
          <TextField
            label="GLA"
            disabled={this.state.disableInputs}
            value={this.state.GLA}
            onChanged={ value => this.setState({GLA: value}) }
          />
          <TextField
            label="GBA"
            disabled={this.state.disableInputs}
            value={this.state.GBA}
            onChanged={ value => this.setState({GBA: value}) }
          />
          <TextField
            label="Parking"
            disabled={this.state.disableInputs}
            value={this.state.Parking}
            onChanged={ value => this.setState({Parking: value}) }
          />
          <TextField
            label="Project manager"
            disabled={this.state.disableInputs}
            value={this.state.Projectmanager}
            onChanged={ value => this.setState({Projectmanager: value}) }
          />
          <TextField
            label="Project members"
            disabled={this.state.disableInputs}
            value={this.state.Projectmembers}
            onChanged={ value => this.setState({Projectmembers: value}) }
          />
        </div>
        <div className={styles.clear}></div>
        <div className={styles.Toolbar}>
          <div className={styles.leftSide}>
            {this.state.disableInputs ? (
              <div>
                <TooltipHost
                  content="Project documents"
                  id="Documentation"
                  calloutProps={{ gapSpace: 0 }}
                >
                  <DefaultButton
                    disabled={!this.state.Files}
                    aria-describedby="Documentation"
                    iconProps={{ iconName: "Documentation" }}
                    onClick={() => (location.href = this.state.Files)}
                  />
                </TooltipHost>
                <span> </span>
                <TooltipHost
                  content="Project Cam"
                  id="Video"
                  calloutProps={{ gapSpace: 0 }}
                >
                  <DefaultButton
                    disabled={!this.state.Cam}
                    aria-describedby="Video"
                    iconProps={{ iconName: "MSNVideos" }}
                    onClick={() => (location.href = this.state.Cam)}
                  />
                </TooltipHost>
                <span> </span>
                <TooltipHost
                  content="Plandocs"
                  id="Plandocs"
                  calloutProps={{ gapSpace: 0 }}
                >
                  <DefaultButton
                    disabled={!this.state.PlanDoc}
                    aria-describedby="Plandocs"
                    iconProps={{ iconName: "DocumentSet" }}
                    onClick={() => (location.href = this.state.PlanDoc)}
                  />
                </TooltipHost>
              </div>
            ) : (
              <div className={styles.ToolbarInputs}>
                <TextField
                  value={this.state.Files}
                  iconProps={{ iconName: "Documentation" }}
                  onChanged={ value => this.setState({Files: value}) }
                />
                <TextField
                  value={this.state.Cam}
                  iconProps={{ iconName: "MSNVideos" }}
                  onChanged={ value => this.setState({Cam: value}) }
                />
                <TextField
                  value={this.state.PlanDoc}
                  iconProps={{ iconName: "DocumentSet" }}
                  onChanged={ value => this.setState({PlanDoc: value}) }
                />
              </div>
            )}
          </div>
          <div className={styles.rightSide}>
            {this.props.enableEdit && this.state.disableInputs ? (
              <DefaultButton
                iconProps={{ iconName: "Edit" }}
                text="Edit project info"
                onClick={() => this.setState({ disableInputs: false })}
              />
            ) : (
              <div>
                <DefaultButton
                  iconProps={{ iconName: "Cancel" }}
                  text="Cancel"
                  onClick={() => this._cancelForm()}
                />
                <span> </span>
                <DefaultButton
                  iconProps={{ iconName: "Save" }}
                  text="Save"
                  onClick={() => this._saveForm()}
                />
              </div>
            )}
          </div>
        </div>
        <div className={styles.clear}></div>
      </div>
    );

    return (
      <div className={styles.projectInfo}>
        <ToggleWebPart
          isOpen={this.props.openWebpart}
          title="Project info"
          content={projectInfo}
        />
      </div>
    );
  }
}
