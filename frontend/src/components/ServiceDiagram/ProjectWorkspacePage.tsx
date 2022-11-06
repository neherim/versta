import React from "react";
import {DiagramToolbarWidget} from "./Toolbar/DiagramToolbarWidget";
import {ProjectServiceDiagram} from "./Diagram/ProjectServiceDiagram";
import {DiagramCanvasWidget} from "./Diagram/DiagramCanvasWidget";
import styled from "@emotion/styled";

interface WorkspaceWidgetProps {
}

interface WorkspaceWidgetState {
  isInEditMode: boolean;
}

export class WorkspaceWidget extends React.Component<WorkspaceWidgetProps, WorkspaceWidgetState> {
  diagram = new ProjectServiceDiagram();

  constructor(props: WorkspaceWidgetProps) {
    super(props);
    this.state = {
      isInEditMode: false
    }
  }

  private handleSerialize() {
    console.log(this.diagram.serialize());
  }

  private handleEdit() {
    this.diagram.startEdit();
    this.setState({
      isInEditMode: true
    })
  }

  private handleSave() {
    this.diagram.saveChanges();
    this.setState({
      isInEditMode: false
    })
  }

  private handleSchema1() {
    console.log(JSON.stringify(schemaExample1));
    this.diagram.updateSchema(schemaExample1);
  }

  render() {
    return (
      <Container>
        <DiagramToolbarWidget
          onZoomIn={() => this.diagram.zoomIn()}
          onZoomOut={() => this.diagram.zoomOut()}
          onZoomToFit={() => this.diagram.zoomToFit()}
          onSerialize={() => this.handleSerialize()}
          onEdit={() => this.handleEdit()}
          onSave={() => this.handleSave()}
          onSchema1={() => this.handleSchema1()}
        />
        <DiagramCanvasWidget diagram={this.diagram} showGrid={this.state.isInEditMode}/>
      </Container>
    );
  }
}

const Container = styled.div`
		background: black;
		display: flex;
		flex-direction: column;
		height: 100%;
		border-radius: 5px;
		overflow: hidden;
	`;


export const schemaExample1 = {
  services: [
    {
      id: "1",
      name: "scrooge-message-registry",
      position: {
        x: 105,
        y: 75
      },
      ports: [
        {
          id: "2",
          name: "SendOutputResponseCommand",
          input: true
        },
        {
          id: "3",
          name: "ProcessInputRequestCommand",
          input: false
        }
      ]
    },
    {
      id: "4",
      name: "scrooge-person",
      position: {
        x: 615,
        y: 75
      },
      ports: [
        {
          id: "5",
          name: "ProcessInputRequestCommand",
          input: true
        },
        {
          id: "6",
          name: "SendOutputResponseCommand",
          input: false
        },
        {
          id: "7",
          name: "PersonalDataUpdated",
          input: false
        },
        {
          id: "8",
          name: "OrganizationChanged",
          input: false
        }
      ]
    },
    {
      id: "9",
      name: "scrooge-statement",
      position: {
        x: 615,
        y: 195
      },
      ports: [
        {
          id: "10",
          name: "ProcessInputRequestCommand",
          input: true
        },
        {
          id: "11",
          name: "SendOutputResponseCommand",
          input: false
        }
      ]
    }
  ],

  links: [
    {
      id: "41",
      from: "3",
      to: "5"
    },
    {
      id: "42",
      from: "6",
      to: "2"
    },
    {
      id: "43",
      from: "3",
      to: "10"
    }
  ]
};