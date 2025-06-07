import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaRocket } from "react-icons/fa";
import { BsRocket, BsSpeedometer, BsShieldLock } from "react-icons/bs";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = () => {
	const navigate = useNavigate();
	const signIn = async () => {
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			navigate("/dashboard");
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		const unsubscribe = auth.onIdTokenChanged((currentUser) => {
			if (currentUser) {
				navigate("/dashboard");
			}
		});
		return () => unsubscribe();
	}, [navigate]);
	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
			<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
				<div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full animate-float hidden sm:block"></div>
				<div className="absolute top-1/4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full animate-float-delayed hidden sm:block"></div>
				<div className="absolute bottom-1/4 -left-8 w-40 h-40 bg-pink-500/10 rounded-full animate-float hidden sm:block"></div>
			</div>

			<div className="flex-1 flex items-center justify-center p-4">
				<div className="bg-white/80 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full hover:shadow-2xl transition-all duration-300">
					<div className="text-center mb-6 sm:mb-8">
						<div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
							<div className="relative">
								<BsRocket className="text-3xl sm:text-4xl text-orange-600" />
								<div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-yellow-400 rounded-full animate-ping"></div>
							</div>
							<h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-600 text-transparent bg-clip-text">
								Welcome
							</h1>
						</div>
						<p className="text-gray-600 text-sm sm:text-base">
							Sign in for SEO keyword generation
						</p>
					</div>

					<button
						onClick={signIn}
						className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-orange-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 font-semibold transform hover:-translate-y-0.5 group"
					>
						<FaGoogle className="text-xl sm:text-2xl group-hover:rotate-12 transition-transform" />
						<span>Continue with Google</span>
					</button>

					<div className="mt-8 sm:mt-12 grid grid-cols-2 gap-3 sm:gap-4">
						<div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
							<div className="text-orange-600 font-semibold mb-1 flex items-center gap-2 text-sm sm:text-base">
								<BsSpeedometer className="group-hover:scale-110 transition-transform" />
								<span>Lightning Fast</span>
							</div>
							<div className="text-xs sm:text-sm text-gray-600">
								Generate keywords instantly
							</div>
						</div>
						<div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
							<div className="text-orange-600 font-semibold mb-1 flex items-center gap-2 text-sm sm:text-base">
								<FaRocket className="group-hover:scale-110 transition-transform" />
								<span>AI Powered</span>
							</div>
							<div className="text-xs sm:text-sm text-gray-600">
								Smart suggestions
							</div>
						</div>
						<div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
							<div className="text-orange-600 font-semibold mb-1 flex items-center gap-2 text-sm sm:text-base">
								<BsShieldLock className="group-hover:scale-110 transition-transform" />
								<span>Secure</span>
							</div>
							<div className="text-xs sm:text-sm text-gray-600">
								Your data is protected
							</div>
						</div>
						<div className="bg-white p-3 sm:p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group">
							<div className="text-orange-600 font-semibold mb-1 flex items-center gap-2 text-sm sm:text-base">
								<MdOutlinePrivacyTip className="group-hover:scale-110 transition-transform" />
								<span>Private</span>
							</div>
							<div className="text-xs sm:text-sm text-gray-600">
								Your searches are private
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Footer */}
			<footer className="py-4 sm:py-6 text-center text-gray-500 text-xs sm:text-sm">
				<p>© 2025 Avinash SEO Keyword Generator. All rights reserved.</p>
			</footer>
		</div>
	);
};

export default Login;
