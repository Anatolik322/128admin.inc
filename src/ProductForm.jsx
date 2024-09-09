import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discountedPrice: "",
    dropPrice: "",
    description: "",
    category: "",
    categoryUkr: "",
    stock: "",
    brand: "",
    sku: "",
    rating: "",
    images: ["", ""],
  });

  const api = axios.create({
    baseURL: "https://128autoapi.vercel.app",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({ ...formData, images: newImages });
  };

  const validateForm = () => {
    let formErrors = {};
    if (!formData.name) formErrors.name = "Назва товару є обов'язковою";
    if (!formData.price || isNaN(formData.price))
      formErrors.price = "Введіть дійсну ціну";
    if (!formData.stock || isNaN(formData.stock))
      formErrors.stock = "Введіть кількість на складі";
    if (!formData.brand) formErrors.brand = "Введіть бренд";
    if (!formData.sku) formErrors.sku = "Введіть артикул";
    if (!formData.description) formErrors.description = "Введіть опис товару";

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await api.post("/items", formData);
      setSuccess(true);
      toast.success("Товар додано!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
      });
      setFormData({
        name: "",
        price: "",
        discountedPrice: "",
        dropPrice: "",
        description: "",
        category: "",
        categoryUkr: "",
        stock: "",
        brand: "",
        sku: "",
        rating: "",
        images: ["", ""], // Resetting images array
      });
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "20px",
        padding: "30px",
      }}
    >
      <ToastContainer />
      <h1>Панель Адміністратора</h1>

      <input
        type="text"
        name="name"
        placeholder="Назва"
        value={formData.name}
        onChange={handleInputChange}
        style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          fontSize: "16px",
          width: "100%",
          boxSizing: "border-box",
          outline: "none",
          transition: "border-color 0.3s ease-in-out",
        }}
      />
      <input
        type="number"
        name="price"
        placeholder="Ціна"
        value={formData.price}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      <input
        type="number"
        name="discountedPrice"
        placeholder="Знижена ціна"
        value={formData.discountedPrice}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      <textarea
        name="description"
        placeholder="Опис"
        value={formData.description}
        onChange={handleInputChange}
        style={{
          gridColumn: "1 / span 2",
          padding: "10px",
          marginBottom: "10px",
        }}
      />
      <input
        type="text"
        name="category"
        placeholder="Категорія"
        value={formData.category}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      <input
        type="text"
        name="categoryUkr"
        placeholder="Категорія (укр)"
        value={formData.categoryUkr}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      <input
        type="number"
        name="stock"
        placeholder="Кількість на складі"
        value={formData.stock}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      <input
        type="text"
        name="brand"
        placeholder="Бренд"
        value={formData.brand}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Рейтинг"
        value={formData.rating}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      <input
        type="text"
        name="sku"
        placeholder="Артикул"
        value={formData.sku}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      <input
        type="text"
        name="dropPrice"
        placeholder="Дроп ціна"
        value={formData.dropPrice}
        onChange={handleInputChange}
        style={{ padding: "10px" }}
      />
      {formData.images.map((image, index) => (
        <input
          key={index}
          type="text"
          name="images"
          placeholder={`Зображення ${index + 1}`}
          value={image}
          onChange={(e) => handleImageChange(index, e.target.value)}
          style={{
            gridColumn: "1 / span 2",
            padding: "10px",
            marginBottom: "10px",
          }}
        />
      ))}
      <button
        type="button"
        onClick={() =>
          setFormData({ ...formData, images: [...formData.images, ""] })
        }
        style={{
          gridColumn: "1 / span 2",
          padding: "10px",
          marginBottom: "10px",
        }}
      >
        Додати зображення
      </button>
      <button
        type="submit"
        style={{
          gridColumn: "1 / span 2",
          padding: "10px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          cursor: "pointer",
        }}
      >
        Додати товар
      </button>
    </form>
  );
};

export default ProductForm;
