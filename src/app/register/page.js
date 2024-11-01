/* eslint-disable @next/next/no-img-element */
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { IconArrowLeft } from "@tabler/icons-react";
import ScrollableFeed from 'react-scrollable-feed'

export default function Login() {
    return (
        <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
            <ScrollableFeed className="bg-white h-full !aspect-[9/19.5] flex flex-col items-center relative px-4 py-8 justify-between shadow-2xl">
                <img src='/elements/topleft.svg' alt='Top Left Decorator' width='100%' height='100%' className='absolute top-0 left-0 z-0' />
                <div className="flex flex-col space-y-6 w-full items-center z-10">
                    <div className="flex w-full justify-start">
                        <Link href='/'>
                            <IconArrowLeft size={24} strokeWidth={3} />
                        </Link>
                    </div>

                    <div className='w-full justify-start'>
                        <p className="font-semibold text-lg w-full">Lengkapi Identitas Diri</p>
                        <p className='text-sm'>Agar Anda dapat terhubung dengan semua fasilitas kesehatan yang pernah dikunjungi.</p>
                    </div>

                    <div className="flex flex-col space-y-4 w-full text-sm">
                        <div className='flex flex-col space-y-2'>
                            <p>Email *</p>
                            <input type='text' className='border border-gray-300 rounded-lg h-12 w-full px-4' placeholder='Masukkan email' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Nomor Telepon</p>
                            <input type='text' className='border border-gray-300 rounded-lg h-12 w-full px-4' placeholder='Masukkan nomor telepon' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Kewarganegaraan *</p>
                            <select id='kewarganegaraan' className='border border-gray-300 bg-white rounded-lg h-12 w-full px-4'>
                                <option value='WNI'>Warga Negara Indonesia</option>
                                <option value='WNA'>Warga Negara Asing</option>
                            </select>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Nama Lengkap *</p>
                            <input type='text' className='border border-gray-300 rounded-lg h-12 w-full px-4' placeholder='Masukkan nama lengkap' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Tanggal Lahir *</p>
                            <input type='date' className='border border-gray-300 rounded-lg h-12 w-full px-4' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>NIK *</p>
                            <input type='text' className='border border-gray-300 rounded-lg h-12 w-full px-4' placeholder='Masukkan NIK sesuai KTP' />
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <p>Jenis Kelamin *</p>
                            <select id='jenisKelamin' className='border border-gray-300 bg-white rounded-lg h-12 w-full px-4'>
                                <option value='L'>Laki-laki</option>
                                <option value='P'>Perempuan</option>
                            </select>
                        </div>
                        <div className='flex flex-row space-x-4 w-full px-2'>
                            <input type='checkbox' id='notification' />
                            <label htmlFor='notification' className='text-xs'>Anda setuju untuk menerima informasi dan notifikasi yang dikirmkan oleh Kementerian Kesehatan Republik Indonesia <br />(Opsional)</label>
                        </div>
                        <div className='w-full flex justify-center'>
                            <p className='text-xs'>Sudah punya akun SATUSEHAT Mobile? <a className='text-[#5699fd]' href='/login/'>Masuk</a></p>
                        </div>
                        <a className='bg-[#5699fd] text-white flex items-center justify-center rounded-lg h-12 w-full' href='/login/'>Daftar</a>
                    </div>
                </div>

                <div>

                </div>
            </ScrollableFeed>
        </div>
    );
}