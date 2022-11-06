import {DiagramEngine} from "@projectstorm/react-diagrams-core";
import createEngine, {RightAngleLinkFactory} from "@projectstorm/react-diagrams";
import {ProjectDiagramModel} from "./ProjectDiagramModel";
import {ProjectSchema} from "./schema";
import {ServiceNodeFactory} from "./Node/ServiceNodeFactory";
import {ServicePortFactory} from "./Port/ServicePortFactory";

export class ProjectDiagram {
  engine: DiagramEngine;

  constructor() {
    this.engine = createEngine();
    this.engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());
    this.engine.getNodeFactories().registerFactory(new ServiceNodeFactory());
    this.engine.getPortFactories().registerFactory(new ServicePortFactory());
    this.engine.setModel(new ProjectDiagramModel());
  }

  public zoomIn() {
    this.getModel().setZoomLevel(this.getModel().getZoomLevel() + 20);
    this.engine.repaintCanvas();
  }

  public zoomOut() {
    this.getModel().setZoomLevel(this.getModel().getZoomLevel() - 20);
    this.engine.repaintCanvas();
  }

  public zoomToFit() {
    this.engine.zoomToFit();
  }

  public serializeModel(): any {
    return this.getModel().serialize();
  }

  public startEdit() {
    this.getModel().unlock();
  }

  public saveChanges() {
    this.getModel().lock();
  }

  public isInEditMode() {
    return this.getModel().isLocked();
  }

  public deserialize(newSchema: ProjectSchema) {
    let newModel = new ProjectDiagramModel(newSchema);
    this.engine.setModel(newModel);
    this.engine.repaintCanvas();
  }

  public serializeToSchema(): ProjectSchema {
    return this.getModel().serializeToSchema();
  }





  // axios.get("/api/v1/demo")
  //      .then(response => {
  //          const newModel = new ServiceDiagramModel();
  //          newModel.deserializeModel(response.data, engine);
  //          engine.setModel(newModel);
  //      });
  /* const newModel = new ServiceDiagramModel();
   * newModel.deserializeModel(serializeExample, engine);
   * engine.setModel(newModel); */
  private getModel(): ProjectDiagramModel {
    return this.engine.getModel() as ProjectDiagramModel;
  }
}
