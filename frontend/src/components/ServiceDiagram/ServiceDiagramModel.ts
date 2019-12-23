import {DiagramModel} from "@projectstorm/react-diagrams-core";
import {DeserializeEvent} from '@projectstorm/react-canvas-core';
import {RightAngleLinkModel} from "@projectstorm/react-diagrams";

export class ServiceDiagramModel extends DiagramModel {

  deserialize(event: DeserializeEvent<ServiceDiagramModel>): void {
    super.deserialize(event);
  }

  changeAllLinksToRightAngle() {
    this.getLinks()
      .filter(link => link.getType() !== "rightAngle")
      .forEach(link => {
        const newLinkModel = new RightAngleLinkModel();
        newLinkModel.setSourcePort(link.getSourcePort());
        newLinkModel.setTargetPort(link.getTargetPort());
        newLinkModel.setLocked(true);
        this.removeLink(link);
        newLinkModel.getSourcePort().reportPosition();
        newLinkModel.getTargetPort().reportPosition();
        this.addLink(newLinkModel);
      });
  }
}