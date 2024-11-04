/* eslint-disable @next/next/no-img-element */
'use client';
import { IconArrowLeft, IconBoltOff, IconBrandHipchat, IconMessage, IconQuestionMark } from '@tabler/icons-react';
import kuisionerLogo from '../../../public/images/kuesioner.png';
import nusantapLogo from '@/../public/images/nusantap-logo.png';
import Link from 'next/link';
import { useViewportHeight } from '@/hooks/useViewportHeight';
import { useEffect, useRef, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingDots = () => (
	<div className="flex space-x-1">
		<motion.div
			className="h-2 w-2 rounded-full bg-[#0BB4AC]"
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
			className="h-2 w-2 rounded-full bg-[#0BB4AC]"
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
			className="h-2 w-2 rounded-full bg-[#0BB4AC]"
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
);

const QuestionContent = ({ currentQuestion, isLoading }) => {
	return (
		<motion.div
			className="flex w-full flex-col items-start"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5 }}
		>
			<AnimatePresence>
				{!isLoading && (
					<motion.img
						src={nusantapLogo.src}
						alt="Nusantap"
						className="mb-3 h-28 w-auto object-cover"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3 }}
					/>
				)}
			</AnimatePresence>

			{isLoading ? (
				<div className="flex h-20 w-full items-center justify-center">
					<LoadingDots />
				</div>
			) : (
				<p className="text-xl font-bold">{currentQuestion?.question || ''}</p>
			)}
		</motion.div>
	);
};

const Option = ({ text, setAnswer, isLoading }) => {
	return (
		<motion.button
			className="h-8 w-full max-w-[350px] truncate rounded-full border-2 border-[#0BB4AC] px-4 text-center align-middle text-[#0BB4AC] disabled:opacity-50"
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: -20 }}
			transition={{ duration: 0.3 }}
			onClick={() => setAnswer(text)}
			disabled={isLoading}
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
		>
			{text}
		</motion.button>
	);
};

const CustomInput = ({ isLoading, onSubmit }) => {
	const [inputText, setInputText] = useState('');
	const [width, setWidth] = useState(96);
	const hiddenText = useRef(null);
	const inputRef = useRef(null);

	// Update width whenever input text changes
	useEffect(() => {
		if (hiddenText.current) {
			const minWidth = 96;
			const maxWidth = 350;
			const padding = 60; // Account for padding and icon

			const textWidth = hiddenText.current.offsetWidth;
			const calculatedWidth = inputText ? Math.max(textWidth + padding, minWidth) : minWidth;

			setWidth(Math.min(calculatedWidth, maxWidth));
		}
	}, [inputText]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (inputText.trim() && onSubmit) {
			console.log('inputText', inputText);
			onSubmit(inputText);
			setInputText('');
		}
	};

	const handleKeyPress = (e) => {
		if (e.key === 'Enter') {
			handleSubmit(e);
		}
	};

	return (
		<motion.form
			className="relative h-8 w-auto"
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: -20 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			onSubmit={handleSubmit}
		>
			{/* Message icon for empty state */}
			{inputText === '' && (
				<div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#FF7518]">
					<IconMessage size={20} />
				</div>
			)}

			{/* Hidden text element for width calculation */}
			<span
				ref={hiddenText}
				className="invisible absolute p-0 text-base"
				style={{ whiteSpace: 'pre' }}
			>
				{inputText || 'Ketik Lebih Lanjut'}
			</span>

			{/* Input field */}
			<input
				ref={inputRef}
				className={`flex h-full items-center justify-center rounded-full border-2 border-[#FF7518] bg-transparent transition-all duration-200 focus:outline-none ${inputText === '' ? 'pl-10 pr-4' : 'px-4'} text-center disabled:opacity-50`}
				style={{
					width: `${width}px`,
					color: inputText.length > 0 ? '#000000' : '#FF7518',
				}}
				type="text"
				placeholder="Ketik Lebih Lanjut"
				value={inputText}
				onChange={(e) => setInputText(e.target.value)}
				onKeyPress={handleKeyPress}
				disabled={isLoading}
			/>
		</motion.form>
	);
};

export default function Scan() {
	const isTall = useViewportHeight(888);
	const [history, setHistory] = useState(null);
	const [vec, setVec] = useState();
	const [currentQuestion, setCurrentQuestion] = useState();
	const [currentAnswer, setCurrentAnswer] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const vec = sessionStorage.getItem('vec');
		setVec(JSON.parse(vec));

		if (vec) {
			fetchQuestion();
		}
	}, []);

	const fetchQuestion = async () => {
		setIsLoading(true);
		try {
			const requestBody = {
				message: currentAnswer,
				conversationHistory: history,
				previousVec: vec,
			};

			const response = await fetch('/api/question', {
				method: 'POST',
				body: JSON.stringify(requestBody),
				headers: {
					'Content-Type': 'application/json',
				},
			});

			const data = await response.json();
			setCurrentQuestion(data);
		} catch (error) {
			console.error('Error fetching question:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const setAnswer = async (answer) => {
		setCurrentAnswer(answer);
		const currentHistory = {
			question: currentQuestion.question,
			answer: answer,
		};

		const previousHistory = history || [];
		previousHistory.push(currentHistory);
		setHistory(previousHistory);

		if (previousHistory.length >= 3) {
			sessionStorage.setItem('vec', JSON.stringify(currentQuestion.vec));

			window.location.href = '/result';
			return;
		}

		fetchQuestion();
	};

	const handleCustomInput = (inputText) => {
		setAnswer(inputText);
	};

	return (
		<>
			{/* Gradient */}
			<div className="z-4 absolute -left-[30%] -top-10 h-64 w-full -rotate-45 bg-gradient-to-b from-[#FF7518] from-5% via-[#ff741825] via-70% to-transparent to-100%"></div>
			<div className={`-z-2 absolute top-0 h-[60%] w-full bg-gradient-to-b from-[#0bb4acbc] from-25% via-[#0bb4ac57] via-70% to-transparent to-100%`}></div>
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
						<IconQuestionMark
							size={24}
							strokeWidth={3}
						/>
					</div>
				</div>
			</div>

			<div className="absolute top-16 h-auto w-full py-8">
				<div className="flex h-20 w-full justify-between gap-4 px-8 text-white">
					<IconBrandHipchat
						size={64}
						strokeWidth={2}
						className="mt-2"
					/>
					<div className="flex h-full w-full flex-col">
						<p className="text-3xl font-bold text-white">Kuesioner</p>
						<p className="text-sm text-white">Jawab pertanyaan berikut secara jelas, tepat, dan jujur sesuai keadaan Anda sekarang.</p>
					</div>
				</div>

				<div className="mt-8 h-1 w-full bg-gray-500/30">
					<div className="absolute left-0 h-1 w-1/2 bg-[#FF7518]">
						<div className="relative h-full w-full">
							<div className="absolute left-[95%] top-[-4px] h-4 w-4 rounded-full bg-[#FF7518]"></div>
						</div>
					</div>
				</div>
			</div>

			<div className={`z-2 absolute bottom-0 flex h-auto w-full flex-col items-end gap-3 px-6 py-16 pb-24 ${isTall ? 'rounded-b-3xl' : ''}`}>
				<AnimatePresence mode="wait">
					<QuestionContent
						key={currentQuestion?.question}
						currentQuestion={currentQuestion}
						isLoading={isLoading}
					/>
				</AnimatePresence>

				<div className="max-w-screen flex w-auto flex-col items-end gap-3">
					<AnimatePresence mode="wait">
						{!isLoading && currentQuestion?.option1 && (
							<Option
								key={`${currentQuestion.question}-1`}
								text={currentQuestion.option1}
								setAnswer={setAnswer}
								isLoading={isLoading}
							/>
						)}
						{!isLoading && currentQuestion?.option2 && (
							<Option
								key={`${currentQuestion.question}-2`}
								text={currentQuestion.option2}
								setAnswer={setAnswer}
								isLoading={isLoading}
							/>
						)}
						{!isLoading && currentQuestion?.option3 && (
							<Option
								key={`${currentQuestion.question}-3`}
								text={currentQuestion.option3}
								setAnswer={setAnswer}
								isLoading={isLoading}
							/>
						)}
					</AnimatePresence>
				</div>

				<AnimatePresence>
					{!isLoading && (
						<CustomInput
							key="custom-input"
							isLoading={isLoading}
							onSubmit={handleCustomInput}
						/>
					)}
				</AnimatePresence>
			</div>
		</>
	);
}
