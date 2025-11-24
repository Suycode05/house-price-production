import React, { useState } from "react";

const initialState = {
  // numeric
  LotArea: "",
  OverallQual: "",
  OverallCond: "",
  YearBuilt: "",
  GrLivArea: "",
  BedroomAbvGr: "",
  FullBath: "",
  HalfBath: "",
  GarageCars: "",
  GarageArea: "",
  TotalBsmtSF: "",
  "1stFlrSF": "",
  "2ndFlrSF": "",
  WoodDeckSF: "",
  MasVnrArea: "",

  // categorical
  Neighborhood: "",
  HouseStyle: "",
  Exterior1st: "",
  KitchenQual: "",
  GarageType: "",
};

const numericFields = [
  "LotArea",
  "OverallQual",
  "OverallCond",
  "YearBuilt",
  "GrLivArea",
  "BedroomAbvGr",
  "FullBath",
  "HalfBath",
  "GarageCars",
  "GarageArea",
  "TotalBsmtSF",
  "1stFlrSF",
  "2ndFlrSF",
  "WoodDeckSF",
  "MasVnrArea",
];

const HousePriceForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user types
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validate = () => {
    const newErrors = {};

    // Required: all fields must be filled
    Object.entries(formData).forEach(([key, value]) => {
      if (value === "" || value === null) {
        newErrors[key] = "Required";
      }
    });

    // Numeric checks
    numericFields.forEach((field) => {
      const val = formData[field];
      if (val !== "" && isNaN(Number(val))) {
        newErrors[field] = "Must be a number";
      } else if (val !== "" && Number(val) < 0) {
        newErrors[field] = "Cannot be negative";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPredictedPrice(null);
    setApiError("");

    if (!validate()) return;

    setLoading(true);
    try {
      // Convert numeric fields to numbers
      const payload = { ...formData };
      numericFields.forEach((field) => {
        payload[field] = Number(payload[field]);
      });

      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const text = await res.text();
console.log("RAW RESPONSE TEXT:", text);

let data;
try {
  data = JSON.parse(text);
} catch (err) {
  console.error("JSON PARSE ERROR:", err);
  setApiError("Server returned invalid JSON.");
  setLoading(false);
  return;
}

console.log("PARSED JSON:", data);

if (!("predicted_price" in data)) {
  console.error("Missing predicted_price key");
  setApiError("Invalid response from server.");
  setLoading(false);
  return;
}

setPredictedPrice(data.predicted_price);


      setPredictedPrice(data.predicted_price);
    } catch (err) {
      console.error(err);
      setApiError(err.message || "Something went wrong while predicting.");
    } finally {
      setLoading(false);
    }
  };

  const renderError = (field) =>
    errors[field] ? <span className="field-error">{errors[field]}</span> : null;

  return (
    <div className="glass-card">
      <form className="form-grid" onSubmit={handleSubmit}>
        <h2>Property Details</h2>

        {/* ==== Numeric Inputs ==== */}
        <div className="field">
          <label>Lot Area (sq ft)</label>
          <input
            type="number"
            name="LotArea"
            value={formData.LotArea}
            onChange={handleChange}
            placeholder="e.g. 8450"
          />
          {renderError("LotArea")}
        </div>

        <div className="field">
          <label>Overall Quality (1–10)</label>
          <input
            type="number"
            name="OverallQual"
            value={formData.OverallQual}
            onChange={handleChange}
            min="1"
            max="10"
          />
          {renderError("OverallQual")}
        </div>

        <div className="field">
          <label>Overall Condition (1–10)</label>
          <input
            type="number"
            name="OverallCond"
            value={formData.OverallCond}
            onChange={handleChange}
            min="1"
            max="10"
          />
          {renderError("OverallCond")}
        </div>

        <div className="field">
          <label>Year Built</label>
          <input
            type="number"
            name="YearBuilt"
            value={formData.YearBuilt}
            onChange={handleChange}
            placeholder="e.g. 2003"
          />
          {renderError("YearBuilt")}
        </div>

        <div className="field">
          <label>Above Ground Living Area (GrLivArea)</label>
          <input
            type="number"
            name="GrLivArea"
            value={formData.GrLivArea}
            onChange={handleChange}
          />
          {renderError("GrLivArea")}
        </div>

        <div className="field">
          <label>Bedrooms Above Ground</label>
          <input
            type="number"
            name="BedroomAbvGr"
            value={formData.BedroomAbvGr}
            onChange={handleChange}
          />
          {renderError("BedroomAbvGr")}
        </div>

        <div className="field">
          <label>Full Bathrooms</label>
          <input
            type="number"
            name="FullBath"
            value={formData.FullBath}
            onChange={handleChange}
          />
          {renderError("FullBath")}
        </div>

        <div className="field">
          <label>Half Bathrooms</label>
          <input
            type="number"
            name="HalfBath"
            value={formData.HalfBath}
            onChange={handleChange}
          />
          {renderError("HalfBath")}
        </div>

        <div className="field">
          <label>Garage Cars</label>
          <input
            type="number"
            name="GarageCars"
            value={formData.GarageCars}
            onChange={handleChange}
          />
          {renderError("GarageCars")}
        </div>

        <div className="field">
          <label>Garage Area (sq ft)</label>
          <input
            type="number"
            name="GarageArea"
            value={formData.GarageArea}
            onChange={handleChange}
          />
          {renderError("GarageArea")}
        </div>

        <div className="field">
          <label>Total Basement SF</label>
          <input
            type="number"
            name="TotalBsmtSF"
            value={formData.TotalBsmtSF}
            onChange={handleChange}
          />
          {renderError("TotalBsmtSF")}
        </div>

        <div className="field">
          <label>1st Floor SF</label>
          <input
            type="number"
            name="1stFlrSF"
            value={formData["1stFlrSF"]}
            onChange={handleChange}
          />
          {renderError("1stFlrSF")}
        </div>

        <div className="field">
          <label>2nd Floor SF</label>
          <input
            type="number"
            name="2ndFlrSF"
            value={formData["2ndFlrSF"]}
            onChange={handleChange}
          />
          {renderError("2ndFlrSF")}
        </div>

        <div className="field">
          <label>Wood Deck SF</label>
          <input
            type="number"
            name="WoodDeckSF"
            value={formData.WoodDeckSF}
            onChange={handleChange}
          />
          {renderError("WoodDeckSF")}
        </div>

        <div className="field">
          <label>Masonry Veneer Area (MasVnrArea)</label>
          <input
            type="number"
            name="MasVnrArea"
            value={formData.MasVnrArea}
            onChange={handleChange}
          />
          {renderError("MasVnrArea")}
        </div>

        {/* ==== Categorical dropdowns ==== */}

        <div className="field">
          <label>Neighborhood</label>
          <select
            name="Neighborhood"
            value={formData.Neighborhood}
            onChange={handleChange}
          >
            <option value="">Select Neighborhood</option>
            <option value="CollgCr">CollgCr</option>
            <option value="Veenker">Veenker</option>
            <option value="Crawfor">Crawfor</option>
            <option value="NoRidge">NoRidge</option>
            <option value="Mitchel">Mitchel</option>
            {/* You can add more from dataset */}
          </select>
          {renderError("Neighborhood")}
        </div>

        <div className="field">
          <label>House Style</label>
          <select
            name="HouseStyle"
            value={formData.HouseStyle}
            onChange={handleChange}
          >
            <option value="">Select Style</option>
            <option value="1Story">1 Story</option>
            <option value="2Story">2 Story</option>
            <option value="1.5Fin">1.5 Finished</option>
            <option value="SLvl">Split Level</option>
            <option value="SFoyer">Split Foyer</option>
          </select>
          {renderError("HouseStyle")}
        </div>

        <div className="field">
          <label>Exterior</label>
          <select
            name="Exterior1st"
            value={formData.Exterior1st}
            onChange={handleChange}
          >
            <option value="">Select Exterior</option>
            <option value="VinylSd">Vinyl Siding</option>
            <option value="MetalSd">Metal Siding</option>
            <option value="HdBoard">Hard Board</option>
            <option value="Wd Sdng">Wood Siding</option>
            <option value="CemntBd">Cement Board</option>
          </select>
          {renderError("Exterior1st")}
        </div>

        <div className="field">
          <label>Kitchen Quality</label>
          <select
            name="KitchenQual"
            value={formData.KitchenQual}
            onChange={handleChange}
          >
            <option value="">Select Quality</option>
            <option value="Ex">Excellent</option>
            <option value="Gd">Good</option>
            <option value="TA">Typical/Average</option>
            <option value="Fa">Fair</option>
          </select>
          {renderError("KitchenQual")}
        </div>

        <div className="field">
          <label>Garage Type</label>
          <select
            name="GarageType"
            value={formData.GarageType}
            onChange={handleChange}
          >
            <option value="">Select Garage Type</option>
            <option value="Attchd">Attached</option>
            <option value="Detchd">Detached</option>
            <option value="BuiltIn">Built-In</option>
            <option value="Basment">Basement</option>
            <option value="CarPort">Car Port</option>
          </select>
          {renderError("GarageType")}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict Price"}
        </button>

        {apiError && <div className="api-error">{apiError}</div>}

        {predictedPrice !== null && !apiError && (
          <div className="result-box">
            <p>
              Estimated Sale Price:{" "}
              <span>${predictedPrice.toFixed(2)}</span>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default HousePriceForm;
