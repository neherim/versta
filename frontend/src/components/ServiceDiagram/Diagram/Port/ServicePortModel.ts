import {DefaultPortModel, PortModelAlignment} from "@projectstorm/react-diagrams";
import {PortSchema} from "../schema";

export class ServicePortModel extends DefaultPortModel {
  constructor(schema?: PortSchema) {
    if (schema) {
      super({
        id: schema.id,
        in: schema.input,
        name: schema.name,
        label: schema.name,
        type: "service-port",
        locked: true,
        alignment: schema.input
          ? PortModelAlignment.LEFT
          : PortModelAlignment.RIGHT
      });
    } else {
      super({
        name: 'unknown',
        type: "service-port"
      });
    }
  }


  serializeToSchema(): PortSchema {
    return {
      id: this.getID(),
      name: this.options.name,
      input: this.options.in || false
    };
  }
}
