import { useState } from "react";
import "./EditInventoryItemPage.css";

export function EditInventoryItemPage() {
  // Mocked list of components
  const components = [
    { id: 1, name: "Ryzen 5 5600X", brand: "AMD", model: "100-100000065BOX", quantity: 10 },
    { id: 2, name: "Intel i7 12700K", brand: "Intel", model: "BX8071512700K", quantity: 5 },
    { id: 3, name: "Samsung 970 EVO Plus", brand: "Samsung", model: "MZ-V7S500B/AM", quantity: 12 },
  ];

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    model: "",
    quantity: "",
  });

  const handleComponentSelect = (id: number) => {
    const selected = components.find((c) => c.id === id);
    if (selected) {
      setSelectedId(id);
      setFormData({
        name: selected.name,
        brand: selected.brand,
        model: selected.model,
        quantity: String(selected.quantity),
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.brand || !formData.model || formData.quantity === "") {
      alert("Please complete all fields.");
      return;
    }

    console.log("Updated component:", { id: selectedId, ...formData });
    alert("Component updated!");
  };

  return (
    <>
      {/* Back Button placed outside the container */}
      <button className="back-button" onClick={() => window.history.back()}>
        ← Back to Dashboard
      </button>

      {/* Main Container */}
      <div className="edit-component-container">
        <h1>Edit Component</h1>

        <div className="form-group">
          <label>Select Component</label>
          <select
            value={selectedId ?? ""}
            onChange={(e) => handleComponentSelect(Number(e.target.value))}
          >
            <option value="" disabled>Select a component</option>
            {components.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {selectedId && (
          <form className="component-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Component Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Brand</label>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Model</label>
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Quantity</label>
              <input
                type="number"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-button">Update Component</button>
          </form>
        )}
      </div>
    </>
  );
}