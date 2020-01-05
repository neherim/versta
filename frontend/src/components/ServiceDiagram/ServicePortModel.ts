import { DefaultPortModel, PortModelAlignment, LinkModel} from '@projectstorm/react-diagrams';
import {PortSchema} from "./schema"

export class ServicePortModel extends DefaultPortModel {
    constructor(schema: PortSchema){
        super({
            in: schema.input,
            name: schema.name,
            label: schema.name,
            alignment: schema.input ? PortModelAlignment.LEFT : PortModelAlignment.RIGHT
        })
    }

    isInput(): boolean {
        return this.options.in as boolean;
    }

    isEqualToSchema(schema: PortSchema): boolean {
        return this.options.in == schema.input && this.getName() == schema.name;
    }

    getLinkToPort(toPort: ServicePortModel): LinkModel | undefined {
     return undefined
    }
}
