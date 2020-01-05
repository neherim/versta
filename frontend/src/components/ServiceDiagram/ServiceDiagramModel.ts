import {DiagramModel} from "@projectstorm/react-diagrams-core";
import {RightAngleLinkModel} from "@projectstorm/react-diagrams";
import {ProjectSchema} from "./schema"
import {ServiceNodeModel} from "./ServiceNodeModel"
import { ServicePortModel } from "./ServicePortModel";

export class ServiceDiagramModel extends DiagramModel {

    getNodes(): ServiceNodeModel[] {
        return super.getNodes() as ServiceNodeModel[]
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
            .forEach(service => this.addNode(new ServiceNodeModel(service)))
    }

    // -- Links --
    private updateLinks(schema: ProjectSchema) {
        let oldLinkModels  = [...this.getLinks()];
        for (let link of schema.links) {
            let fromPort = this.findPort(link.fromService.name, link.fromPort.name);
            let toPort = this.findPort(link.toService.name, link.toPort.name);
            if (fromPort && toPort) {
                let linkModel = fromPort.getLinkToPort(toPort)
                if (linkModel) {
                    // link already exist
                    oldLinkModels = oldLinkModels.filter(lnk => lnk == linkModel)
                } else {
                    this.addNewLink(fromPort, toPort);
                }
            }
        }
        // remove old links
        oldLinkModels.forEach(link => this.removeLink(link));
    }

    private addNewLink(fromPort: ServicePortModel, toPort: ServicePortModel) {
        if (fromPort && toPort) {
            const linkModel = new RightAngleLinkModel();
            linkModel.setSourcePort(fromPort);
            linkModel.setTargetPort(toPort);
            linkModel.setLocked(true);
            fromPort.reportPosition();
            toPort.reportPosition();
            this.addLink(linkModel);
        }
    }

    private findPort(nodeName: string, portName: string): ServicePortModel | undefined {
        let serviceNode = this.getNodes().find(node => node.getName() === nodeName);
        if (serviceNode) {
            return serviceNode.getPortByName(portName);
        }
    }
}
