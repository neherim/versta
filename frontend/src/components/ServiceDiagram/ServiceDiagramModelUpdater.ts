import {ServiceDiagramModel} from "./ServiceDiagramModel";


export class ServiceDiagramModelUpdater {/*
  model: ServiceDiagramModel;
  cnt = 0;

  constructor(model: ServiceDiagramModel) {
    this.model = model;
  }

  updateModel() {
    const newSchema = this.requestNewSchema();
    if (this.schema == null || !this.isSchemasEquals(this.schema, newSchema)) {
      this.schema = newSchema;
      this.model.updateSchema(newSchema);
      return true;
    }
    return false;
  }

  private isSchemasEquals(schemaA: Schema, schemaB: Schema): boolean {
    return JSON.stringify(schemaA) === JSON.stringify(schemaB)
  }

  private requestNewSchema1(): Schema {
    if (this.cnt === 0) {
      console.log("schema1");
      this.cnt += 1;
      return schemaExample1;

    } else {
      console.log("schema2");
      return schemaExample2
    }
  }

  private requestNewSchema(): Schema {
    const a = Math.floor(Math.random() * 10) % 2 === 0;
    if (a) {
      console.log("schema1");
      return schemaExample1;
    } else {
      console.log("schema2");
      return schemaExample2;
    }
  }*/
}