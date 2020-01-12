import {
  DefaultNodeModel,
  DefaultPortModel
} from "@projectstorm/react-diagrams";
import { ServiceSchema, PortSchema } from "./schema";
import { ServicePortModel } from "./ServicePortModel";
import * as _ from "lodash";

export class ServiceNodeModel extends DefaultNodeModel {
  constructor(schema: ServiceSchema) {
    super({
      id: schema.id,
      name: schema.name,
      // color: "rgb(192,255,0)"
      color: "rgba(192,255,0,0.5)"

    });
    this.updateFromSchema(schema);
  }

  updateFromSchema(schema: ServiceSchema) {
    this.removeOldPorts(schema);
    this.addNewPorts(schema);
  }

  removePort(port: DefaultPortModel): void {
    // clear the port from the links
    for (let link of _.values(port.getLinks())) {
      link.clearPort(port);
    }
    //clear the parent node reference
    if (this.ports[port.getName()]) {
      delete this.ports[port.getName()];
    }
    if (port.getOptions().in) {
      this.portsIn.splice(this.portsIn.indexOf(port), 1);
    } else {
      this.portsOut.splice(this.portsOut.indexOf(port), 1);
    }
  }

  getName(): string {
    return this.options.name as string;
  }

  getAllPorts(): ServicePortModel[] {
    return Object.values(this.getPorts()) as ServicePortModel[];
  }

  getPortByName(name: string): ServicePortModel | undefined {
    return this.getAllPorts().find(port => port.getName() === name);
  }

  private removeOldPorts(schema: ServiceSchema) {
    this.getAllPorts()
      .filter(port => !this.isPortExistInSchema(port, schema))
      .forEach(port => {
        this.removePort(port);
      });
    this.getAllPorts().forEach(port => {
      port.reportPosition();
    });
  }

  private isPortExistInSchema(
    port: ServicePortModel,
    schema: ServiceSchema
  ): boolean {
    return (
      schema.ports.find(schemaPort => port.isEqualToSchema(schemaPort)) !=
      undefined
    );
  }

  private isPortExistInModel(schema: PortSchema): boolean {
    return (
      this.getAllPorts().find(port => port.isEqualToSchema(schema)) != undefined
    );
  }

  private addNewPorts(schema: ServiceSchema) {
    schema.ports
      .filter(port => !this.isPortExistInModel(port))
      .forEach(port => this.addPort(new ServicePortModel(port)));
  }
}
