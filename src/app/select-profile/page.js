/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowLeft, IconPlus, IconMessageQuestion, IconUserFilled, IconDotsVertical, IconDots, IconTrash } from '@tabler/icons-react';
import ScrollableFeed from 'react-scrollable-feed';
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useEffect, useRef, useState } from 'react';

export default function Select() {
	const count = 0; // Count the number of profiles, TODO
	const isTall = useViewportHeight(888);
	const containerRef = useRef(null); // Ref for outer container
	const [profiles, setProfiles] = useState([
		{
			nama: 'Anak 1',
			tanggalLahir: '2008-02-12',
			tempatTinggal: {
				provinsi: 'Jawa Barat',
				kota: 'jakarta',
			},
			umur: '13',
			nik: '271821309123',
			jenisKelamin: 'L',
		},
	]);

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

		// Get profiles from localStorage
		const profilesStorage = JSON.parse(localStorage.getItem('profiles')) || [];

		// Add new profile to "profiles" don't override
		const newProfiles = [...profiles, ...profilesStorage];
		setProfiles(newProfiles);
	}, []);

	const calculateAge = (birthDate) => {
		const birth = new Date(birthDate);
		const today = new Date();

		let age = today.getFullYear() - birth.getFullYear();

		// Adjust age if birthday hasn't occurred this year
		const monthDiff = today.getMonth() - birth.getMonth();
		if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
			age--;
		}

		return age;
	};

	return (
		<div
			ref={containerRef}
			className="h-full w-full"
		>
			<ScrollableFeed className={`relative flex h-full w-full flex-col items-center justify-between bg-white px-4 py-8 shadow-2xl ${isTall ? 'rounded-3xl' : ''} overflow-hidden`}>
				<div className="z-10 flex w-full flex-col items-center space-y-6">
					<div className="flex w-full justify-start">
						<Link href="/features">
							<IconArrowLeft
								size={24}
								strokeWidth={3}
							/>
						</Link>
					</div>

					<div className="flex w-full flex-row justify-between">
						<p className="w-full text-lg font-semibold">Pilih Profil Anak</p>
						<IconMessageQuestion
							size={24}
							strokeWidth={2}
							className="cursor-not-allowed"
						/>
					</div>

					<div className="grid w-full grid-cols-2 gap-4">
						{profiles.map((profile, index) => (
							<div
								key={index}
								className="relative"
							>
								<div
									className="absolute right-[0.65rem] top-[0.65rem] cursor-pointer text-red-400"
									onClick={() => {
										// Confirm delete
										if (!confirm('Apakah Anda yakin ingin menghapus profil ini?')) return;

										const newProfiles = profiles.filter((_, i) => i !== index);
										setProfiles(newProfiles);
										localStorage.setItem('profiles', JSON.stringify(newProfiles));
									}}
								>
									<IconTrash
										size={24}
										strokeWidth={2}
									/>
								</div>
								<div
									className="flex aspect-square w-full cursor-pointer flex-col items-center justify-center space-y-5 rounded-xl border-2 shadow-lg"
									href={`/scan?profile=${index}`}
									onClick={() => {
										sessionStorage.setItem('selectedProfile', JSON.stringify(profiles[index]));
										window.location.href = `/scan?profile=${index}`;
									}}
								>
									<div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#4ae6b7] text-white">
										<IconUserFilled
											size={36}
											strokeWidth={2}
										/>
									</div>
									<div className="flex flex-col space-y-1 text-center">
										<p className="text-sm font-semibold">{profile.nama}</p>
										<p className="text-xs text-gray-400">{calculateAge(profile.tanggalLahir)} tahun</p>
									</div>
								</div>
							</div>
						))}
						<a
							className={`${count >= 5 ? 'hidden' : ''} flex aspect-square w-full flex-col items-center justify-center space-y-5 rounded-xl border-2 border-dashed border-custblue text-custblue`}
							href="/create-profile"
						>
							<div className="flex h-20 w-20 items-center justify-center rounded-full bg-custlightblue">
								<IconPlus
									size={32}
									strokeWidth={2}
								/>
							</div>
							<div className="flex flex-col space-y-1 text-center">
								<p className="text-sm font-semibold">Tambah Profil Anak</p>
								<p className="text-xs text-gray-400">
									Maksimal 5 profil dalam
									<br />1 akun.
								</p>
							</div>
						</a>
					</div>
				</div>
			</ScrollableFeed>
		</div>
	);
}
