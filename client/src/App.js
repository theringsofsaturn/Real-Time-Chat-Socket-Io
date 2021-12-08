import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

export const App = () => {
  return (
    <Router>
      <Route path="/" element={Join} />
      <Route path="/chat" element={Chat} />
    </Router>
  );
};
