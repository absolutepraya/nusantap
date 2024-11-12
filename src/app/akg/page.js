/* eslint-disable @next/next/no-img-element */
'use client';
import { IconArrowLeft, IconCheck, IconMessage, IconQuestionMark } from '@tabler/icons-react';
import maleWhite from '../../../public/images/male-white.png';
import maleOrange from '../../../public/images/male-orange.png';
import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/utils/firebase/firebase';
import { motion, animate, useMotionValue } from 'framer-motion';
import dataMakanan from '../result/data-makanan.json';
import { set } from 'firebase/database';

export default function Loading() {
	const [profileId, setProfileId] = useState(0);
	const [profileData, setProfileData] = useState(null);
	const fillHeight = useMotionValue('0%');
	const [percentage, setPercentage] = useState(0);

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

		const menuId = sessionStorage.getItem('menuId');

		console.log(dataMakanan);
		const menu = dataMakanan[menuId];

		console.log('Menu', menu);

		let selectedProfile = sessionStorage.getItem('selectedProfile');

		// turn selectedProfile into an object

		selectedProfile = JSON.parse(selectedProfile);

		console.log('Selected Profile', selectedProfile);
		setProfileData(selectedProfile);

		const percentage = calculateAKGFulfillment(16, selectedProfile?.jenisKelamin, menu);
		setPercentage(percentage);

		// Save the percentage to the database
		const docRef = doc(db, 'profiles', profile);
		setDoc(docRef, {
			...selectedProfile,
			akg: percentage,
		});
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

	function calculateAKGFulfillment(age, gender, menu) {
		// Define the AKG values for different age groups and genders

		console.log(age, gender, menu);
		const akgValues = {
			protein: {
				l: {
					'1-3': 16,
					'4-6': 26,
					'7-9': 34,
					'10-12': 44,
					'13-15': 59,
					'16-18': 62,
				},
				p: {
					'1-3': 16,
					'4-6': 26,
					'7-9': 34,
					'10-12': 44,
					'13-15': 48,
					'16-18': 56,
				},
			},
			vitaminA: {
				'1-3': 400,
				'4-6': 450,
				'7-9': 600,
				'10-12': 700,
				'13-15': 800,
				'16-18': 900,
			},
			zn: {
				l: {
					'1-3': 4,
					'4-6': 5,
					'7-9': 8,
					'10-12': 9,
					'13-15': 11,
					'16-18': 12,
				},
				p: {
					'1-3': 4,
					'4-6': 5,
					'7-9': 8,
					'10-12': 9,
					'13-15': 9,
					'16-18': 10,
				},
			},
		};

		// Determine the age group and gender
		let ageGroup;
		if (age >= 1 && age <= 3) {
			ageGroup = '1-3';
		} else if (age >= 4 && age <= 6) {
			ageGroup = '4-6';
		} else if (age >= 7 && age <= 9) {
			ageGroup = '7-9';
		} else if (age >= 10 && age <= 12) {
			ageGroup = '10-12';
		} else if (age >= 13 && age <= 15) {
			ageGroup = '13-15';
		} else if (age >= 16 && age <= 18) {
			ageGroup = '16-18';
		} else {
			ageGroup = '16-18';
		}

		const genderKey = gender.toLowerCase();

		const protein = menu.nutrisi.find((n) => n.nama_nutrisi === 'Protein');
		const proteinValue = protein ? parseFloat(protein.jumlah.split(' ')[0]) : 0;
		const proteinFulfillment = protein ? (proteinValue / akgValues.protein[genderKey][ageGroup]) * 100 : 0;

		const vitaminA = menu.nutrisi.find((n) => n.nama_nutrisi === 'Vitamin A');
		const vitaminAValue = vitaminA ? parseFloat(vitaminA.jumlah.split(' ')[0]) : 0;
		const vitaminAFulfillment = vitaminA ? (vitaminAValue / akgValues.vitaminA[ageGroup]) * 100 : 0;

		const zinc = menu.nutrisi.find((n) => n.nama_nutrisi === 'Zat Besi (Fe)');
		const zincValue = zinc ? parseFloat(zinc.jumlah.split(' ')[0]) : 0;
		const zincFulfillment = zinc ? (zincValue / akgValues.zn[genderKey][ageGroup]) * 100 : 0;

		// Return the average of the nutrient fulfillment percentages
		const fulfillmentPercentages = [proteinFulfillment, vitaminAFulfillment, zincFulfillment].filter((p) => !isNaN(p));
		return fulfillmentPercentages.length > 0 ? Math.round(fulfillmentPercentages.reduce((a, b) => a + b) / fulfillmentPercentages.length) : 0;
	}

	return (
		<motion.div
			className={`absolute left-0 top-0 h-screen max-h-[888px] w-[450px]`}
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

			<div className="absolute z-10 flex h-full w-full flex-col items-center justify-between py-10">
				<div className="h-auto w-full">
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

					{/* Animated container to clip the orange image */}
					<motion.div
						className="absolute bottom-0 flex w-full overflow-hidden"
						initial={{ height: '0%' }} // Start with 0% height
						animate={{ height: `${percentage}%` }} // Animate to the given percentage
						transition={{ duration: 2, ease: 'easeInOut' }} // Animation duration and easing
					>
						<div className="absolute bottom-0 h-full w-full">
							<div className="relative h-full w-full">
								<img
									src={maleOrange.src}
									alt=""
									className="absolute bottom-0 h-full w-full object-cover object-bottom"
								/>
							</div>
						</div>
					</motion.div>

					{/* Percentage text */}
					<p
						className="absolute text-xl font-bold text-[#FF7518]"
						style={{
							textShadow: '1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white',
						}}
					>
						{percentage}%
					</p>
				</div>

				<div className="flex h-auto w-full flex-col items-center">
					<div className="flex h-auto w-10/12 flex-col rounded-md bg-white p-3">
						<div className="flex h-auto items-end gap-2 border-b-2 border-[#FF7518] pb-2">
							<p
								className="text-4xl font-bold text-[#FF7518]"
								style={{
									textShadow: '1px 1px 2px white, -1px -1px 2px white, 1px -1px 2px white, -1px 1px 2px white',
								}}
							>
								{percentage}%
							</p>
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
			</div>
		</motion.div>
	);
}
