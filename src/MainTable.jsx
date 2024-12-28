import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useFetchItems from "./hooks/FetchItemsHook";
import ReactLoading from "react-loading";
import api from "./hooks/AxiosInstans";

const MainTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [query, setQuery] = useState("");
	const [shownData, setShowwnData] = useState([]);
	const { data, isLoading } = useFetchItems(`/items?page=${currentPage}&limit=10`);

	useEffect(() => {
		setShowwnData(data?.items);
	}, [data]);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleSearch = async () => {
		const response = await api.get(`/search?name=${query}`);
		if (response) setShowwnData(response.data);
		console.log(response);
	};

	const handleReset = () => {
		setQuery("");
		setShowwnData(data?.items);
	};

	useEffect(() => {
		console.log(shownData);
		console.log(data);
	}, [shownData, data]);

	return (
		<div className="relativ0e">
			<header className="h-fit w-full bg-white border-b drop-shadow-md mb-6 py-3 px-3 flex flex-row">
				<img src="/logo.png" alt="" className="h-[60px]" />
			</header>
			<div className="p-4">
				<div className="flex flex-row justify-around items-center">
					<div className=" flex flex-row justify-center py-5 gap-3">
						<input
							type="text"
							value={query}
							onChange={(e) => {
								setQuery(e.target.value);
							}}
						/>
						<button
							className="bg-[#F28A0A] text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-orange-600"
							onClick={handleSearch}
						>
							<span>Пошук</span>
						</button>
						<button
							className="bg-[#1B1B1B] text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-orange-600"
							onClick={handleReset}
						>
							<span>Скинути</span>
						</button>
					</div>
					<Link to={"/add"}>
						<div className="h-[40px] w-[40px] p-1 bg-[#F28A0A] rounded-full flex justify-center items-center cursor-pointer">
							<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path d="M4 12H20M12 4V20" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>{" "}
								</g>
							</svg>
						</div>
					</Link>
				</div>
				<table className="min-w-full table-auto !rounded-md overflow-scroll w-full">
					<thead>
						<tr className=" bg-[#F28A0A] rounded-t-md text-white">
							<th className=" px-4 py-2">#</th>
							<th className=" px-4 py-2">Артикул</th>
							<th className=" px-4 py-2">Фото</th>
							<th className=" px-4 py-2">Назва</th>
							<th className=" px-4 py-2">Ціна</th>
							<th className=" px-4 py-2">Посилання</th>
						</tr>
					</thead>
					<tbody className=" border">
						{isLoading ? (
							<tr className="border w-full">
								<td colSpan="3" className="w-full">
									<div className="flex justify-center items-center pl-[150px] h-[150px]">
										<ReactLoading type="cylon" color="#f28a0a" height={100} width={100} />
									</div>
								</td>
							</tr>
						) : (
							shownData?.map((item, index) => (
								<tr key={item._id} className=" border-b">
									<td className="  px-4 py-2">{index + 1 + (currentPage - 1) * 10}</td>
									<td className=" px-4 py-2">{item.sku}</td>
									<td className=" px-4 py-2">
										<img src={item.images[0]} alt="" className="w-[70px] mx-auto" />
									</td>
									<td className=" px-4 py-2 text-left pl-10">{item.name}</td>
									<td className=" px-4 py-2">{item.price} грн</td>
									<Link key={item._id} to={`/item/${item._id}`} className=" box-border w-full">
										<td className="  px-4 py-2 my-auto">
											<button className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2 hover:bg-orange-600">
												<span>Редагувати</span>
											</button>
										</td>
									</Link>
								</tr>
							))
						)}
					</tbody>
				</table>
				{!(query?.length > 0) ? (
					<div className="flex justify-center mt-4">
						<button
							className="px-4 py-2 border rounded-l bg-gray-200"
							disabled={currentPage === 1}
							onClick={() => handlePageChange(currentPage - 1)}
						>
							<svg
								fill="#000000"
								height="20px"
								width="20px"
								version="1.1"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								xlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 330 330"
								space="preserve"
								transform="rotate(180)"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										id="XMLID_222_"
										d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"
									></path>{" "}
								</g>
							</svg>
						</button>
						<span className="px-4 py-2 border">
							{currentPage} / {data?.totalPages}
						</span>
						<button
							className="px-4 py-2 border rounded-r bg-gray-200"
							disabled={currentPage === data?.totalPages}
							onClick={() => handlePageChange(currentPage + 1)}
						>
							<svg
								fill="#000000"
								height="20px"
								width="20px"
								version="1.1"
								id="Layer_1"
								xmlns="http://www.w3.org/2000/svg"
								xlink="http://www.w3.org/1999/xlink"
								viewBox="0 0 330 330"
								rotate={180}
								space="preserve"
							>
								<g id="SVGRepo_bgCarrier" stroke-width="0"></g>
								<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
								<g id="SVGRepo_iconCarrier">
									<path
										id="XMLID_222_"
										d="M250.606,154.389l-150-149.996c-5.857-5.858-15.355-5.858-21.213,0.001 c-5.857,5.858-5.857,15.355,0.001,21.213l139.393,139.39L79.393,304.394c-5.857,5.858-5.857,15.355,0.001,21.213 C82.322,328.536,86.161,330,90,330s7.678-1.464,10.607-4.394l149.999-150.004c2.814-2.813,4.394-6.628,4.394-10.606 C255,161.018,253.42,157.202,250.606,154.389z"
									></path>{" "}
								</g>
							</svg>
						</button>
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};

export default MainTable;
