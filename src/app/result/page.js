/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowLeft, IconPlus, IconMessageQuestion, IconUserFilled, IconDotsVertical, IconDots, IconTrash, IconQuestionMark, IconToolsKitchen2, IconQrcode, IconCaretDownFilled, IconCaretUpFilled } from "@tabler/icons-react";
import ScrollableFeed from 'react-scrollable-feed'
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useEffect, useRef, useState } from 'react';
import dataMakanan from './data-makanan.json';
import React from 'react';

export default function Result() {
    const isTall = useViewportHeight(888);
    const containerRef = useRef(null); // Ref for outer container
    const selectedMakanan = dataMakanan[0];
    // const warna = "bg-[" + selectedMakanan.warna + "]";
    const warna = "bg-[#FF7518]";
    const [showEdukasi, setShowEdukasi] = useState(false);
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            if (containerRef.current) {
                const scrollableElement = containerRef.current.querySelector('.scroll-feed'); // Target .scroll-feed element
                if (scrollableElement) {
                    scrollableElement.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                }
            }
        }, 100);
    }, []);

    return (
        <div ref={containerRef} className="h-full w-full">
            <ScrollableFeed className={`bg-white h-full w-full flex flex-col items-center relative px-4 py-8 justify-between shadow-xl ${isTall ? "rounded-3xl" : ""} overflow-hidden`}>
                {/* Image background */}
                <img
                    src='/elements/resultbg.svg'
                    alt='Background'
                    className='absolute top-0 z-0 h-full w-full object-cover'
                />
                <div className="flex flex-col space-y-2 w-full items-center z-10">
                    <div className="flex w-full justify-between px-2">
                        <Link href='/select-profile' className=' rounded-full bg-[#D1DD25] p-2'>
                            <IconArrowLeft size={24} strokeWidth={3} />
                        </Link>
                        <div className="cursor-not-allowed rounded-full bg-[#D1DD25] p-2">
                            <IconQuestionMark
                                size={24}
                                strokeWidth={3}
                            />
                        </div>
                    </div>

                    <div className='flex flex-row space-x-4 w-full px-8 text-white !mt-0'>
                        <IconToolsKitchen2 size={90} strokeWidth={2} />
                        <div className='flex flex-col text-white space-y-0 justify-center'>
                            <p className='text-3xl font-bold'>Menu untuk Anda</p>
                            <p className='font-medium text-sm'>Menu dibuat berdasarkan analisis kebutuhan gizi Anda.</p>
                        </div>
                    </div>

                    <div className="w-full h-1 bg-gray-400 rounded-full absolute top-[10.3rem]">
                        <div
                            className="w-full h-1 bg-[#FF7518] rounded-full transition-width duration-100 relative"
                        >
                            <div className="absolute right-0 bottom-1/2 translate-y-1/2 w-4 h-4 rounded-full bg-[#FF7518]" />
                        </div>
                    </div>

                    <div className='w-full flex flex-col space-y-2'>
                        <div className='h-[18rem] w-full bg-white rounded-xl shadow-xl flex flex-col space-y-2 overflow-hidden !mt-8'>
                            <div className={`w-full h-[70%] ${warna} rounded-b-xl`}>

                            </div>
                            <div className='flex flex-col w-full px-3 pb-3'>
                                <p className='text-xl font-bold'>{selectedMakanan.nama}</p>
                                <p className='text-xs'>{selectedMakanan.deskripsi}</p>
                            </div>
                        </div>

                        <div className={`w-full ${warna} rounded-xl shadow-xl flex flex-col space-y-1 pb-[36px] pt-2 overflow-hidden text-white font-medium items-center justify-center relative`}>
                            <div className='absolute h-0.5 bg-white top-[50px] rounded-full w-[93%]' />
                            <table className='w-[93%] text-left'>
                                <thead className='w-full h-[14%] text-xl relative'>
                                    <tr className='w-full h-full font-bold'>
                                        <th className='w-2/4 '>Nutrisi</th>
                                        <th className='w-1/4'>Jumlah</th>
                                        <th className='w-1/4'>%AKG</th>
                                    </tr>
                                </thead>
                                <tbody className='w-full text-sm'>
                                    {/* Blank row */}
                                    <tr className='w-full h-[1rem]'>
                                        <td colSpan="3" className='text-center'></td>
                                    </tr>
                                    {selectedMakanan.nutrisi.map((item, index) => (
                                        <React.Fragment key={index}>
                                            <tr className='w-full h-[1rem] font-bold'>
                                                <td className='w-2/4'>{item.nama_nutrisi}</td>
                                                <td className='w-1/4'>{item.jumlah}</td>
                                                <td className='w-1/4'>{item.akg}</td>
                                            </tr>
                                            {/* "Done" row after each item */}
                                            <tr className={`w-full h-[1rem] ${showEdukasi ? "" : "hidden"}`}>
                                                <td colSpan="3" className='text-start text-xs'>{item.edukasi}</td>
                                            </tr>
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </table>
                            <div
                                className='text-white absolute bottom-4 cursor-pointer right-1/2 translate-y-1/2 translate-x-1/2'
                                onClick={() => {
                                    setShowEdukasi(!showEdukasi)
                                }}
                            >
                                {showEdukasi ? (
                                    <IconCaretUpFilled size={24} strokeWidth={2} className='animate-bounce' />
                                ) : (
                                    <IconCaretDownFilled size={24} strokeWidth={2} className='animate-bounce' />
                                )}
                            </div>
                        </div>

                        <div className='w-full bg-white rounded-xl shadow-xl flex flex-col overflow-hidden relative'>
                            <div className={`flex flex-row space-x-2 z-10 rounded-xl h-[5rem] ${showQR ? "shadow-xl" : ''}`}>
                                <div className='h-full aspect-square bg-[#0bb4ac] rounded-xl flex items-center justify-center'>
                                    <IconQrcode size={50} strokeWidth={2} className='text-white' />
                                </div>
                                <div className='flex flex-col justify-center h-full px-3 pb-[24px]'>
                                    <p className='font-bold text'>QR Code</p>
                                    <p className='text-xs !mb-1'>Klik untuk menampilkan verifikasi scan makanan.</p>
                                </div>
                            </div>
                            <div className={`w-full h-[36rem] bg-white ${showQR ? "" : "hidden"} flex items-center justify-center relative`}>
                                <p className='text-xl font-semibold absolute top-12 text-center'>Tunjukkan QR ini pada staff<br/>Makan Bergizi Gratis</p>
                                <img
                                    src='/qr/qrdummy.png'
                                    alt='QR Code'
                                    className='w-60 h-60 object-contain'
                                />
                                <div className='border rounded-xl border-gray-300 w-[80%] px-3 py-2 absolute bottom-12'>
                                    <p className='text-xs'><span className='font-bold text-red-500'>Note: </span>Pastikan menu yang Anda terima sesuai dengan yang diberikan oleh aplikasi.</p>
                                </div>
                            </div>
                            <div
                                className='text-black absolute z-20 bottom-4 cursor-pointer right-1/2 translate-y-1/2 translate-x-1/2'
                                onClick={() => {
                                    setShowQR(!showQR)
                                }}
                            >
                                {showQR ? (
                                    <IconCaretUpFilled size={24} strokeWidth={2} className='animate-bounce' />
                                ) : (
                                    <IconCaretDownFilled size={24} strokeWidth={2} className='animate-bounce' />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </ScrollableFeed>
        </div>
    );
}