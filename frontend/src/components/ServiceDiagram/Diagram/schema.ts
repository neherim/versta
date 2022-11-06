export interface Point {
    x: number,
    y: number
}

export interface LinkSchema {
    id: string,
    from: string,
    to: string,
    points: Point[]
}

export interface PortSchema {
    id: string,
    name: string,
    input: boolean
}

export interface ServiceSchema {
    id: string,
    name: string,
    position: Point,
    ports: PortSchema[],
}

export class ProjectSchema {
    services: ServiceSchema[];
    links: LinkSchema[];

    constructor(json: any) {
        this.services = json.services;
        this.links = json.links;
    }

    getService(name: string): ServiceSchema | undefined {
        return this.services.find(schema => schema.name === name)
    }
}
