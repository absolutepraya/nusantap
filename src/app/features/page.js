/* eslint-disable @next/next/no-img-element */
'use client';
import { IconSearch } from "@tabler/icons-react";
import ScrollableFeed from 'react-scrollable-feed'
import { useEffect, useRef, useState } from 'react';

export default function Features() {
	return (
		<div className="!w-screen !h-screen flex items-center justify-center bg-gray-100 ">
			<ScrollableFeed className="bg-[#fff8ff] !h-full !aspect-[9/19.5] flex flex-col items-center relative px-4 py-8 justify-between shadow-2xl">
				<div className="flex flex-col space-y-5 w-full z-10">
					<p className='text-lg font-semibold'>Fitur</p>
					<div className='relative'>
						<IconSearch size={20} className="absolute bottom-1/2 translate-y-1/2 left-3 text-gray-400" />
						<input type="text" className="w-full border border-gray-300 rounded-lg py-2 pl-10 pr-2" placeholder="Cari fitur" />
					</div>
					<div className='flex flex-col space-y-10'>
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
							<p className='font-semibold'>Kesehatan Anak</p>
							<div className='grid grid-cols-4 w-full gap-y-10 text-[0.7rem] text-center text-nowrap'>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Tumbuh Anak</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>Sert. Imunisasi</p>
								</div>
								<div className='rounded-full w-12 h-12 bg-[#f678bd] relative mx-auto'>
									<p className='absolute -bottom-5 text-center w-fit right-1/2 translate-x-1/2'>NuSantap</p>
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
