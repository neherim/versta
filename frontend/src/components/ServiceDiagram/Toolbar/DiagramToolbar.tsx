import React from "react";

interface ToolbarProps {
  onZoomIn: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onZoomOut: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onZoomToFit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSerialization: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onDeserialization: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSchema1: (event: React.MouseEvent<HTMLButtonElement>) => void;
  onSchema2: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DiagramToolbar: React.FC<ToolbarProps> =
  ({
     onZoomIn,
     onZoomOut,
     onZoomToFit,
     onSerialization,
     onDeserialization,
     onSchema1,
     onSchema2
   }) => {
    return (
      <div className="toolbar">
        <button onClick={onZoomIn}>zoom in</button>
        <button onClick={onZoomOut}>zoom out</button>
        <button onClick={onZoomToFit}>zoom to fit</button>
        <button onClick={onSerialization}>serialize</button>
        <button onClick={onDeserialization}>deserialize</button>
        <button onClick={onSchema1}>schema1</button>
        <button onClick={onSchema2}>schema2</button>
      </div>
    );
  };
