/* eslint-disable @next/next/no-img-element */
'use client';
import Image from 'next/image';
import { IconQuestionMark } from '@tabler/icons-react';
import { useViewportHeight } from '@/hooks/useViewportHeight';

export default function Home() {
	const isTall = useViewportHeight(888);

	return (
		<div className={`relative flex h-full w-full flex-col items-center justify-between bg-white px-4 py-8 shadow-2xl ${isTall ? 'rounded-3xl' : ''} overflow-hidden`}>
			<img
				src="/elements/topleft.svg"
				alt="Top Left Decorator"
				width="100%"
				height="100%"
				className="absolute -left-8 -top-8 z-0"
			/>
			<div className="z-10 flex w-full flex-row justify-end space-x-3">
				<div className="flex h-[38px] items-center justify-center rounded-full border border-[#d3d4d3] bg-white px-6">
					<p>Bahasa</p>
				</div>
				<div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-[#d3d4d3] bg-white">
					<IconQuestionMark
						size={24}
						color="#5699fd"
						strokeWidth={3}
					/>
				</div>
			</div>
			<div className="z-10 flex w-full flex-row items-center justify-center space-x-0 pr-2">
				<Image
					src="/images/satusehat.png"
					width={130}
					height={130}
					alt="SATUSEHAT"
				/>
				<p className="text-3xl font-extralight">SATUSEHAT</p>
			</div>
			<div className="z-10 flex h-48 w-full flex-col space-y-3">
				<a
					className="relative flex h-16 w-full flex-col items-center justify-center rounded-lg bg-[#5699fd]"
					href="/login/"
				>
					<p className="text-white">Masuk</p>
					<p className="absolute -top-4 text-[10px] text-black">Fitur login belum terimplementasi, silakan langsung tekan tombol "Masuk"</p>
				</a>
				<a
					className="flex h-16 w-full items-center justify-center rounded-lg bg-[#e8f1fe]"
					href="/register/"
				>
					<p className="text-[#5699fd]">Daftar</p>
				</a>
				<div className="flex w-full justify-center">
					<p className="text-center text-xs text-gray-300">Versi 1.X.X</p>
				</div>
			</div>
		</div>
	);
}
