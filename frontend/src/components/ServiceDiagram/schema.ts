export interface LinkSchema {
    fromPort: PortSchema,
    fromService: ServiceSchema,
    toPort: PortSchema,
    toService: ServiceSchema
}

export interface PortSchema {
    id: string,
    name: string,
    input: boolean
}

export interface ServiceSchema {
    name: string,
    ports: PortSchema[],
}


export class ProjectSchema {
    services: ServiceSchema[];
    links: LinkSchema[];

    constructor(json: any) {
        this.services = json.services;
        const ports = this.services.flatMap(service => service.ports.map(port => <any> {service: service, port: port}));
        this.links = (json.links as [any]).map(link => this.toLinkSchema(link, ports));
    }

    private toLinkSchema(link: any, ports: any[]): LinkSchema {
        const from = ports.find(p => p.port.id == link.from)
        const to = ports.find(p => p.port.id == link.to)

        if (from && to) {
            return {
                fromPort: from.port,
                fromService: from.service,
                toPort: to.port,
                toService: to.service
            }
        } else {
            throw new Error('Error in schema format. Errors in links');
        }
    }

    isServiceExist(name: string): boolean {
        return this.getService(name) !== undefined;
    }

    getService(name: string): ServiceSchema | undefined {
        return this.services.find(schema => schema.name === name)
    }
}
