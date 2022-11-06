import {DiagramEngine} from "@projectstorm/react-diagrams-core";
import createEngine, {RightAngleLinkFactory} from "@projectstorm/react-diagrams";
import {ProjectServiceDiagramModel} from "./ProjectSchemaDiagramModel";
import {ProjectSchema} from "./schema";

export class ProjectServiceDiagram {
  engine: DiagramEngine;

  constructor() {
    this.engine = createEngine();
    this.engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());
    this.engine.setModel(new ProjectServiceDiagramModel());
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

  public serialize() {
    this.getModel().serialize();
  }

  public startEdit() {
    console.log("Enter edit mode");
    this.getModel().unlock();
  }

  public saveChanges() {
    console.log("Leave edit mode");
    this.getModel().lock();
  }

  public isInEditMode() {
    return this.getModel().isLocked();
  }

  public updateSchema(newSchema: any) {
    let schema = new ProjectSchema(newSchema);
    let model = new ProjectServiceDiagramModel(schema);
    this.engine.setModel(model);
    this.engine.repaintCanvas();
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
  private getModel(): ProjectServiceDiagramModel {
    return this.engine.getModel() as ProjectServiceDiagramModel;
  }
}
