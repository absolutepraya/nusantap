/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { IconArrowLeft, IconBodyScan, IconBoltOff, IconQuestionMark, IconSwitchHorizontal } from '@tabler/icons-react';
import nusantapLogo from '@/../public/images/nusantap-logo.png';
import guide from '@/../public/images/guide.png';
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useProfile } from '@/hooks/useProfile';
import Loading from '@/components/loading';
import { motion, AnimatePresence } from 'framer-motion';
import { db, rtdb } from '@/utils/firebase/firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { ref, set } from 'firebase/database';
import ScanningAnimation from '@/components/Scanning';

export default function Scan() {
	const videoRef = useRef(null);
	const canvasRef = useRef(null);
	const [screenshot, setScreenshot] = useState(null);
	const [uploadedUrl, setUploadedUrl] = useState(null);
	const { vec, setVec } = useProfile();
	const [isLoading, setIsLoading] = useState(false);
	const isTall = useViewportHeight(888);
	const [profileIndex, setProfileIndex] = useState(0);
	// Add state for tracking camera mode
	const [facingMode, setFacingMode] = useState('user');

	// Function to stop all video tracks
	const stopVideoTracks = () => {
		if (videoRef.current && videoRef.current.srcObject) {
			videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
		}
	};

	// Function to initialize camera
	const initializeCamera = async (mode) => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: { facingMode: mode },
			});

			if (videoRef.current) {
				videoRef.current.srcObject = stream;
			}
		} catch (err) {
			console.error('Error accessing the camera: ', err);
		}
	};

	// Function to handle camera switch
	const handleCameraSwitch = async () => {
		stopVideoTracks();
		const newMode = facingMode === 'user' ? 'environment' : 'user';
		setFacingMode(newMode);
		await initializeCamera(newMode);
	};

	useEffect(() => {
		// Initial camera setup
		initializeCamera(facingMode);

		// Cleanup function
		return () => {
			stopVideoTracks();
		};
	}, []);

	useEffect(() => {
		// This code runs only in the browser
		const urlParams = new URLSearchParams(window.location.search);
		const profile = urlParams.get('profile') || 0;
		setProfileIndex(profile);

		if (profile === null) {
			window.location.href = '/select-profile';
		}
	}, []);

	// useEffect(() => {
	// 	navigator.mediaDevices
	// 		.getUserMedia({ video: { facingMode: 'user' } })
	// 		.then((stream) => {
	// 			if (videoRef.current) {
	// 				videoRef.current.srcObject = stream;
	// 			}
	// 		})
	// 		.catch((err) => {
	// 			console.error('Error accessing the camera: ', err);
	// 		});
	// }, []);

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
				console.log('data', data);
				setVec(data.vec);

				sessionStorage.setItem('vec', JSON.stringify(data.vec));
			}
		} catch (error) {
			console.error('Error uploading image:', error);
		}
	};

	const [isScanning, setIsScanning] = useState(false);

	const handleScreenshot = async () => {
		setIsScanning(true); // Start scanning animation
	};

	const handleScanComplete = async () => {
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
			setIsLoading(true);
			const uploadResult = await uploadToCloudinary(file);
			if (uploadResult && uploadResult.secure_url) {
				setUploadedUrl(uploadResult.url);
				await handleUploadImage(uploadResult.url);
				const id = await uploadToFirebase(uploadResult.url);
				window.location.href = `/questionnaire?profile=${id}`;
			}
		} catch (error) {
			console.error('Error uploading to Cloudinary:', error);
		}
	};

	const uploadToFirebase = async (imgUrl) => {
		try {
			const profiles = JSON.parse(localStorage.getItem('profiles')) || [];

			const profile = profiles[profileIndex];

			console.log('Profile', profile);
			const response = await addDoc(collection(db, 'profiles'), {
				...profile,
				image: imgUrl,
				scanned: false,
			});

			console.log(response);
			console.log('Document written with ID: ', response.id);

			const responseId = response.id;

			const responseRt = await set(ref(rtdb, `users/${responseId}`), {
				scanned: false,
			});

			return responseId;
		} catch (error) {
			console.error('Error uploading to Firebase:', error);
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
			<Loading
				text={'Mengidentifikasi Kondisi Fisik mu...'}
				isLoading={isLoading}
			/>

			{/* Video/Screenshot */}
			{!screenshot ? (
				<video
					ref={videoRef}
					autoPlay
					muted
					playsInline
					className={`${isTall ? 'rounded-t-3xl' : ''} absolute left-0 top-0 h-[86%] w-full ${facingMode === 'user' ? 'scale-x-[-1]' : null} transform object-cover ${isScanning ? 'z-50' : 'z-0'}`}
				></video>
			) : (
				<img
					src={screenshot}
					alt="Screenshot"
					className={`${isTall ? 'rounded-t-3xl' : ''} absolute left-0 top-0 h-[86%] w-full scale-x-[-1] transform object-cover ${isScanning ? 'z-50' : 'z-0'}`}
				/>
			)}

			{!isLoading && (
				<ScanningAnimation
					isScanning={isScanning}
					onComplete={handleScanComplete}
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
					onClick={() => window.history.back()}
				>
					<IconArrowLeft
						size={24}
						strokeWidth={3}
					/>
				</Link>

				<div className="flex h-full w-auto items-center gap-4 text-sm">
					<div
						className="cursor-not-allowed rounded-full bg-[#D1DD25] p-2"
						onClick={handleCameraSwitch}
					>
						<IconSwitchHorizontal
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

			<div className={`absolute bottom-0 z-10 h-60 w-full bg-[#0BB4AC80] ${isTall ? 'rounded-b-3xl' : ''}`}>
				<div className="relative h-full w-full">
					<div className="flex h-auto w-full items-center justify-start px-4 py-4">
						<div className="absolute left-0 top-0 h-1 w-1/3 bg-[#FF7518]">
							<div className="relative z-50 h-full w-full">
								<div className="absolute -top-1 left-[95%] z-[100] h-4 w-4 rounded-full bg-[#FF7518]"></div>
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
