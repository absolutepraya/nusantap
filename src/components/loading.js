/* eslint-disable @next/next/no-img-element */
'use client';
import { motion } from 'framer-motion';

export default function Loading({ text, isLoading }) {
	return (
		isLoading && (
			<motion.div
				className="absolute left-0 top-0 z-50 flex h-[888px] w-[450px] items-end justify-center bg-red-300"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1 }}
			>
				<img
					src="/elements/loadingbg.svg"
					alt="Loading Background"
					className="absolute h-auto w-full object-cover"
				/>
				<img
					src="/elements/logo.svg"
					alt="Logo"
					className="absolute bottom-1/2 right-1/2 z-10 h-32 w-32 translate-x-1/2 translate-y-1/2"
				/>
				<div className="absolute bottom-40 z-[60] flex flex-col items-center justify-center space-x-1">
					<div className="flex gap-1">
						<motion.div
							className="h-4 w-4 rounded-full bg-[#FF7518]"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [1, 0.5, 1],
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: 0,
							}}
						/>
						<motion.div
							className="h-4 w-4 rounded-full bg-[#FF7518]"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [1, 0.5, 1],
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: 0.2,
							}}
						/>
						<motion.div
							className="h-4 w-4 rounded-full bg-[#FF7518]"
							animate={{
								scale: [1, 1.2, 1],
								opacity: [1, 0.5, 1],
							}}
							transition={{
								duration: 1,
								repeat: Infinity,
								delay: 0.4,
							}}
						/>
					</div>
					<p className="mt-28 text-lg font-bold text-white">{text}</p>
				</div>
				);
			</motion.div>
		)
	);
}
