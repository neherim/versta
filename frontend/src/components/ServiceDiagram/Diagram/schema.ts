export interface PointSchema {
  x: number,
  y: number
}

export interface LinkSchema {
  id: string,
  from: string,
  to: string,
  points: PointSchema[]
}

export interface PortSchema {
  id: string,
  name: string,
  input: boolean
}

export interface ServiceSchema {
  id: string,
  name: string,
  position: PointSchema,
  ports: PortSchema[],
}

export interface ProjectSchema {
  services: ServiceSchema[];
  links: LinkSchema[];
}
