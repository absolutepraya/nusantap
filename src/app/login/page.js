import Link from 'next/link';
import { IconArrowLeft } from "@tabler/icons-react";

export default function Login() {
    return (
        <div className="!w-screen !h-screen flex items-center justify-center bg-gray-100 ">
            <div className="bg-white !h-full !aspect-[9/19.5] flex flex-col items-center relative px-3 py-8 justify-between shadow-2xl">
                <div className="flex flex-col space-y-6 w-full items-center">
                    <div className="flex w-full justify-start">
                        <Link href='/'>
                                <IconArrowLeft size={24} strokeWidth={3} />
                        </Link>
                    </div>

                    <p className="font-semibold text-lg">Masukkan Nomor Telepon atau Email</p>

                    <div className="flex flex-row items-center w-full">
                        <div className="flex items-center justify-center text-[#5699fd] font-semibold w-1/2 h-12 border-b-2 border-[#5699fd]">
                            <p>Nomor Telepon</p>
                        </div>
                        <div className="flex items-center justify-center text-[#e5e7eb] font-semibold w-1/2 h-12 border-b-2">
                            <p>
                                Email
                            </p>
                        </div>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </div>
    );
}