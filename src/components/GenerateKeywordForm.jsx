import { BsLightningCharge } from "react-icons/bs";

const GenerateKeywordForm = ({
	topic,
	setTopic,
	loading,
	generateKeyWords,
}) => {
	return (
		<>
			<h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 flex items-center gap-2">
				<BsLightningCharge className="text-yellow-500" />
				Generate Keywords
			</h2>
			<form onSubmit={generateKeyWords}>
				<div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
					<input
						value={topic}
						onChange={(e) => setTopic(e.target.value)}
						placeholder="Enter your topic..."
						disabled={loading}
						className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
					/>
					<button
						type="submit"
						disabled={loading}
						className="bg-gradient-to-r from-orange-600 to-orange-600 text-white px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-w-[140px]"
					>
						{loading ? (
							"Generating..."
						) : (
							<>
								<BsLightningCharge />
								Generate
							</>
						)}
					</button>
				</div>
			</form>
		</>
	);
};

export default GenerateKeywordForm;
