import * as React from 'react';
import {AbstractReactFactory} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {ServiceNodeWidget} from "./ServiceNodeWidget";
import {ServiceNodeModel} from "./ServiceNodeModel";
import {GenerateWidgetEvent} from "@projectstorm/react-canvas-core/dist/@types/src/core/AbstractReactFactory";
import {GenerateModelEvent} from "@projectstorm/react-canvas-core/dist/@types/src/core/AbstractModelFactory";

export class ServiceNodeFactory extends AbstractReactFactory<ServiceNodeModel, DiagramEngine> {
  constructor() {
    super('service');
  }

  generateReactWidget(event: GenerateWidgetEvent<ServiceNodeModel>): JSX.Element {
    return <ServiceNodeWidget engine={this.engine} node={event.model}/>;
  }

  generateModel(event: GenerateModelEvent): ServiceNodeModel {
    return new ServiceNodeModel();
  }
}
