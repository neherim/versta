import {DefaultNodeModel} from "@projectstorm/react-diagrams";
import {ServiceSchema} from "../schema";
import {Point} from "@projectstorm/geometry";
import {ServicePortModel} from "./ServicePortModel";

export class ServiceNodeModel extends DefaultNodeModel {
  constructor(schema: ServiceSchema) {
    super({
      id: schema.id,
      name: schema.name,
      position: new Point(schema.position.x, schema.position.y),
      color: "rgba(192,255,0,0.5)"
    });
    this.createPorts(schema);
  }

  private createPorts(schema: ServiceSchema) {
    schema.ports.forEach(port => this.addPort(new ServicePortModel(port)));
  }
}
