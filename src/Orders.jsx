import React, { useState } from "react";
import useFetchItems from "./hooks/FetchItemsHook";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

function Orders() {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useFetchItems(`/orders`);
	console.log(data);

	return (
		<div>
			<header className="h-fit w-full bg-white border-b drop-shadow-md mb-6 py-3 px-3 flex flex-row items-center gap-12">
				<Link to={"/"}>
					<img src="/logo.png" alt="" className="h-[60px]" />{" "}
				</Link>
				<div className="flex flex-row gap-3">
					<Link to={"/"}>
						<span>Товари</span>
					</Link>
					<Link to={"/orders"}>
						<span>Замовлення</span>
					</Link>
				</div>
			</header>
			<div className="w-full px-12">
				<table className="min-w-full table-auto !rounded-md overflow-scroll w-full">
					<thead>
						<tr className=" bg-[#F28A0A] rounded-t-md text-white">
							<th className="px-4 py-2">#</th>
							<th className="px-4 py-2">Клієнт</th>
							<th className="px-4 py-2">Адрес</th>
							<th className="px-4 py-2">Відділення НП</th>
							<th className="px-4 py-2">Замовлення</th>
							<th className="px-4 py-2">Сума</th>
						</tr>
					</thead>
					<tbody className="border">
						{isLoading ? (
							<tr className="border w-full">
								<td colSpan="3" className="w-full">
									<div className="flex justify-center items-center pl-[150px] h-[150px]">
										<ReactLoading type="cylon" color="#f28a0a" height={100} width={100} />
									</div>
								</td>
							</tr>
						) : (
							data?.orders?.reverse()?.map((item, index) => {
								let sum = 0;
								let products = [];
								item?.items?.map((e) => {
									if (e.discountedPrice) {
										sum += e.discountedPrice;
									} else {
										sum += e.price;
									}
								});
								return (
									<tr key={item._id} className=" border-b">
										<td className="px-4 py-2">{index + 1 + (currentPage - 1) * 10}</td>
										<td className="px-4 py-2 text-left">{`${item.lastName} ${item.firstName} ${item.fatherName}`}</td>
										<td className="px-4 py-2 text-left pl-10">{item.city}</td>
										<td className="px-4 py-2">{item.postNumber}</td>
										<td className="px-4 py-2 w-fit">
											{item?.items?.map((e, i) => (
												<div className="flex flex-row items-center">
													<img src={e.images[0]} alt="" className="w-10" />
													<span className="w-fit">{e.name.slice(0, 10)}...</span>
												</div>
											))}
										</td>
										<td className="px-4 py-2">{sum} грн</td>
									</tr>
								);
							})
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default Orders;

const f = {
	_id: {
		$oid: "67345b9c20389a971701d7c2",
	},
	items: [
		{
			_id: "66e2ff579c9d6c24b3b84aab",
			name: "ПИЛОСОС АВТОМОБІЛЬНИЙ WINSO ВІД ПРИКУРЮВАЧА 110ВТ, 5,2КПА, ЧОРНИЙ",
			price: 700,
			discountedPrice: null,
			description:
				"Технічні характеристики<br/>\n\nНапруга: 12В<br/>\nПотужність: 110Вт<br/>\nМаксимальний вакуумний тиск: 5,2кПа<br/>\nЗапобіжник: 15А<br/>\nФільтр: HEPA<br/>\nДовжина кабелю живлення: 3м<br/>\nОб'єм пилозбірника: 500мл<br/>\nКолір: чорний<br/>\nМаса: 0,82кг<br/>\nРозмір упаковки: 395х110х140мм<br/>\nГарантія: 12 місяців<br/>\nКомплектація:<br/>\n1) насадка щілина для важкодоступних місць;<br/>\n2) щітка для очищення текстильних елементів;<br/>\n3) подовжувач для зручності використання інших насадок;<br/>\n4) високоякісна сумка для зберігання і транспортування.<br/>",
			category: "vacuum",
			categoryUkr: "Автопилососи",
			stock: 20,
			brand: "Winso",
			rating: 4,
			sku: "250200",
			images: [
				"https://opt.lido.ua/uploads/cache/CatalogItems/CatalogItems7233/0da29dcfa3-1_resize_1200x1200.jpeg",
				"https://opt.lido.ua/uploads/cache/CatalogItems/CatalogItems7233/384d6b137a-4_resize_1200x1200.jpeg",
				"https://opt.lido.ua/uploads/cache/CatalogItems/CatalogItems7233/5eaaaadb24-2_resize_1200x1200.jpeg",
				"https://opt.lido.ua/uploads/cache/CatalogItems/CatalogItems7233/7c7e10ad7a-5_resize_1200x1200.jpeg",
			],
			reviews: [
				{
					_id: "67345b0204086e9093071035",
					user: "Іван",
					comment: "Пилосос хороший, потужності вистачає для очищення салону.",
					rate: 5,
				},
			],
			__v: 0,
			quantity: 1,
		},
		{
			_id: "66df5037577e199aa330bec6",
			name: "МІНІ ПРОФЕСІЙНИЙ НАБІР ПО ДОГЛЯДУ ЗА АВТО K2 ",
			price: 1195,
			discountedPrice: 1100,
			description:
				"Набір складається з:<br/>\n\nЗасіб для очищення універсальний K2 APC Neutral Pro пляшка 1л D00011<br/>\nОчищувач для дисків та ковпаків K2 Roton Pro, 750мл <br/>\nОчищувач для вікон та скла K2 Nuta Pro 750мл<br/>\nАктивна піна K2 Bela Pro Blueberry для безконтактної мийки концентрат (лохина), 1л <br/>\nГубка-рукавичка з мікрофібри для ручного миття автомобіля K2 Wash Mitt<br/>\nЩітка ручна K2 для детейлінгу Detailing Brush 17мм <br/>\nГубка для миття авто CarLife GraphitePro з великими порами, 195x130x70мм ",
			category: "chemistry",
			categoryUkr: "Авто хімія",
			stock: 20,
			brand: "K2",
			rating: 5,
			sku: "na_162",
			images: [
				"https://opt.lido.ua/uploads/cache/CatalogItems/CatalogItems8765/200d760cb9-1_resize_1200x1200.jpeg",
				"https://opt.lido.ua/uploads/cache/CatalogItems/CatalogItems8765/ed75368694-5_resize_1200x1200.jpeg",
				"https://opt.lido.ua/uploads/cache/CatalogItems/CatalogItems8765/b18fbe358c-4_resize_1200x1200.jpeg",
				"https://opt.lido.ua/uploads/cache/CatalogItems/CatalogItems8765/967e955e9b-3_resize_1200x1200.jpeg",
			],
			reviews: [
				{
					_id: "67345b0f20389a971701d797",
					user: "Іван",
					comment: "Є все необхідне, окремо дякую за щіточку.",
					rate: 5,
				},
			],
			__v: 0,
			quantity: 1,
		},
	],
	firstName: "Денис",
	lastName: "Велит ",
	fatherName: "Валерійович",
	city: "Київ,Берестейський проспект 20А",
	street: "Київ,Берестейський проспект 20А",
	postNumber: 70,
	__v: 0,
};
