import { useNavigate } from "react-router-dom";
import "./AddComponentPage.css";

export function AddInventoryItemPage() {
  const navigate = useNavigate();

  return (
    <div className="add-component-container">
      <h1>Add New Component</h1>
      <p className="subtitle">Fill in the details to register a new PC component</p>

      <form className="component-form">
        <label>
          Name:
          <input type="text" placeholder="e.g. GeForce RTX 3080" />
        </label>

        <label>
          Brand:
          <input type="text" placeholder="e.g. NVIDIA" />
        </label>

        <label>
          Model:
          <input type="text" placeholder="e.g. Founders Edition" />
        </label>

        <label>
          Quantity:
          <input type="number" placeholder="e.g. 10" />
        </label>

        <button type="submit" className="submit-button">Add Component</button>
      </form>

      <button className="back-button" onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>
    </div>
  );
}
