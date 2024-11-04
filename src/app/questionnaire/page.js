/* eslint-disable @next/next/no-img-element */
'use client';
import { IconArrowLeft, IconBoltOff, IconBrandHipchat, IconMessage, IconQuestionMark } from '@tabler/icons-react';
import kuisionerLogo from '../../../public/images/kuesioner.png';
import nusantapLogo from '@/../public/images/nusantap-logo.png';
import Link from 'next/link';
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';

export default function Scan() {
	const isTall = useViewportHeight(888);
	const { vec, setVec } = useProfile();

	useEffect(() => {
		console.log('kuis', vec);
	}, [vec]);

	return (
		<>
			{/* Gradient */}
			{/* <div className="-z-1 absolute -left-[40%] -top-10 h-64 w-full -rotate-45 bg-gradient-to-b from-[#FF7518] from-5% via-[#ff741825] via-70% to-transparent to-100%"></div> */}
			<div className={`-z-2 absolute top-0 h-[60%] w-full bg-gradient-to-b from-[#0bb4acbc] from-25% via-[#0bb4ac57] via-70% to-transparent to-100%`}></div>
			<div className="sticky z-20 flex h-20 w-full flex-row items-center justify-between px-6">
				<Link
					href="/select-profile"
					className="rounded-full bg-[#D1DD25] p-2"
				>
					<IconArrowLeft
						size={24}
						strokeWidth={3}
					/>
				</Link>

				<div className="flex h-full w-auto items-center gap-4 text-sm">
					<div className="cursor-not-allowed rounded-full bg-[#D1DD25] p-2">
						<IconQuestionMark
							size={24}
							strokeWidth={3}
						/>
					</div>
				</div>
			</div>

			<div className="absolute top-16 h-auto w-full py-8">
				<div className="flex h-20 w-full justify-between gap-4 px-8 text-white">
					<IconBrandHipchat
						size={64}
						strokeWidth={2}
						className="mt-2"
					/>
					<div className="flex h-full w-full flex-col">
						<p className="text-3xl font-bold text-white">Kuesioner</p>
						<p className="text-sm text-white">Jawab pertanyaan berikut secara jelas, tepat, dan jujur sesuai keadaan Anda sekarang.</p>
					</div>
				</div>

				<div className="mt-5 h-1 w-full bg-gray-500/30">
					<div className="left-0 h-1 w-1/5 bg-[#FF7518]">
						<div className="relative h-full w-full">
							<div className="absolute left-[95%] top-[-6px] h-4 w-4 rounded-full bg-[#FF7518]"></div>
						</div>
					</div>
				</div>
			</div>

			<div className={`z-2 absolute bottom-0 flex h-auto w-full flex-col items-end gap-8 px-6 py-16 ${isTall ? 'rounded-b-3xl' : ''}`}>
				<div className="flex w-full flex-col items-start">
					<img
						src={nusantapLogo.src}
						alt="Nusantap"
						className="mb-3 h-28 w-auto object-cover"
					/>
					<p className="text-xl font-bold">Apakah Anda sering merasa lelah atau lemah tanpa alasan yang jelas?</p>
				</div>
				<div className="flex w-full flex-col items-end gap-3">
					<button className="h-8 w-40 rounded-full border-2 border-[#0BB4AC] text-center align-middle text-[#0BB4AC]">Sangat sering</button>
					<button className="h-8 w-40 rounded-full border-2 border-[#0BB4AC] text-center align-middle text-[#0BB4AC]">Kadang-kadang</button>
					<button className="h-8 w-40 rounded-full border-2 border-[#0BB4AC] text-center align-middle text-[#0BB4AC]">Tidak Pernah</button>
					<button className="flex h-8 w-48 items-center justify-center gap-2 rounded-full border-2 border-[#FF7518] text-center align-middle text-[#FF7518]">
						<IconMessage
							size={24}
							strokeWidth={2}
						/>
						Ketik Lebih Lanjut
					</button>
				</div>
			</div>
		</>
	);
}
