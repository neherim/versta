import {DefaultNodeModel} from "@projectstorm/react-diagrams";
import {ServiceSchema} from "../schema";
import {Point} from "@projectstorm/geometry";
import {ServicePortModel} from "../Port/ServicePortModel";

export class ServiceNodeModel extends DefaultNodeModel {
  constructor(schema?: ServiceSchema) {
    if (schema) {
      super({
        id: schema.id,
        name: schema.name,
        position: new Point(schema.position.x, schema.position.y),
        type: "service"
      });
      this.createPorts(schema);
    } else {
      super({
        type: "service"
      });
    }
  }

  public getAllPorts(): ServicePortModel[] {
    return Object.values(this.getPorts()) as ServicePortModel[]
  }

  private createPorts(schema: ServiceSchema) {
    schema.ports.forEach(port => this.addPort(new ServicePortModel(port)));
  }

  serializeToSchema(): ServiceSchema {
    return {
      id: this.getID(),
      name: this.options.name || "unknown",
      position: {
        x: this.getX(),
        y: this.getY()
      },
      ports: this.getAllPorts().map(port => port.serializeToSchema()),
    };
  }
}
