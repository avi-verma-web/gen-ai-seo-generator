import { FaCopy } from "react-icons/fa";

const GeneratedKeywords = ({ keywords, copySuccess, copyToClipboard }) => {
	return (
		<div className="mt-6">
			<h3 className="font-medium text-gray-700 mb-3">Generated Keywords:</h3>
			<div className="flex flex-wrap gap-2">
				{keywords.map((keyword, index) => (
					<div
						key={index}
						className="bg-blue-50 px-3 sm:px-4 py-2 rounded-full flex items-center gap-2 group text-sm sm:text-base"
					>
						<span>{keyword}</span>
						<button
							onClick={() => copyToClipboard(keyword)}
							className="text-blue-500 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity"
						>
							<FaCopy />
						</button>
					</div>
				))}
			</div>
			{copySuccess && <div className="text-green-500 mt-2">{copySuccess}</div>}
		</div>
	);
};

export default GeneratedKeywords;
