/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowLeft } from "@tabler/icons-react";
import ScrollableFeed from 'react-scrollable-feed'
import { useState } from 'react';
import locationData from './data-prov-kab.json';
import { useViewportHeight } from '@/hooks/useViewportHeight';

export default function Create() {
    const [selectedProvinsi, setSelectedProvinsi] = useState('');
    const isTall = useViewportHeight(888);

    return (
        <ScrollableFeed className={`bg-white h-full w-full flex flex-col items-center relative px-4 py-8 justify-between shadow-2xl ${isTall ? "rounded-3xl" : ""} overflow-hidden`}>
            <div className="flex flex-col justify-between h-full w-full items-center z-10">
                <div className='w-full flex flex-col space-y-6'>
                    <div className="flex w-full justify-start">
                        <Link href='/select-profile'>
                            <IconArrowLeft size={24} strokeWidth={3} />
                        </Link>
                    </div>

                    <div className='w-full justify-start'>
                        <p className="font-semibold text-lg w-full">Buat Profil Anak Anda</p>
                        <p className='text-sm'>Agar kebutuhan nutrisi anak Anda bisa dianalisis oleh NuSantap, silahkan lengkapi data di bawah ini.</p>
                    </div>

                    <div className="flex flex-col space-y-4 w-full text-sm">
                        <div className='flex flex-col space-y-2'>
                            <p>Nama Lengkap *</p>
                            <input type='text' className='border border-gray-300 rounded-lg h-12 w-full px-4' placeholder='Masukkan nama lengkap' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Tanggal Lahir *</p>
                            <input type='date' className='border border-gray-300 rounded-lg h-12 w-full px-4' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Tempat Tinggal *</p>
                            <div className='flex space-x-2'>
                                <select
                                    id='provinsi'
                                    className='border border-gray-300 bg-white rounded-lg h-12 w-full px-4'
                                    value={selectedProvinsi}
                                    onChange={(e) => setSelectedProvinsi(e.target.value)}
                                >
                                    <option value="" disabled>Pilih Provinsi</option>
                                    {Object.keys(locationData).map((provinsi) => (
                                        <option key={provinsi} value={provinsi}>
                                            {provinsi}
                                        </option>
                                    ))}
                                </select>
                                {selectedProvinsi ? (
                                    <select
                                        id='kota'
                                        className='border border-gray-300 bg-white rounded-lg h-12 w-full px-4'
                                    >
                                        <option value="" disabled>Pilih Kota</option>
                                        {locationData[selectedProvinsi].map((kota) => (
                                            <option key={kota} value={kota}>
                                                {kota}
                                            </option>
                                        ))}
                                    </select>
                                ) : (
                                    <select
                                        id='kota'
                                        className='text-gray-400 border border-gray-300 rounded-lg h-12 w-full px-4 bg-gray-100'
                                        disabled
                                    >
                                        <option value="" disabled selected>Pilih Kota</option>
                                    </select>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>NIK *</p>
                            <input type='text' className='border border-gray-300 rounded-lg h-12 w-full px-4' placeholder='Masukkan NIK' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Jenis Kelamin *</p>
                            <select id='jenisKelamin' className='border border-gray-300 bg-white rounded-lg h-12 w-full px-4'>
                                <option value='L'>Laki-laki</option>
                                <option value='P'>Perempuan</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='bg-[#5699fd] text-white flex items-center justify-center rounded-lg h-12 w-full'>Buat Profil</div>
            </div>
        </ScrollableFeed>
    );
}