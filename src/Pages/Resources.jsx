import React, { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Scale, Info, Phone, HelpCircle, ChevronDown, ChevronUp, FileText } from 'lucide-react';

// Custom Animated Accordion Component
const AnimatedAccordion = ({ item, index, isOpen, onToggle }) => {
	const contentRef = useRef(null);
	const [height, setHeight] = useState(0);

	useEffect(() => {
		if (contentRef.current) {
			setHeight(isOpen ? contentRef.current.scrollHeight : 0);
		}
	}, [isOpen]);

	return (
		<div className="border border-gray-200 dark:border-gray-600 rounded-xl overflow-hidden bg-gradient-to-r from-green-50/50 to-emerald-50/50 dark:from-gray-700/30 dark:to-emerald-900/10">
			<button
				className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-green-50 dark:hover:bg-gray-700/50 transition-all duration-300 ease-in-out"
				onClick={() => onToggle(index)}
				aria-expanded={isOpen}
				aria-controls={`faq-answer-${index}`}
				id={`faq-question-${index}`}
			>
				<span className="font-medium text-gray-800 dark:text-gray-200 pr-4">
					{item.question}
				</span>
				<div
					className={`flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-800/30 rounded-full flex-shrink-0 transition-all duration-300 ease-in-out ${
						isOpen ? 'rotate-180 bg-green-200 dark:bg-green-700/50' : ''
					}`}
				>
					<ChevronDown className="w-4 h-4 text-green-600 dark:text-green-400 transition-transform duration-300 ease-in-out" />
				</div>
			</button>
			<div
				className="overflow-hidden transition-all duration-500 ease-in-out"
				style={{ height: `${height}px` }}
			>
				<div
					ref={contentRef}
					className={`px-6 py-4 bg-white/50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-600 transform transition-all duration-300 ease-in-out ${
						isOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
					}`}
					id={`faq-answer-${index}`}
					role="region"
					aria-labelledby={`faq-question-${index}`}
				>
					<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
						{item.answer}
					</p>
				</div>
			</div>
		</div>
	);
};

const faqData = [
	{
		question: 'Can I file a complaint anonymously?',
		answer: 'Currently, you must register to file a complaint so authorities can track and respond.',
	},
	{
		question: 'What happens after I submit a complaint?',
		answer: 'Your complaint is reviewed by the appropriate department and progress is tracked.',
	},
	{
		question: 'How long does it take to resolve?',
		answer: 'Timelines vary, but we aim to address issues within 7 working days.',
	},
	{
		question: 'Will I be notified of status changes?',
		answer: "Yes, you'll receive email or dashboard updates on status changes.",
	},
];

const Resources = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleFAQ = (index) => {
		setOpenIndex(openIndex === index ? null : index);
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-emerald-900/20 relative overflow-hidden">
			<button
				className="absolute top-4 left-4 z-20 group flex items-center gap-2 px-4 py-2 text-green-700 hover:text-green-800 dark:text-green-300 dark:hover:text-green-200 transition-all duration-200 hover:bg-white/60 dark:hover:bg-gray-800/60 rounded-lg backdrop-blur-sm"
				onClick={() => window.history.back()}
				type="button"
			>
				<svg
				className="w-5 h-5 transition-transform group-hover:-translate-x-1"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				>
				<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
				</svg>
				Back
			</button>
			<div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-r from-green-300/30 to-emerald-300/30 dark:from-green-600/20 dark:to-emerald-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
			<div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-r from-emerald-300/30 to-teal-300/30 dark:from-emerald-600/20 dark:to-teal-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
			<div className="absolute -bottom-8 left-20 w-80 h-80 bg-gradient-to-r from-teal-300/30 to-green-300/30 dark:from-teal-600/20 dark:to-green-600/20 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>

			<div className="relative top-10 z-10 max-w-4xl mx-auto px-6 pb-12">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-400 bg-clip-text text-transparent mb-4">
						Citizen Resources
					</h1>
					<p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						Everything you need to know about filing complaints and accessing civic services
					</p>
				</div>

				<div className="grid gap-8">
					<section className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center gap-4 mb-4">
							<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl">
								<Scale className="w-6 h-6 text-white" />
							</div>
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
								Your Rights & Responsibilities
							</h2>
						</div>
						<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
							You have the right to file civic complaints and receive timely updates. Please note that misuse or
							filing false complaints may lead to appropriate action being taken.
						</p>
					</section>

					<section className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center gap-4 mb-6">
							<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl">
								<Info className="w-6 h-6 text-white" />
							</div>
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
								How to File a Complaint
							</h2>
						</div>
						<ol className="space-y-4">
							{[
								'Login to your account using your credentials',
								'Click "File a Complaint" from your dashboard',
								'Provide complete and accurate issue details',
								'Submit your complaint and track the status anytime',
							].map((step, index) => (
								<li key={index} className="flex items-start gap-4">
									<div className="flex items-center justify-center w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 dark:from-green-500 dark:to-emerald-500 rounded-full text-white text-sm font-semibold flex-shrink-0 mt-0.5">
										{index + 1}
									</div>
									<span className="text-gray-600 dark:text-gray-400 leading-relaxed">{step}</span>
								</li>
							))}
						</ol>
					</section>

					<section className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center gap-4 mb-6">
							<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-teal-500 to-green-500 rounded-xl">
								<Phone className="w-6 h-6 text-white" />
							</div>
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
								Emergency Contacts
							</h2>
						</div>
						<div className="grid md:grid-cols-2 gap-4">
							{[
								{ name: 'Police', number: '100' },
								{ name: 'Fire', number: '101' },
								{ name: 'Women Helpline', number: '1091' },
								{ name: 'Child Helpline', number: '1098' },
								{ name: 'Cyber Crime', number: '155260' },
							].map((contact, index) => (
								<div
									key={index}
									className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700/50 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-gray-600/50"
								>
									<span className="font-medium text-gray-700 dark:text-gray-300">{contact.name}</span>
									<span className="font-bold text-green-600 dark:text-green-400 text-lg">
										{contact.number}
									</span>
								</div>
							))}
						</div>
					</section>

					<section className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center gap-4 mb-4">
							<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-green-600 to-teal-600 rounded-xl">
								<FileText className="w-6 h-6 text-white" />
							</div>
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
								Related Laws & Acts
							</h2>
						</div>
						<p className="text-gray-600 dark:text-gray-400 leading-relaxed">
							Access simplified summaries of local civic laws, nuisance acts, and safety regulations that govern
							citizen services and complaint procedures.
						</p>
					</section>

					<section className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700/50 hover:shadow-xl hover:shadow-green-500/10 dark:hover:shadow-emerald-500/10 transition-all duration-300 hover:-translate-y-1">
						<div className="flex items-center gap-4 mb-6">
							<div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-emerald-600 to-green-600 rounded-xl">
								<HelpCircle className="w-6 h-6 text-white" />
							</div>
							<h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
								Frequently Asked Questions
							</h2>
						</div>
						<div className="space-y-4">
							{faqData.map((item, index) => (
								<AnimatedAccordion
									key={index}
									item={item}
									index={index}
									isOpen={openIndex === index}
									onToggle={toggleFAQ}
								/>
							))}
						</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Resources;
