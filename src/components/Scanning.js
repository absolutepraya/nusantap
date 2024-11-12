import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

const ScanningAnimation = ({ isScanning, onComplete }) => {
	return (
		<AnimatePresence>
			<div className="relative h-full max-h-[888px] w-full max-w-[450px] rounded-b-3xl shadow-2xl">
				{isScanning && (
					<>
						{/* Overlay to hide other UI elements */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="fixed inset-0 left-1/2 z-50 w-[450px] -translate-x-1/2 bg-black bg-opacity-50"
						/>

						{/* Scanning line */}
						<motion.div
							initial={{ top: '100%' }}
							animate={{ top: '0%' }}
							exit={{ top: '100%' }}
							transition={{
								duration: 2,
								ease: 'linear',
								onComplete,
							}}
							style={{
								width: '450px',
							}}
							className="fixed left-1/2 z-[100] h-2 -translate-x-1/2"
						>
							{/* Gradient line */}
							<div className="h-full w-full bg-gradient-to-b from-[#0BB4AC] to-transparent shadow-[0_0_15px_5px_rgba(11,180,172,0.5)]" />
						</motion.div>
					</>
				)}
			</div>
		</AnimatePresence>
	);
};

export default ScanningAnimation;
