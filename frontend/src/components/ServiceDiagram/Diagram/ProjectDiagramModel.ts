import {DiagramModel} from "@projectstorm/react-diagrams-core";
import {PortModel} from "@projectstorm/react-diagrams";
import {ProjectSchema} from "./schema";
import {ServiceNodeModel} from "./Node/ServiceNodeModel";
import {ServiceLinkModel} from "./Link/ServiceLinkModel";

export class ProjectServiceDiagramModel extends DiagramModel {
  constructor(schema: ProjectSchema | undefined = undefined) {
    super();
    this.setGridSize(15);
    if (schema) {
      this.createNodes(schema);
      this.createLinks(schema);
    }
  }

  lock() {
    this.setLocked(true);
    this.getLinks().forEach(link => link.setLocked(true));
  }

  unlock() {
    this.setLocked(false);
    this.getLinks().forEach(link => link.setLocked(false));
  }

  getNodes(): ServiceNodeModel[] {
    return super.getNodes() as ServiceNodeModel[];
  }

  private createNodes(schema: ProjectSchema) {
    schema.services.forEach(service =>
      this.addNode(new ServiceNodeModel(service))
    );
  }

  private createLinks(schema: ProjectSchema) {
    let allInPorts = this.getNodes().flatMap(node => node.getInPorts());
    let allOutPorts = this.getNodes().flatMap(node => node.getOutPorts());
    for (let linkSchema of schema.links) {
      let fromPort = allOutPorts.find(port => port.getID() === linkSchema.from);
      let toPort = allInPorts.find(port => port.getID() === linkSchema.to);

      if (fromPort && toPort) {
        this.addNewLink(linkSchema.id, fromPort, toPort);
      } else {
        console.error(
          "Error in schema. Can't create link with id: " + linkSchema.id
        );
        console.error(schema);
      }
    }
  }

  private addNewLink(id: string, fromPort: PortModel, toPort: PortModel) {
    const linkModel = new ServiceLinkModel(id, fromPort, toPort);
    fromPort.reportPosition();
    toPort.reportPosition();
    this.addLink(linkModel);
  }
}
