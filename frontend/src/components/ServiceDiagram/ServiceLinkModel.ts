import { RightAngleLinkModel, PortModel } from "@projectstorm/react-diagrams";

export class ServiceLinkModel extends RightAngleLinkModel {
  constructor(id: string, sourcePort: PortModel, targetPort: PortModel) {
    super({
      id: id,
      locked: true
    });
    this.setSourcePort(sourcePort);
    this.setTargetPort(targetPort);
  }
}
