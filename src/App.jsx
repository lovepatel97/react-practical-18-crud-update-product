import React, { useState } from "react";

function App() {
  const [products, setProducts] = useState([
    { id: 101, name: "Dell 24\" FHD Monitor", price: 9999, category: "Displays", stock: 15 },
    { id: 102, name: "Logitech MX Master 3S", price: 7495, category: "Peripherals", stock: 28 },
    { id: 103, name: "Sony WH-1000XM5", price: 26990, category: "Audio", stock: 8 },
  ]);

  // Selected product being edited
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
  });

  const [message, setMessage] = useState("");

  const handleSelectProductForEdit = (product) => {
    setEditingId(product.id);
    setEditForm({
      name: product.name,
      price: product.price,
      category: product.category,
      stock: product.stock,
    });
    setMessage(`Editing Product #${product.id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.price) {
      alert("Please fill in valid name and price.");
      return;
    }

    // Update product in list state
    setProducts((prev) =>
      prev.map((item) =>
        item.id === editingId
          ? {
              ...item,
              name: editForm.name.trim(),
              price: parseFloat(editForm.price),
              category: editForm.category,
              stock: parseInt(editForm.stock, 10) || 0,
            }
          : item
      )
    );

    setMessage(`✅ Product #${editingId} successfully updated!`);
    setEditingId(null);
  };

  const handleCancel = () => {
    setEditingId(null);
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <header className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Practical 18: Product Management (Update Operation)
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Select any product from the catalog below, modify its details in the edit form, and commit updates to state.
          </p>
        </header>

        {message && (
          <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2.5 rounded-xl text-sm font-medium">
            {message}
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6">
          {/* Edit Form */}
          <div className="bg-white p-6 rounded-2xl shadow-md h-fit">
            <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
              <span>✏️</span> Edit Product
            </h2>

            {editingId ? (
              <form onSubmit={handleUpdate} className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Product ID
                  </label>
                  <input
                    type="text"
                    value={`#${editingId}`}
                    disabled
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-2 text-sm text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={editForm.price}
                    onChange={handleInputChange}
                    min="1"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-blue-500 focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Category
                  </label>
                  <select
                    name="category"
                    value={editForm.category}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm bg-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="Displays">Displays</option>
                    <option value="Peripherals">Peripherals</option>
                    <option value="Audio">Audio</option>
                    <option value="Storage">Storage</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={editForm.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-3 bg-gray-200 text-gray-700 py-2 rounded-lg font-semibold text-sm hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 text-gray-400">
                <p className="text-3xl mb-2">👈</p>
                <p className="text-sm">Click "Edit" on any product to update its details.</p>
              </div>
            )}
          </div>

          {/* Product Listing Table */}
          <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Products Inventory ({products.length})
            </h2>

            <div className="space-y-3">
              {products.map((p) => (
                <div
                  key={p.id}
                  className={`p-4 rounded-xl border transition flex justify-between items-center ${
                    editingId === p.id
                      ? "border-blue-500 bg-blue-50 shadow-sm"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-800">{p.name}</h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                        #{p.id}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Category: {p.category} • In Stock: {p.stock} units
                    </p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-blue-600 text-lg">₹{p.price}</span>
                    <button
                      onClick={() => handleSelectProductForEdit(p)}
                      className="bg-blue-600 text-white px-3.5 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
