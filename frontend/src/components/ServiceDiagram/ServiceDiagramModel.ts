import { DiagramModel } from "@projectstorm/react-diagrams-core";
import { PortModel } from "@projectstorm/react-diagrams";
import { ProjectSchema } from "./schema";
import { ServiceNodeModel } from "./ServiceNodeModel";
import { ServiceLinkModel } from "./ServiceLinkModel";

export class ServiceDiagramModel extends DiagramModel {
  getNodes(): ServiceNodeModel[] {
    return super.getNodes() as ServiceNodeModel[];
  }

  updateSchema(schema: ProjectSchema) {
    this.removeOldServiceNodes(schema);
    this.updateExistedServiceNodes(schema);
    this.addNewServiceNodes(schema);
    this.updateLinks(schema);
  }

  private removeOldServiceNodes(schema: ProjectSchema) {
    this.getNodes()
      .filter(node => !schema.isServiceExist(node.getName()))
      .forEach(node => this.removeNode(node));
  }

  private updateExistedServiceNodes(schema: ProjectSchema) {
    for (const node of this.getNodes()) {
      const serviceSchema = schema.getService(node.getName());
      if (serviceSchema) {
        node.updateFromSchema(serviceSchema);
      }
    }
  }

  private addNewServiceNodes(schema: ProjectSchema) {
    let serviceNodeNames = this.getNodes().map(service => service.getName());
    schema.services
      .filter(service => !serviceNodeNames.includes(service.name))
      .forEach(service => this.addNode(new ServiceNodeModel(service)));
  }

  // -- Links --
  private updateLinks(schema: ProjectSchema) {
    let oldLinkModels = [...this.getLinks()];
    let allInPorts = this.getNodes().flatMap(node => node.getInPorts());
    let allOutPorts = this.getNodes().flatMap(node => node.getOutPorts());
    for (let linkSchema of schema.links) {
      let linkModel = oldLinkModels.find(
        linkModel => linkModel.getID() == linkSchema.id
      );

      if (linkModel) {
        // link already exist
        console.log("link exist:");
        console.log(linkModel);
        oldLinkModels = oldLinkModels.filter(lnk => lnk != linkModel);
      } else {
        console.log("create link");
        let fromPort = allOutPorts.find(
          port => port.getID() == linkSchema.from
        );
        let toPort = allInPorts.find(port => port.getID() == linkSchema.to);

        if (fromPort && toPort) {
          this.addNewLink(linkSchema.id, fromPort, toPort);
        }
      }
    }
    // remove old links
    oldLinkModels.forEach(link => this.removeLink(link));
  }

  private addNewLink(id: string, fromPort: PortModel, toPort: PortModel) {
    if (fromPort && toPort) {
      const linkModel = new ServiceLinkModel(id, fromPort, toPort);
      fromPort.reportPosition();
      toPort.reportPosition();
      this.addLink(linkModel);
    }
  }
}
