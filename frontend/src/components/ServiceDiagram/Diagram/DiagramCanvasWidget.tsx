import React from "react";
import {ServiceDiagram} from "../Model/ServiceDiagram";
import {css} from "@emotion/core";
import styled from "@emotion/styled";
import {CanvasWidget} from "@projectstorm/react-canvas-core";

interface DiagramCanvasProps {
  diagram: ServiceDiagram;
  showGrid: boolean;
}

export const DiagramCanvas: React.FC<DiagramCanvasProps> = ({
    diagram,
    showGrid
  }) => {
  return (
    <FullscreenCanvas className="diagram-container"
                      engine={diagram.engine}
                      showGrid={showGrid}>
    </FullscreenCanvas>
  );
};

const FullscreenCanvas = styled(CanvasWidget)<{ showGrid: boolean }>`
  height: 100%;
  width: 100%;
  background: #333333;
 
  background-color: rgb(60, 60, 60) !important;
  background-size: 50px 50px;
  display: flex;

  > * {
    height: 100%;
    min-height: 100%;
    width: 100%;
  }  
  
  ${props => props.showGrid ? BackgroundGrid : ``};
`;

const BackgroundGrid = css`
background-image: linear-gradient(
				0deg,
				transparent 24%,
				rgba(255,255,255, 0.05) 25%,
				rgba(255,255,255, 0.05) 26%,
				transparent 27%,
				transparent 74%,
				rgba(255,255,255, 0.05) 75%,
				rgba(255,255,255, 0.05) 76%,
				transparent 77%,
				transparent
			),
			linear-gradient(
				90deg,
				transparent 24%,
				rgba(255,255,255, 0.05) 25%,
				rgba(255,255,255, 0.05) 26%,
				transparent 27%,
				transparent 74%,
				rgba(255,255,255, 0.05) 75%,
				rgba(255,255,255, 0.05) 76%,
				transparent 77%,
				transparent
			);
`;


