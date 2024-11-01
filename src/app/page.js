/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import { IconQuestionMark } from "@tabler/icons-react";

export default function Home() {
	return (
		<div className="!w-screen !h-screen flex items-center justify-center bg-gray-100 ">
			<div className="bg-white !h-full !aspect-[9/19.5] flex flex-col items-center relative px-4 py-8 justify-between shadow-2xl">
				<img src='/elements/topleft.svg' alt='Top Left Decorator' width='100%' height='100%' className='absolute top-0 left-0 z-0' />
				<div className="flex flex-row w-full space-x-3 justify-end z-10">
					<div className="border rounded-full border-[#d3d4d3] px-6 h-[38px] flex items-center justify-center bg-white">
						<p>Bahasa</p>
					</div>
					<div className="border rounded-full border-[#d3d4d3] w-[38px] h-[38px] flex items-center justify-center bg-white">
						<IconQuestionMark size={24} color="#5699fd" strokeWidth={3} />
					</div>
				</div>
				<div className="flex flex-row space-x-0 items-center w-full justify-center pr-2 z-10">
					<Image src="/images/satusehat.png" width={130} height={130} alt="SATUSEHAT" />
					<p className="text-3xl font-extralight">SATUSEHAT</p>
				</div>
				<div className="flex flex-col w-full h-48 space-y-3 z-10">
					<a className="bg-[#5699fd] w-full h-16 rounded-lg flex items-center justify-center" href='/login/'>
						<p className="text-white">Masuk</p>
					</a>
					<a className="bg-[#e8f1fe] w-full h-16 rounded-lg flex items-center justify-center" href='/register/'>
						<p className="text-[#5699fd]">Daftar</p>
					</a>
					<div className="w-full justify-center flex">
						<p className="text-gray-300 text-xs text-center">Versi 1.X.X</p>
					</div>
				</div>
			</div>
		</div>
	);
}
