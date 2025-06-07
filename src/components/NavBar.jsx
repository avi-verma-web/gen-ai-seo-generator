import { BsRocket } from "react-icons/bs";
import { FaKey, FaSignOutAlt } from "react-icons/fa";

const NavBar = ({ setIsApiKeyModalOpen, handleSignOut, user }) => {
	return (
		<nav className="bg-white shadow-sm">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center gap-2">
						<BsRocket className="text-2xl text-orange-600" />
						<span className="font-semibold text-xl text-orange-600 hidden sm:inline">
							SEO Keyword Generator
						</span>
					</div>
					{user && (
						<div className="flex items-center gap-2 sm:gap-4">
							<div className="flex items-center gap-2">
								<img
									src={user.photoURL}
									alt={user.displayName}
									className="w-8 h-8 rounded-full"
								/>
								<span className="text-gray-700 hidden sm:inline">
									{user.displayName}
								</span>
							</div>
							<div className="flex items-center gap-2 sm:gap-4">
								<button
									onClick={() => setIsApiKeyModalOpen(true)}
									className="text-gray-500 hover:text-gray-700 transition-colors p-2"
									title="API Key Settings"
								>
									<FaKey />
								</button>
								<button
									onClick={handleSignOut}
									className="text-gray-500 hover:text-gray-700 transition-colors p-2"
									title="Sign Out"
								>
									<FaSignOutAlt />
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
