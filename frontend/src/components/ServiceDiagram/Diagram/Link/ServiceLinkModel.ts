import {PointModel, PortModel, RightAngleLinkModel} from "@projectstorm/react-diagrams";
import {LinkSchema, PointSchema} from "../schema";


export class ServiceLinkModel extends RightAngleLinkModel {
  constructor(id: string, sourcePort: PortModel, targetPort: PortModel, pointSchemas: PointSchema[]) {
    super({
      id: id
    });

    this.points = [
      new PointModel({
        link: this
      }),
      ...pointSchemas.map(p => this.generatePoint(p.x, p.y)),
      new PointModel({
        link: this
      })];

    this.setSourcePort(sourcePort);
    this.setTargetPort(targetPort);
  }

  serializeToSchema(): LinkSchema {
    return {
      id: this.getID(),
      from: this.getSourcePort().getID(),
      to: this.getTargetPort().getID(),
      points: this.points
        .map(p => ({
            x: p.getX(),
            y: p.getY()
          } as PointSchema)
        )
        .slice(1, this.points.length - 1) // remove first and last points
    };
  }
}
