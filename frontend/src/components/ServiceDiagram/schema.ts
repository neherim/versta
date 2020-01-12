export interface LinkSchema {
    id: string,
    from: string,
    to: string,
}

export interface PortSchema {
    id: string,
    name: string,
    input: boolean
}

export interface ServiceSchema {
    id: string,
    name: string,
    ports: PortSchema[],
}

export class ProjectSchema {
    services: ServiceSchema[];
    links: LinkSchema[];

    constructor(json: any) {
        this.services = json.services;
        this.links = json.links;
    }

    isServiceExist(name: string): boolean {
        return this.getService(name) !== undefined;
    }

    getService(name: string): ServiceSchema | undefined {
        return this.services.find(schema => schema.name === name)
    }
}
