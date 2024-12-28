import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams } from "react-router-dom";

const EditProductForm = () => {
	const [formData, setFormData] = useState({
		name: "",
		price: 0,
		discountedPrice: null,
		description: "",
		category: "",
		categoryUkr: "",
		stock: 0,
		brand: "",
		rating: 0,
		sku: "",
		images: [""],
	});
	const { id } = useParams();
	console.log(id);

	useEffect(() => {
		const fetchProduct = async () => {
			try {
				const { data } = await axios.get(`https://128autoapi.vercel.app/items/${id}`);
				setFormData({
					...data,
					discountedPrice: data.discountedPrice || "",
				});
			} catch (error) {
				toast.error("Не вдалося завантажити дані товару");
				console.error(error);
			}
		};

		fetchProduct();
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleImageChange = (index, value) => {
		const updatedImages = [...formData.images];
		updatedImages[index] = value;
		setFormData({ ...formData, images: updatedImages });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.patch(`https://128autoapi.vercel.app/items/${id}`, formData);
			toast.success("Товар успішно оновлено");
		} catch (error) {
			toast.error("Не вдалося оновити товар");
			console.error(error);
		}
	};

	return (
		<div>
			<header className="h-fit w-full bg-white border-b drop-shadow-md mb-6 py-3 px-3 flex flex-row">
				<img src="/logo.png" alt="" className="h-[60px]" />
			</header>
			<div className=" grid grid-cols-2 gap-3 mx-10 ">
				<img src={formData.images[0]} alt="alt" className="h-[300px] ml-[150px] mt-[150px]" />
				<form onSubmit={handleSubmit} className="w-full mx-auto bg-white shadow-md rounded p-6 space-y-4">
					<ToastContainer />
					<h1 className="text-xl font-bold text-center">Редагування Товару</h1>
					<div className="grid grid-cols-2 gap-4">
						<input type="text" name="name" placeholder="Назва" value={formData.name} onChange={handleInputChange} className="input-field" />
						<input type="number" name="price" placeholder="Ціна" value={formData.price} onChange={handleInputChange} className="input-field" />
						<input
							type="number"
							name="discountedPrice"
							placeholder="Знижена ціна"
							value={formData.discountedPrice}
							onChange={handleInputChange}
							className="input-field"
						/>
						<textarea
							name="description"
							placeholder="Опис"
							value={formData.description}
							onChange={handleInputChange}
							className="input-field col-span-2 h-[250px]"
						/>
						<input
							type="text"
							name="category"
							placeholder="Категорія"
							value={formData.category}
							onChange={handleInputChange}
							className="input-field"
						/>
						<input
							type="text"
							name="categoryUkr"
							placeholder="Категорія (укр)"
							value={formData.categoryUkr}
							onChange={handleInputChange}
							className="input-field"
						/>
						<input
							type="number"
							name="stock"
							placeholder="Кількість на складі"
							value={formData.stock}
							onChange={handleInputChange}
							className="input-field"
						/>
						<input type="text" name="brand" placeholder="Бренд" value={formData.brand} onChange={handleInputChange} className="input-field" />
						<input
							type="number"
							step="0.1"
							name="rating"
							placeholder="Рейтинг"
							value={formData.rating}
							onChange={handleInputChange}
							className="input-field"
						/>
						<input type="text" name="sku" placeholder="Артикул" value={formData.sku} onChange={handleInputChange} className="input-field" />
					</div>

					<div>
						{formData.images.map((image, index) => (
							<div key={index} className="flex items-center gap-2 mb-2">
								<input
									type="text"
									name="images"
									placeholder={`Зображення ${index + 1}`}
									value={image}
									onChange={(e) => handleImageChange(index, e.target.value)}
									className="input-field flex-grow"
								/>
								<button
									type="button"
									onClick={() => {
										const updatedImages = formData.images.filter((_, i) => i !== index);
										setFormData({ ...formData, images: updatedImages });
									}}
									className="text-red-500 hover:underline"
								>
									Видалити
								</button>
							</div>
						))}
						<button
							type="button"
							onClick={() => setFormData({ ...formData, images: [...formData.images, ""] })}
							className="block w-full py-2 text-center text-blue-500 hover:underline"
						>
							Додати зображення
						</button>
					</div>

					<button type="submit" className="w-full py-2 text-white bg-blue-500 hover:bg-blue-600 rounded">
						Зберегти
					</button>
				</form>
			</div>
		</div>
	);
};

export default EditProductForm;
