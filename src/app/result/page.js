/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowLeft, IconPlus, IconMessageQuestion, IconUserFilled, IconDotsVertical, IconDots, IconTrash, IconQuestionMark, IconToolsKitchen2, IconQrcode, IconCaretDownFilled, IconCaretUpFilled } from '@tabler/icons-react';
import ScrollableFeed from 'react-scrollable-feed';
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useEffect, useRef, useState } from 'react';
import dataMakanan from './data-makanan.json';
import React from 'react';
import Loading from '@/components/loading';

export default function Result() {
	const isTall = useViewportHeight(888);
	const containerRef = useRef(null);
	const [selectedMakanan, setSelectedMakanan] = useState(dataMakanan[0]);
	// const selectedMakanan = dataMakanan[1];
	// const warna = "bg-[" + selectedMakanan.warna + "]";
	const warna = 'bg-[#FF7518]';
	const [showEdukasi, setShowEdukasi] = useState(false);
	const [showQR, setShowQR] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const fetchVec = async (vec) => {
		console.log('vec', vec);
		const response = await fetch('/api/menu', {
			method: 'POST',
			body: JSON.stringify({ vec: vec }),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		console.log('data', data);
		if (data.error) {
			console.error('Error fetching menu:', data.error);
		}

		setSelectedMakanan(dataMakanan[data.menu]);

		setIsLoading(false);

		return data;
	};

	useEffect(() => {
		const vec = sessionStorage.getItem('vec');

		if (vec) {
			fetchVec(vec);
		}
	}, []);

	useEffect(() => {
		setTimeout(() => {
			if (containerRef.current) {
				const scrollableElement = containerRef.current.querySelector('.scroll-feed');
				if (scrollableElement) {
					scrollableElement.scrollTo({
						top: 0,
						behavior: 'smooth',
					});
				}
			}
		}, 100);
	}, []);

	return (
		<div
			ref={containerRef}
			className="h-full w-full"
		>
			<Loading isLoading={isLoading} />

			{!isLoading && (
				<ScrollableFeed className={`relative flex h-full w-full flex-col items-center justify-between bg-white px-4 py-8 shadow-xl ${isTall ? 'rounded-3xl' : ''} overflow-hidden`}>
					{/* Image background */}
					<img
						src="/elements/resultbg.svg"
						alt="Background"
						className="absolute top-0 z-0 h-full w-full object-cover"
					/>
					<div className="z-10 flex w-full flex-col items-center space-y-2">
						<div className="flex w-full justify-between px-2">
							<Link
								href="/select-profile"
								className="rounded-full bg-[#D1DD25] p-2"
							>
								<IconArrowLeft
									size={24}
									strokeWidth={3}
								/>
							</Link>
							<div className="cursor-not-allowed rounded-full bg-[#D1DD25] p-2">
								<IconQuestionMark
									size={24}
									strokeWidth={3}
								/>
							</div>
						</div>

						<div className="!mt-0 flex w-full flex-row space-x-4 px-8 text-white">
							<IconToolsKitchen2
								size={90}
								strokeWidth={2}
							/>
							<div className="flex flex-col justify-center space-y-0 text-white">
								<p className="text-3xl font-bold">Menu untuk Anda</p>
								<p className="text-sm font-medium">Menu dibuat berdasarkan analisis kebutuhan gizi Anda.</p>
							</div>
						</div>

						<div className="absolute top-[10.3rem] h-1 w-full rounded-full bg-gray-400">
							<div className="transition-width relative h-1 w-full rounded-full bg-[#FF7518] duration-100">
								<div className="absolute bottom-1/2 right-0 h-4 w-4 translate-y-1/2 rounded-full bg-[#FF7518]" />
							</div>
						</div>

						<div className="flex w-full flex-col space-y-2">
							<div className="!mt-8 flex h-[18rem] w-full flex-col space-y-2 overflow-hidden rounded-xl bg-white shadow-xl">
								<div className={`h-[70%] w-full ${warna} rounded-b-xl`}></div>
								<div className="flex w-full flex-col px-3 pb-3">
									<p className="text-xl font-bold">{selectedMakanan?.nama}</p>
									<p className="text-xs">{selectedMakanan?.deskripsi}</p>
								</div>
							</div>

							<div className={`w-full ${warna} relative flex flex-col items-center justify-center space-y-1 overflow-hidden rounded-xl pb-[36px] pt-2 font-medium text-white shadow-xl`}>
								<div className="absolute top-[50px] h-0.5 w-[93%] rounded-full bg-white" />
								<table className="w-[93%] text-left">
									<thead className="relative h-[14%] w-full text-xl">
										<tr className="h-full w-full font-bold">
											<th className="w-2/4">Nutrisi</th>
											<th className="w-1/4">Jumlah</th>
											<th className="w-1/4">%AKG</th>
										</tr>
									</thead>
									<tbody className="w-full text-sm">
										{/* Blank row */}
										<tr className="h-[1rem] w-full">
											<td
												colSpan="3"
												className="text-center"
											></td>
										</tr>
										{selectedMakanan?.nutrisi.map((item, index) => (
											<React.Fragment key={index}>
												<tr className="h-[1rem] w-full font-bold">
													<td className="w-2/4">{item.nama_nutrisi}</td>
													<td className="w-1/4">{item.jumlah}</td>
													<td className="w-1/4">{item.akg}</td>
												</tr>
												{/* "Done" row after each item */}
												<tr className={`h-[1rem] w-full ${showEdukasi ? '' : 'hidden'}`}>
													<td
														colSpan="3"
														className="text-start text-xs"
													>
														{item.edukasi}
													</td>
												</tr>
											</React.Fragment>
										))}
									</tbody>
								</table>
								<div
									className="absolute bottom-4 right-1/2 translate-x-1/2 translate-y-1/2 cursor-pointer text-white"
									onClick={() => {
										setShowEdukasi(!showEdukasi);
									}}
								>
									{showEdukasi ? (
										<IconCaretUpFilled
											size={24}
											strokeWidth={2}
											className="animate-bounce"
										/>
									) : (
										<IconCaretDownFilled
											size={24}
											strokeWidth={2}
											className="animate-bounce"
										/>
									)}
								</div>
							</div>

							<div className="relative flex w-full flex-col overflow-hidden rounded-xl bg-white shadow-xl">
								<div className={`z-10 flex h-[5rem] flex-row space-x-2 rounded-xl ${showQR ? 'shadow-xl' : ''}`}>
									<div className="flex aspect-square h-full items-center justify-center rounded-xl bg-[#0bb4ac]">
										<IconQrcode
											size={50}
											strokeWidth={2}
											className="text-white"
										/>
									</div>
									<div className="flex h-full flex-col justify-center px-3 pb-[24px]">
										<p className="text font-bold">QR Code</p>
										<p className="!mb-1 text-xs">Klik untuk menampilkan verifikasi scan makanan.</p>
									</div>
								</div>
								<div className={`h-[36rem] w-full bg-white ${showQR ? '' : 'hidden'} relative flex items-center justify-center`}>
									<p className="absolute top-12 text-center text-xl font-semibold">
										Tunjukkan QR ini pada staff
										<br />
										Makan Bergizi Gratis
									</p>
									<div className="h-60 w-60 bg-black"></div>
									<div className="absolute bottom-12 w-[80%] rounded-xl border border-gray-300 px-3 py-2">
										<p className="text-xs">
											<span className="font-bold text-red-500">Note: </span>Pastikan menu yang Anda terima sesuai dengan yang diberikan oleh aplikasi.
										</p>
									</div>
								</div>
								<div
									className="absolute bottom-4 right-1/2 z-20 translate-x-1/2 translate-y-1/2 cursor-pointer text-black"
									onClick={() => {
										setShowQR(!showQR);
									}}
								>
									{showQR ? (
										<IconCaretUpFilled
											size={24}
											strokeWidth={2}
											className="animate-bounce"
										/>
									) : (
										<IconCaretDownFilled
											size={24}
											strokeWidth={2}
											className="animate-bounce"
										/>
									)}
								</div>
							</div>
						</div>
					</div>
				</ScrollableFeed>
			)}
		</div>
	);
}
