/* import "./ServiceDiagramWidget.css"; */
import React from "react";
import axios from "axios";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DiagramToolbar } from "./Toolbar/DiagramToolbar";
import styled from "@emotion/styled";
import createEngine, {
  RightAngleLinkFactory
} from "@projectstorm/react-diagrams";
import { ServiceDiagramModel } from "./ServiceDiagramModel";
import { ProjectSchema } from "./schema";
import {
  schemaExample1,
  schemaExample15,
  schemaExample2
} from "./ServiceDiagramModelUpdater";

const FullscreenCanvas = styled(CanvasWidget)`
  height: 100%;
  width: 100%;
`;

export const ServiceDiagramWidget: React.FC = () => {
  const engine = createEngine();
  const model = new ServiceDiagramModel();
  model.setGridSize(15);
  engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());
  engine.setModel(model);
  engine.registerListener({
    eventWillFire(event: any) {
      console.log(event);
    }
  });

  // diagramUpdater.updateModel();
  // setInterval(updateSchema, 1000);

  function updateSchema() {
    onDeserialization();
    // (engine.getModel() as ServiceDiagramModel).changeAllLinksToRightAngle();
    // engine.repaintCanvas();

    // if (diagramUpdater.updateModel()) {
    //   console.log("Schema updated");
    //   engine.repaintCanvas();
    // }
  }

  function handleZoomIn() {
    engine.getModel().setZoomLevel(model.getZoomLevel() + 20);
    engine.repaintCanvas();
  }

  function handleZoomOut() {
    engine.getModel().setZoomLevel(model.getZoomLevel() - 20);
    engine.repaintCanvas();
  }

  function handleZoomToFit() {
    engine.zoomToFit();
  }

  function onSerialization() {
    console.log(engine.getModel().serialize());
  }

  function onDeserialization() {
    // axios.get("/api/v1/demo")
    //      .then(response => {
    //          const newModel = new ServiceDiagramModel();
    //          newModel.deserializeModel(response.data, engine);
    //          engine.setModel(newModel);
    //      });

      /* const newModel = new ServiceDiagramModel();
       * newModel.deserializeModel(serializeExample, engine);
       * engine.setModel(newModel); */
  }

  function onSchema1() {
    let schema = new ProjectSchema(schemaExample1);
    (engine.getModel() as ServiceDiagramModel).updateSchema(schema);
    engine.repaintCanvas();
  }

  function onSchema2() {
    let schema = new ProjectSchema(schemaExample15);
    (engine.getModel() as ServiceDiagramModel).updateSchema(schema);
    engine.repaintCanvas();
  }

  return (
    <div className="service-diagram">
      <DiagramToolbar
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onZoomToFit={handleZoomToFit}
        onDeserialization={onDeserialization}
        onSerialization={onSerialization}
        onSchema1={onSchema1}
        onSchema2={onSchema2}
      />
      <FullscreenCanvas className="diagram-container" engine={engine} />
    </div>
  );
};
