/* eslint-disable @next/next/no-img-element */
'use client';
import { IconArrowLeft, IconCheck, IconMessage, IconQuestionMark } from '@tabler/icons-react';
import maleWhite from '../../../public/images/male-white.png';
import maleOrange from '../../../public/images/male-orange.png';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase/firebase';
import { motion, animate, useMotionValue } from 'framer-motion';

export default function Loading() {
	const [profileId, setProfileId] = useState(0);
	const [profileData, setProfileData] = useState(null);
	const fillHeight = useMotionValue('0%');
	const percentage = 45;

	useEffect(() => {
		animate(fillHeight, `${percentage}%`, {
			duration: 2,
			ease: 'easeOut',
		});
	}, [percentage]);

	useEffect(() => {
		// This code runs only in the browser
		const urlParams = new URLSearchParams(window.location.search);
		const profile = urlParams.get('profile') || 0;
		setProfileId(profile);

		// Fetch profile data

		const getProfileData = async (id) => {
			const response = await getDoc(doc(db, 'profiles', id));

			if (response.exists()) {
				setProfileData(response.data());
			}

			console.log(response.data());
			return response;
		};

		getProfileData(profile);
	}, []);

	function calculateAge(tanggalLahir) {
		const birthDate = new Date(tanggalLahir);
		const today = new Date();

		let age = today.getFullYear() - birthDate.getFullYear();
		const monthDifference = today.getMonth() - birthDate.getMonth();
		const dayDifference = today.getDate() - birthDate.getDate();

		// Adjust age if the current date is before the birthdate this year
		if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
			age--;
		}

		return age;
	}

	return (
		<motion.div
			className={`absolute left-0 top-0 h-[888px] w-[450px]`}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 1 }}
		>
			<img
				src="/elements/loadingbg.svg"
				alt="Loading Background"
				className="absolute h-auto w-full object-cover"
			/>

			<div className="absolute z-10 flex h-full w-full flex-col items-center">
				<div className="h-auto w-full pt-10">
					<div className="flex w-full justify-between gap-4 px-8 text-white">
						<IconCheck
							size={64}
							strokeWidth={2}
							className="mt-2"
						/>
						<div className="flex h-full w-full flex-col">
							<p className="text-3xl font-bold text-white">Scan Sukses!</p>
							<p className="text-sm text-white">Kami telah mencatat status kesehatan dan kebutuhan nutrisi Anda. Lanjutkan untuk menikmati makan siang Anda hari ini.</p>
						</div>
					</div>
				</div>

				<div className="relative flex h-1/2 w-auto items-center justify-center">
					{/* Base white silhouette */}
					<img
						src={maleWhite.src}
						alt=""
						className="relative h-full w-auto"
					/>

					{/* Orange filling layer - position it with the correct scaling */}
					{/* <motion.div
						className="absolute bottom-0 left-0 right-0 overflow-hidden"
						style={{ height: '45%' }} // This is the visible clipped height
					>
						<div className="relative h-full">
							<img
								src={maleOrange.src}
								alt=""
								className="h-full w-auto"
								style={{ objectFit: 'cover' }}
							/>
						</div>
					</motion.div> */}

					{/* Percentage text */}
					<p className="absolute text-xl font-bold text-[#FF7518]">45%</p>
				</div>

				<div className="flex h-auto w-10/12 flex-col rounded-md bg-white p-3">
					<div className="flex h-auto items-end gap-2 border-b-2 border-[#FF7518] pb-2">
						<p className="text-4xl font-bold text-[#FF7518]">45%</p>
						<p className="text-sm text-gray-500">Kebutuhan gizi harian anda terpenuhi</p>
					</div>
					<div>
						<p className="font-bold">{profileData?.nama}</p>
						<p>{calculateAge(profileData?.tanggalLahir)} Tahun</p>
					</div>
				</div>

				<div className="flex h-auto w-10/12 justify-between gap-4 pt-2">
					<button
						className="flex h-full w-full items-center justify-center rounded-lg border-2 border-[#D1DD25] bg-white p-2 font-bold text-[#D1DD25]"
						onClick={() => (window.location.href = '/select-profile')}
					>
						<IconArrowLeft
							size={24}
							strokeWidth={2}
						/>
						Kembali
					</button>
					<button className="flex h-full w-full items-center justify-center rounded-lg border-2 border-[#D1DD25] bg-white p-2 font-bold text-[#D1DD25]">
						<IconQuestionMark
							size={24}
							strokeWidth={2}
						/>
						Bantuan
					</button>
					<button className="flex h-full w-full items-center justify-center gap-1 rounded-lg border-2 border-[#D1DD25] bg-white p-2 text-sm font-bold text-[#D1DD25]">
						<IconMessage
							size={24}
							strokeWidth={2}
						/>
						Feedback
					</button>
				</div>
			</div>
		</motion.div>
	);
}
