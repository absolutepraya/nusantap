/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import ScrollableFeed from 'react-scrollable-feed';
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useEffect, useRef } from 'react';

export default function Login() {
	const isTall = useViewportHeight(888);
	const containerRef = useRef(null); // Ref for outer container

	useEffect(() => {
		setTimeout(() => {
			if (containerRef.current) {
				const scrollableElement = containerRef.current.querySelector('.scroll-feed'); // Target .scroll-feed element
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
			<ScrollableFeed className={`relative flex h-full w-full flex-col items-center justify-between bg-white px-4 py-8 shadow-2xl ${isTall ? 'rounded-3xl' : ''} scroll-feed overflow-hidden`}>
				<img
					src="/elements/topleft.svg"
					alt="Top Left Decorator"
					width="100%"
					height="100%"
					className="absolute -left-8 -top-8 z-0"
				/>
				<div className="z-10 flex w-full flex-col items-center space-y-6">
					<div className="flex w-full justify-start">
						<Link href="/">
							<IconArrowLeft
								size={24}
								strokeWidth={3}
							/>
						</Link>
					</div>

					<div className="w-full justify-start">
						<p className="w-full text-lg font-semibold">Lengkapi Identitas Diri</p>
						<p className="text-sm">Agar Anda dapat terhubung dengan semua fasilitas kesehatan yang pernah dikunjungi.</p>
					</div>

					<div className="flex w-full flex-col space-y-4 text-sm">
						<div className="flex flex-col space-y-2">
							<p>Email *</p>
							<input
								type="text"
								className="h-12 w-full rounded-lg border border-gray-300 px-4"
								placeholder="Masukkan email"
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<p>Nomor Telepon</p>
							<input
								type="text"
								className="h-12 w-full rounded-lg border border-gray-300 px-4"
								placeholder="Masukkan nomor telepon"
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<p>Kewarganegaraan *</p>
							<select
								id="kewarganegaraan"
								className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4"
							>
								<option value="WNI">Warga Negara Indonesia</option>
								<option value="WNA">Warga Negara Asing</option>
							</select>
						</div>
						<div className="flex flex-col space-y-2">
							<p>Nama Lengkap *</p>
							<input
								type="text"
								className="h-12 w-full rounded-lg border border-gray-300 px-4"
								placeholder="Masukkan nama lengkap"
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<p>Tanggal Lahir *</p>
							<input
								type="date"
								className="h-12 w-full rounded-lg border border-gray-300 px-4"
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<p>NIK *</p>
							<input
								type="text"
								className="h-12 w-full rounded-lg border border-gray-300 px-4"
								placeholder="Masukkan NIK sesuai KTP"
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<p>Jenis Kelamin *</p>
							<select
								id="jenisKelamin"
								className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4"
							>
								<option value="L">Laki-laki</option>
								<option value="P">Perempuan</option>
							</select>
						</div>
						<div className="flex w-full flex-row space-x-4 px-2">
							<input
								type="checkbox"
								id="notification"
							/>
							<label
								htmlFor="notification"
								className="text-xs"
							>
								Anda setuju untuk menerima informasi dan notifikasi yang dikirmkan oleh Kementerian Kesehatan Republik Indonesia <br />
								(Opsional)
							</label>
						</div>
						<div className="flex w-full justify-center">
							<p className="text-xs">
								Sudah punya akun SATUSEHAT Mobile?{' '}
								<a
									className="text-[#5699fd]"
									href="/login/"
								>
									Masuk
								</a>
							</p>
						</div>
						<a
							className="relative flex h-12 w-full items-center justify-center rounded-lg bg-[#5699fd] text-white"
							href="/login/"
						>
							Daftar
							<p className="absolute -top-4 text-[10px] text-black">Fitur login belum terimplementasi, silakan langsung tekan tombol "Daftar"</p>
						</a>
					</div>
				</div>
			</ScrollableFeed>
		</div>
	);
}
