import React from 'react';
import './App.css';
import {ServiceDiagramWidget} from "./ServiceDiagram/ServiceDiagramWidget";

const App: React.FC = () => {
  return (
    <div className="App">
      <ServiceDiagramWidget/>
    </div>
  );
};

export default App;
