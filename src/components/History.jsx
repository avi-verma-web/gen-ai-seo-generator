import { FaCopy, FaTrash } from "react-icons/fa";
import { MdHistory } from "react-icons/md";

const History = ({
	savedKeyWords,
	clearHistory,
	copyToClipboard,
	copySuccess,
}) => {
	return (
		<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
			<div className="flex justify-between items-center mb-4 sm:mb-6">
				<h2 className="text-xl sm:text-2xl font-semibold flex items-center gap-2">
					<MdHistory className="text-purple-500" />
					History
				</h2>
				{savedKeyWords?.length > 0 && (
					<button
						onClick={clearHistory}
						className="text-red-500 hover:text-red-700 flex items-center gap-1 sm:gap-2 text-sm"
					>
						<FaTrash />
						<span className="hidden sm:inline">Clear History</span>
					</button>
				)}
			</div>

			<div className="space-y-4 sm:space-y-6">
				{savedKeyWords?.length === 0 ? (
					<p className="text-center text-gray-500 py-6 sm:py-8">
						No keywords generated yet.
					</p>
				) : (
					savedKeyWords?.map((item) => (
						<div
							key={item?.id}
							className="border border-gray-100 rounded-xl p-3 sm:p-4 hover:shadow-md transition-shadow"
						>
							<h3 className="font-medium text-gray-800 mb-2 text-sm sm:text-base">
								Topic: {item?.topic}
							</h3>
							<div className="flex flex-wrap gap-2">
								{item?.keywords?.map((keyword, index) => (
									<div
										key={index}
										className="bg-gray-50 px-2 sm:px-3 py-1 rounded-full flex items-center gap-2 group text-sm"
									>
										<span>{keyword}</span>
										<button
											onClick={() => copyToClipboard(keyword)}
											className="text-gray-400 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:text-gray-600"
										>
											<FaCopy />
										</button>
									</div>
								))}
							</div>
							<div className="mt-2 text-xs text-gray-500">
								{new Date(item?.timestamp?.seconds).toLocaleString()}
							</div>
						</div>
					))
				)}
			</div>
			{copySuccess && <div className="text-green-500 mt-2">{copySuccess}</div>}
		</div>
	);
};

export default History;
