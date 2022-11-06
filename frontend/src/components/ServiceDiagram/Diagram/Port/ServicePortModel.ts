import {DefaultPortModel, PortModelAlignment} from "@projectstorm/react-diagrams";
import {PortSchema} from "../schema";

export class ServicePortModel extends DefaultPortModel {
  constructor(schema: PortSchema) {
    super({
      id: schema.id,
      in: schema.input,
      name: schema.name,
      label: schema.name,
      alignment: schema.input
        ? PortModelAlignment.LEFT
        : PortModelAlignment.RIGHT
    });
  }
}
