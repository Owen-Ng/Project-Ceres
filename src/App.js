import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import GroceryList from "./GroceryList"
import AdminToolBar from "./AdminToolBar"
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="container">
        <GroceryList/>
    </div>
  );
}

export default App;
