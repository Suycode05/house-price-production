import React from "react";
import HousePriceForm from "./components/HousePriceForm";

const App = () => {
  return (
    <div className="app-root">
      <div className="gradient-bg" />
      <div className="app-container">
        <header className="app-header">
          <h1>🏡 House Price Predictor</h1>
          <p>
            Enter property details and get an estimated sale price powered by your ML model.
          </p>
        </header>

        <HousePriceForm />
      </div>
    </div>
  );
};

export default App;
