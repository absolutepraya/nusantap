/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import { IconArrowLeft } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { locationData } from './locationData';
import { useViewportHeight } from '@/hooks/useViewportHeight';

export default function Create() {
	const [selectedProvinsi, setSelectedProvinsi] = useState('');
	const isTall = useViewportHeight(888);
	const [profileState, setProfileState] = useState({
		nama: '',
		tanggalLahir: '',
		tempatTinggal: {
			provinsi: '',
			kota: '',
		},
		nik: '',
		jenisKelamin: '',
	});
	const [is5Profiles, setIs5Profiles] = useState(false);

	const handleSubmit = () => {
		// Check if all fields are filled
		if (!profileState.nama || !profileState.tanggalLahir || !profileState.tempatTinggal.provinsi || !profileState.nik || !profileState.jenisKelamin) {
			alert('Mohon isi semua kolom yang tersedia!');
			return;
		}

		// 1. Get "profiles" from localStorage
		const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

		// Check if there are already 5 profile from profiles in localStorage
		if (profiles.length >= 5) {
			setIs5Profiles(true);
			return;
		}

		// 2. Add new profile to "profiles"
		profiles.push(profileState);

		// 3. Save "profiles" to localStorage
		localStorage.setItem('profiles', JSON.stringify(profiles));

		// 4. Redirect to /select-profile
		window.location.href = '/select-profile';
	};

	// Check if there are already 5 profile from profiles in localStorage
	useEffect(() => {
		const profiles = JSON.parse(localStorage.getItem('profiles')) || [];
		if (profiles.length >= 5) {
			setIs5Profiles(true);
		}
	}, []);

	return (
		<div className={`relative flex h-full w-full flex-col items-center justify-between bg-white px-4 py-8 shadow-2xl ${isTall ? 'rounded-3xl' : ''} overflow-hidden`}>
			<div className="z-10 flex h-full w-full flex-col items-center justify-between">
				<div className="flex w-full flex-col space-y-6">
					<div className="flex w-full justify-start">
						<Link href="/select-profile">
							<IconArrowLeft
								size={24}
								strokeWidth={3}
							/>
						</Link>
					</div>

					<p className="w-full text-lg font-semibold">Buat Profil Anak Anda</p>

					<div className="flex w-full flex-col space-y-4 text-sm">
						<div className="flex flex-col space-y-2">
							<p>Nama Lengkap *</p>
							<input
								type="text"
								className="h-12 w-full rounded-lg border border-gray-300 px-4"
								placeholder="Masukkan nama lengkap"
								onChange={(e) => setProfileState({ ...profileState, nama: e.target.value })}
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<p>Tanggal Lahir *</p>
							<input
								type="date"
								className="h-12 w-full rounded-lg border border-gray-300 px-4"
								onChange={(e) => setProfileState({ ...profileState, tanggalLahir: e.target.value })}
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<p>Tempat Tinggal *</p>
							<div className="flex space-x-2">
								<select
									id="provinsi"
									className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4"
									value={selectedProvinsi}
									onChange={(e) => {
										setSelectedProvinsi(e.target.value);
										setProfileState({
											...profileState,
											tempatTinggal: {
												...profileState.tempatTinggal,
												provinsi: e.target.value,
											},
										});
									}}
								>
									<option
										value=""
										disabled
									>
										Pilih Provinsi
									</option>
									{Object.keys(locationData).map((provinsi) => (
										<option
											key={provinsi}
											value={provinsi}
										>
											{provinsi}
										</option>
									))}
								</select>
								{selectedProvinsi ? (
									<select
										id="kota"
										className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4"
										onChange={(e) => {
											setProfileState({
												...profileState,
												tempatTinggal: {
													...profileState.tempatTinggal,
													kota: e.target.value,
												},
											});
										}}
										value={profileState.tempatTinggal.kota}
									>
										<option
											value=""
											disabled
										>
											Pilih Kota
										</option>
										{locationData[selectedProvinsi].map((kota) => (
											<option
												key={kota}
												value={kota}
											>
												{kota}
											</option>
										))}
									</select>
								) : (
									<div className="relative w-full">
										<div className="absolute h-12 w-full cursor-not-allowed" />
										<select
											id="kota"
											className="h-12 w-full rounded-lg border border-gray-300 bg-gray-100 px-4 text-gray-400"
										>
											<option value="">Pilih Kota</option>
										</select>
									</div>
								)}
							</div>
						</div>
						<div className="flex flex-col space-y-2">
							<p>NIK *</p>
							<input
								type="text"
								className="h-12 w-full rounded-lg border border-gray-300 px-4"
								placeholder="Masukkan NIK"
								onChange={(e) => setProfileState({ ...profileState, nik: e.target.value })}
							/>
						</div>
						<div className="flex flex-col space-y-2">
							<p>Jenis Kelamin *</p>
							<select
								id="jenisKelamin"
								className="h-12 w-full rounded-lg border border-gray-300 bg-white px-4"
								value={profileState.jenisKelamin}
								onChange={(e) => setProfileState({ ...profileState, jenisKelamin: e.target.value })}
							>
								<option
									value=""
									disabled
								>
									Pilih Jenis Kelamin
								</option>
								<option value="L">Laki-laki</option>
								<option value="P">Perempuan</option>
							</select>
						</div>
					</div>
				</div>
				<button
					className={`${is5Profiles ? 'bg-gray-300' : 'bg-[#5699fd]'} relative flex h-12 w-full items-center justify-center rounded-lg text-white`}
					onClick={handleSubmit}
				>
					{is5Profiles && (
						<div className="absolute -top-12 z-0 flex items-center justify-center rounded-md bg-red-500 px-2 py-1 text-sm font-semibold text-white">
							<p>Anda sudah memiliki 5 profil!</p>
						</div>
					)}
					<p>Buat Profil</p>
				</button>
			</div>
		</div>
	);
}
