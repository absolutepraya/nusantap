/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowLeft, IconPlus, IconMessageQuestion, IconUserFilled } from "@tabler/icons-react";
import ScrollableFeed from 'react-scrollable-feed'
import { useViewportHeight } from '@/hooks/useViewportHeight';

export default function Select() {
    const count = 0; // Count the number of profiles, TODO
    const isTall = useViewportHeight(888);

    return (
        <ScrollableFeed className={`bg-white h-full w-full flex flex-col items-center relative px-4 py-8 justify-between shadow-2xl ${isTall ? "rounded-3xl" : ""} overflow-hidden`}>
            <div className="flex flex-col space-y-6 w-full items-center z-10">
                <div className="flex w-full justify-start">
                    <Link href='/features'>
                        <IconArrowLeft size={24} strokeWidth={3} />
                    </Link>
                </div>

                <div className='w-full justify-between flex-row flex'>
                    <p className="font-semibold text-lg w-full">Pilih Profil Anak</p>
                    <IconMessageQuestion size={24} strokeWidth={2} className='cursor-not-allowed' />
                </div>

                <div className='grid grid-cols-2 gap-4 w-full'>
                    <a className="w-full aspect-square border-2 shadow-xl rounded-xl flex flex-col items-center justify-center space-y-5" href='/scan?profile=0'>
                        <div className='bg-[#4ae6b7] w-20 h-20 rounded-full flex items-center justify-center text-white'>
                            <IconUserFilled size={36} strokeWidth={2} />
                        </div>
                        <div className='flex flex-col space-y-1 text-center'>
                            <p className='text-sm font-semibold'>Oscar Ryanda Putra</p>
                            <p className='text-gray-400 text-xs'>21 tahun</p>
                        </div>
                    </a>
                    <a className={`${count >= 5 ? 'hidden' : ''} w-full aspect-square border-2 border-custblue border-dashed rounded-xl flex flex-col items-center justify-center space-y-5 text-custblue`} href='/create-profile'>
                        <div className='bg-custlightblue w-20 h-20 rounded-full flex items-center justify-center'>
                            <IconPlus size={32} strokeWidth={2} />
                        </div>
                        <div className='flex flex-col space-y-1 text-center'>
                            <p className='text-sm font-semibold'>Tambah Profil Anak</p>
                            <p className='text-gray-400 text-xs'>Maksimal 5 profil dalam<br />1 akun.</p>
                        </div>
                    </a>
                </div>
            </div>
        </ScrollableFeed>
    );
}