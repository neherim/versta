import React from "react";
import {ProjectDiagram} from "./Diagram/ProjectDiagram";
import {DiagramCanvasWidget} from "./Diagram/DiagramCanvasWidget";
import styled from "@emotion/styled";
import {ProjectSchema} from "./Diagram/schema";

interface WorkspaceWidgetProps {
}

interface WorkspaceWidgetState {
  isInEditMode: boolean;
}

export class ProjectWorkspacePage extends React.Component<WorkspaceWidgetProps, WorkspaceWidgetState> {
  diagram = new ProjectDiagram();

  constructor(props: WorkspaceWidgetProps) {
    super(props);
    this.state = {
      isInEditMode: false
    }
  }

  private handleSerialize() {
    console.log(this.diagram.serializeModel());
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
    this.diagram.deserialize(schemaExample1);
  }

  private handleSchema2() {
    console.log(this.diagram.serializeToSchema());
  }

  render() {
    return (
      <Container>
        <div>
          <button onClick={() => this.diagram.zoomIn()}>zoom in</button>
          <button onClick={() => this.diagram.zoomOut()}>zoom out</button>
          <button onClick={() => this.diagram.zoomToFit()}>zoom to fit</button>
          <button onClick={() => this.handleSerialize()}>serialize</button>
          <button onClick={() => this.handleEdit()}>edit</button>
          <button onClick={() => this.handleSave()}>save</button>
          <button onClick={() => this.handleSchema1()}>schema1</button>
          <button onClick={() => this.handleSchema2()}>toSchema</button>
        </div>
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


export const schemaExample1: ProjectSchema = {
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
      to: "5",
      points: []
    },
    {
      id: "42",
      from: "6",
      to: "2",
      points: [
        {
          x: 984.40625,
          y: 108.5
        },
        {
          x: 1030,
          y: 108.5
        },
        {
          x: 1030,
          y: 30
        }, {
          x: 67,
          y: 30
        },
        {
          x: 67,
          y: 108.5
        },
        {
          x: 114.5,
          y: 108.5
        }
      ]
    },
    {
      id: "43",
      from: "3",
      to: "10",
      points: []
    }
  ]
};


export const schemaExample2: ProjectSchema = {
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
    },
    {
      id: "101",
      name: "scrooge-statement",
      position: {
        x: 50,
        y: 50
      },
      ports: [
        {
          id: "201",
          name: "IN",
          input: true
        },
        {
          id: "202",
          name: "OUT",
          input: false
        }
      ]
    }
  ],

  links: [
    {
      id: "41",
      from: "3",
      to: "5",
      points: []
    },
    {
      id: "42",
      from: "6",
      to: "2",
      points: [
      ]
    },
    {
      id: "43",
      from: "3",
      to: "10",
      points: []
    }
  ]
};