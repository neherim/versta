import "./ServiceDiagramWidget.css"
import React from "react";
import axios from "axios";
import {CanvasWidget} from '@projectstorm/react-canvas-core';
import {DiagramToolbar} from "./Toolbar/DiagramToolbar";
import createEngine, {RightAngleLinkFactory} from "@projectstorm/react-diagrams";
import {ServiceDiagramModel} from "./ServiceDiagramModel";

export const ServiceDiagramWidget: React.FC = () => {

  const engine = createEngine();
  const model = new ServiceDiagramModel();

  engine.getLinkFactories().registerFactory(new RightAngleLinkFactory());
  engine.setModel(model);
  // diagramUpdater.updateModel();
   setInterval(updateSchema, 1000);

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

  function onDeserialization() {
    axios.get("/api/v1/services")
      .then(response => {
        const newModel = new ServiceDiagramModel();
        newModel.deserializeModel(response.data, engine);
        engine.setModel(newModel);

        setTimeout(() => {
          (engine.getModel() as ServiceDiagramModel).changeAllLinksToRightAngle();
          engine.repaintCanvas();
        }, 1000);
      });
  }

  function onSerialization() {
    (engine.getModel() as ServiceDiagramModel).changeAllLinksToRightAngle();
    engine.repaintCanvas();
  }

  return (
    <div className="service-diagram">
      <DiagramToolbar onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} onZoomToFit={handleZoomToFit}
                      onDeserialization={onDeserialization} onSerialization={onSerialization}/>
      <CanvasWidget className="diagram-container" engine={engine}/>
    </div>
  );
};