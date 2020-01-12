import {
  DefaultPortModel,
  PortModelAlignment
} from "@projectstorm/react-diagrams";
import { PortSchema } from "./schema";

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

  isInput(): boolean {
    return this.options.in as boolean;
  }

  isEqualToSchema(schema: PortSchema): boolean {
    return (
      this.options.id == schema.id &&
      this.options.in == schema.input &&
      this.getName() == schema.name
    );
  }
}
