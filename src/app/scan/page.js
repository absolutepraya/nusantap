/* eslint-disable @next/next/no-img-element */
'use client';
import { useContext, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IconArrowLeft, IconBodyScan, IconBoltOff, IconQuestionMark } from '@tabler/icons-react';
import nusantapLogo from '@/../public/images/nusantap-logo.png';
import guide from '@/../public/images/guide.png';
import { ProfileContext } from '@/contexts/ProfileContext';
import { useViewportHeight } from '@/hooks/useViewportHeight';

export default function Scan() {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [screenshot, setScreenshot] = useState(null);
	const [uploadedUrl, setUploadedUrl] = useState(null);
	const { profileData, setProfileData } = useContext(ProfileContext);
	const isTall = useViewportHeight(888);

	useEffect(() => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			})
			.catch((err) => {
				console.error('Error accessing the camera: ', err);
			});
	}, []);

	const handleUploadImage = async (url) => {
		try {
			console.log('Uploading image:', url);
			const response = await fetch('/api/add-image', {
				method: 'POST',
				body: JSON.stringify({ image_url: url }),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			if (response.ok) {
				const data = await response.json();
				console.log(data);
				setProfileData({
					...profileData,
					vec: data.vec,
				});
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	const handleScreenshot = async () => {
		const canvas = canvasRef.current;
		const video = videoRef.current;

		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		const ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

		const dataUrl = canvas.toDataURL('image/png');
		setScreenshot(dataUrl);

		// Convert dataURL to Blob
		const blob = await (async () => {
			const res = await fetch(dataUrl);
			return res.blob();
		})();

		// Create a File object from the Blob
		const file = new File([blob], 'screenshot.png', { type: 'image/png' });

		try {
			const uploadResult = await uploadToCloudinary(file);
			if (uploadResult && uploadResult.secure_url) {
				console.log(uploadResult);
				setUploadedUrl(uploadResult.url);
				console.log('Image uploaded successfully:', uploadResult.url);
				setProfileData({
					...profileData,
					image_url: uploadResult.url,
				});

				handleUploadImage(uploadResult.url);
			}
		} catch (error) {
			console.error('Error uploading to Cloudinary:', error);
		}
	};

	const uploadToCloudinary = async (file) => {
		try {
			const formData = new FormData();
			formData.append('file', file);
			formData.append('upload_preset', 'nusantap');

			const response = await fetch('https://api.cloudinary.com/v1_1/djvdforcq/image/upload', {
				method: 'POST',
				body: formData,
			});

			return await response.json();
		} catch (error) {
			console.error('Error uploading to Cloudinary:', error);
			throw error;
		}
	};

	return (
		<div>
			{!screenshot ? (
				<video
					ref={videoRef}
					autoPlay
					muted
					className={`${isTall ? 'rounded-t-3xl' : ''} absolute left-0 top-0 z-0 h-[86%] w-full object-cover`}
					style={{ transform: 'scaleX(-1)' }}
				></video>
			) : (
				<img
					src={screenshot}
					alt="Screenshot"
					className={`${isTall ? 'rounded-t-3xl' : ''} absolute left-0 top-0 z-0 h-[86%] w-full object-cover`}
					style={{ transform: 'scaleX(-1)' }}
				/>
			)}

			<canvas
				ref={canvasRef}
				className="hidden"
			></canvas>

			{/* Gradient */}
			<div className={`${isTall ? 'rounded-t-3xl' : ''} absolute top-0 z-10 h-52 w-full bg-gradient-to-b from-[#FF7518] from-5% via-[#ff741825] via-70% to-transparent to-100%`}></div>

			<img
				src={guide.src}
				alt="Guide"
				className="absolute top-[15%] z-20 h-auto w-full object-cover"
			/>

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
						<IconBoltOff
							size={24}
							strokeWidth={3}
						/>
					</div>
					<div className="cursor-not-allowed rounded-full bg-[#D1DD25] p-2">
						<IconQuestionMark
							size={24}
							strokeWidth={3}
						/>
					</div>
				</div>
			</div>

			<div className={`absolute bottom-0 z-10 h-60 w-full bg-[#0BB4AC80] ${isTall ? 'rounded-b-3xl' : ''} overflow-hidden`}>
				<div className="relative h-full w-full">
					<div className="flex h-auto w-full items-center justify-start px-4 py-4">
						<div className="absolute left-0 top-[-1] h-1 w-1/5 bg-[#FF7518]">
							<div className="relative z-50 h-full w-full">
								<div className="absolute left-[95%] top-[-6] h-4 w-4 rounded-full bg-[#FF7518]"></div>
							</div>
						</div>
						<div>
							<IconBodyScan
								size={80}
								strokeWidth={2}
								color={'white'}
							/>
						</div>

						<div className="mb-1 ml-4 flex w-auto flex-col text-white">
							<p className="text-2xl font-bold">Scanning</p>
							<p className="text-xs">Pastikan wajah, tangan, kuku, rambut, dan mata Anda terlihat dengan jelas.</p>
						</div>
					</div>

					<div className={`flex h-32 w-full ${isTall ? 'rounded-b-3xl' : ''} items-center justify-center bg-[#05716C]`}>
						<img
							src={nusantapLogo.src}
							alt="Nusantap Logo"
							className="h-24 w-auto cursor-pointer"
							onClick={handleScreenshot}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
