/* eslint-disable @next/next/no-img-element */
'use client';
import { IconSearch, IconHome, IconSquares, IconNews, IconUser, IconSquaresFilled } from "@tabler/icons-react";
import ScrollableFeed from 'react-scrollable-feed'
import React, { useState, useEffect } from 'react';
import { useViewportHeight } from '@/hooks/useViewportHeight';

export default function Features() {
	const isTall = useViewportHeight(888);

	return (
		<div className={`w-full h-full relative shadow-2xl ${isTall ? "rounded-3xl" : ""} overflow-hidden`}>
			<div className={`absolute w-full max-w-[450px] h-20 bg-white bottom-0 z-30 flex flex-row justify-between px-2 text-gray-300 items-center ${isTall ? "rounded-b-3xl" : ""}`}>
				<div className="flex flex-col items-center w-1/4 cursor-not-allowed">
					<IconHome size={22} strokeWidth={1} />
					<p>Beranda</p>
				</div>
				<div className="flex flex-col items-center cursor-pointer w-1/4 text-[#5699fd] ">
					<IconSquaresFilled size={22} strokeWidth={1} />
					<p className="font-semibold">Fitur</p>
				</div>
				<div className="flex flex-col items-center w-1/4 cursor-not-allowed">
					<IconNews size={22} strokeWidth={1} />
					<p>Buletin</p>
				</div>
				<div className="flex flex-col items-center w-1/4 cursor-not-allowed">
					<IconUser size={22} strokeWidth={1} />
					<p>Profil</p>
				</div>
			</div>
			<ScrollableFeed
				className={`bg-[#fff8ff] w-full h-full flex flex-col items-center relative px-4 py-8 justify-between pb-32 ${isTall ? "rounded-3xl" : ""}`}
				forceScroll={false}
			>
				<div className="flex flex-col space-y-5 w-full z-10">
					<p className='text-2xl font-semibold'>Fitur</p>
					<div className='relative'>
						<IconSearch size={20} className="absolute bottom-1/2 translate-y-1/2 left-3 text-gray-400" />
						<input type="text" className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-2" placeholder="Cari fitur" />
					</div>
					<div className='flex flex-col space-y-10'>
						<div className='flex flex-col space-y-4'>
							<p className='font-semibold'>Kesehatan Anak</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-center text-nowrap'>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Tumbuh Anak</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Sert. Imunisasi</p>
								</div>
								<a className='rounded-full w-12 h-12 relative mx-auto items-center flex' href='/select-profile/'>
									<img src='/elements/logo.svg' className='w-14 h-14 relative mx-auto' alt='NuSantap' />
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2 font-semibold'>NuSantap</p>
									<div className="absolute top-1 -right-1 rotate-[30deg] h-3 bg-red-500 rounded text-[0.5rem] text-white font-medium px-[2px]">
										<p>NEW</p>
									</div>
								</a>
							</div>
						</div>

						<div className="flex flex-col space-y-4">
							<p className='font-semibold'>Resume Medis</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-nowrap text-center'>
								<div className='rounded-full w-12 h-12 bg-[#4ae5b8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>SatuDNA</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#4ae5b8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Health Pass</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#4ae5b8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Rawat Jalan</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#4ae5b8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Tes Lab</p>
								</div>
							</div>
						</div>

						<div className="flex flex-col space-y-4">
							<p className='font-semibold'>Catatan Kesehatan</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-nowrap text-center'>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Kolesterol</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Asam Urat</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Akt. Fisik</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Idx. Massa Tubuh</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Gula Darah</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Tekanan Darah</p>
								</div>
							</div>
						</div>

						<div className='flex flex-col space-y-4'>
							<p className='font-semibold'>Deteksi Risiko Penyakit</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-center text-nowrap'>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Kes. Mental</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Kanker Paru</p>
								</div>
							</div>
						</div>

						<div className='flex flex-col space-y-4'>
							<p className='font-semibold'>Vaksin dan Imunisasi</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-center text-nowrap'>
								<div className='rounded-full w-12 h-12 bg-[#4ae5b8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Sertifikat</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#4ae5b8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Daftar</p>
								</div>
							</div>
						</div>

						<div className='flex flex-col space-y-4'>
							<p className='font-semibold'>Kesehatan Kehamilan</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-center text-nowrap'>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Riwayat</p>
								</div>
							</div>
						</div>

						<div className='flex flex-col space-y-4'>
							<p className='font-semibold'>COVID-19</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-center text-nowrap'>
								<div className='rounded-full w-12 h-12 bg-[#e1d74c] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Check-In</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#e1d74c] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Sert. Vaksin</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#e1d74c] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Hasil Tes</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#e1d74c] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Daftar Vaksin</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#e1d74c] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Daftar Antigen</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#e1d74c] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Tiket Vaksin</p>
								</div>
							</div>
						</div>

						<div className='flex flex-col space-y-4'>
							<p className='font-semibold'>Cari Layanan Kesehatan</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-center text-nowrap'>
								<div className='rounded-full w-12 h-12 bg-[#74ccf8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Cari Nakes</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#74ccf8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Cari Obat</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#74ccf8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Cari Rawat Inap</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#74ccf8] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Lokasi Verif.</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</ScrollableFeed>
		</div>
	);
}