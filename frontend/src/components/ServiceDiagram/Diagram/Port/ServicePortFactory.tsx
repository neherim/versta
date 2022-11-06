import {AbstractModelFactory} from '@projectstorm/react-canvas-core';
import {DiagramEngine} from '@projectstorm/react-diagrams-core';
import {ServicePortModel} from "./ServicePortModel";

export class ServicePortFactory extends AbstractModelFactory<ServicePortModel, DiagramEngine> {
  constructor() {
    super('service-port');
  }

  generateModel(): ServicePortModel {
    return new ServicePortModel();
  }
}
