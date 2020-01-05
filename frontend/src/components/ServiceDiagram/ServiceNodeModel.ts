import {DefaultNodeModel} from '@projectstorm/react-diagrams';
import {ServiceSchema, PortSchema} from "./schema"
import {ServicePortModel} from "./ServicePortModel"

export class ServiceNodeModel extends DefaultNodeModel {
    constructor(schema: ServiceSchema) {
        super(schema.name, "rgb(192,255,0)");
        this.updateFromSchema(schema);
    }

    updateFromSchema(schema: ServiceSchema) {
        this.removeOldPorts(schema);
        this.addNewPorts(schema);
    }

    getName(): string {
        return this.options.name as string;
    }

    getAllPorts() : ServicePortModel[] {
        return (Object.values(this.getPorts())) as ServicePortModel[]
    }

    getPortByName(name: string) : ServicePortModel | undefined {
        return this.getAllPorts().find(port => port.getName() === name);
    }


    private removeOldPorts(schema: ServiceSchema) {
        this.getAllPorts()
            .filter(port => !this.isPortExistInSchema(port, schema))
            .forEach(port => {
                console.log("remove port:");
                console.log(port);
                this.removePort(port)
            });
        this.getAllPorts().forEach(port => {
            console.log("rest:");
                console.log(port);
            port.reportPosition()
        });
    }

    private isPortExistInSchema(port: ServicePortModel, schema: ServiceSchema): boolean {
        return schema.ports.find(schemaPort => port.isEqualToSchema(schemaPort)) != undefined
    }

    private isPortExistInModel(schema: PortSchema): boolean {
        return this.getAllPorts().find(port => port.isEqualToSchema(schema)) != undefined
    }

    private addNewPorts(schema: ServiceSchema) {
        schema.ports
            .filter(port => !this.isPortExistInModel(port))
            .forEach ( port => this.addPort(new ServicePortModel(port)));
    }
}
