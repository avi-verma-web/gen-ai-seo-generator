import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiKeyModal from "../components/ApiKeyModal";
import { auth, db } from "../firebase";
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	onSnapshot,
	orderBy,
	query,
} from "firebase/firestore";
import {
	COHERE_API_KEY,
	COHERE_CHAT_URL,
	DB_COLLECTION_NAME,
} from "../Constants";
import axios from "axios";
import NavBar from "../components/NavBar";
import History from "../components/History";
import GeneratedKeywords from "../components/GeneratedKeywords";
import GenerateKeywordForm from "../components/GenerateKeywordForm";
// AL5pInSzBIuG3O2GtQnMehGROOuyT1T8D5pitwcM

const Dashboard = () => {
	const [topic, setTopic] = useState("");
	const [keywords, setKeywords] = useState([]);
	const [loading, setLoading] = useState(false);
	const [savedKeyWords, setSavedKeyWords] = useState([]);
	const [user, setUser] = useState("");
	const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);
	const [apiKey, setApiKey] = useState(
		localStorage.getItem(COHERE_API_KEY) || ""
	);
	const [copySuccess, setCopySuccess] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onIdTokenChanged((currentUser) => {
			if (!currentUser) {
				navigate("/login");
			} else {
				setUser(currentUser);
			}
		});
		return () => unsubscribe();
	}, [navigate]);

	useEffect(() => {
		if (!user) {
			return;
		}
		const firebaseQuery = query(
			collection(db, DB_COLLECTION_NAME),
			orderBy("timestamp", "desc")
		);
		const unsubscribe = onSnapshot(firebaseQuery, (snapshot) => {
			setSavedKeyWords(
				snapshot.docs
					.map((doc) => {
						return {
							id: doc?.id,
							...doc.data(),
						};
					})
					.filter((item) => item.userId === user.uid)
			);
		});
		return () => unsubscribe();
	}, [user]);

	const handleSaveApiKey = (key) => {
		setApiKey(key);
		localStorage.setItem(COHERE_API_KEY, key);
	};

	const generateKeyWords = async (e) => {
		e.preventDefault();
		if (!topic.trim()) {
			return;
		}
		if (!apiKey) {
			setIsApiKeyModalOpen(true);
			return;
		}
		setLoading(true);
		try {
			// https://docs.cohere.com/reference/chat
			const modelConfig = {
				model: "command-a-03-2025",
				messages: [
					{
						role: "user",
						content: `Generate 2 SEO keywords for the topic: ${topic}. Return only the keywords separated by commas, without any additional text or explanation.`,
					},
				],
				temperature: 0.3,
				stream: false,
			};
			const response = await axios.post(COHERE_CHAT_URL, modelConfig, {
				headers: {
					Authorization: `bearer ${apiKey}`,
					"Content-Type": "application/json",
				},
			});
			const keywordList = response?.data?.message?.content?.[0]?.text
				?.split(",")
				?.map((keyword) => keyword?.trim())
				?.filter((keyword) => keyword);
			setKeywords(keywordList);
			// save into firestore
			await addDoc(collection(db, DB_COLLECTION_NAME), {
				topic,
				keywords: keywordList,
				userId: user.uid,
				userName: user.displayName,
				timestamp: new Date(),
			});
			setTopic("");
		} catch (error) {
			console.log(`Error generating keywords ${error}`);
			if (error?.response?.status === 400) {
				alert("Invalid API key");
				setIsApiKeyModalOpen(true);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleSignOut = async () => {
		try {
			await auth.signOut();
			localStorage.clear();
			navigate("/login");
		} catch (error) {
			console.log(`Error loggin out`);
		}
	};
	const copyToClipboard = async (keyword) => {
		try {
			await navigator.clipboard.writeText(keyword);
			setCopySuccess("Copied to clipboard");
		} catch (err) {
			setCopySuccess("Failed to copy");
		} finally {
			setTimeout(() => setCopySuccess(""), 2000);
		}
	};
	const clearHistory = async () => {
		const confirmQuestion = "Are you sure you want to clear history?";
		if (window.confirm(confirmQuestion)) {
			try {
				const batch = [];
				savedKeyWords?.forEach((item) => {
					if (item?.userId === user.uid) {
						batch.push(deleteDoc(doc(db, DB_COLLECTION_NAME, item?.id)));
					}
				});
				await Promise.all(batch);
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
			<NavBar
				setIsApiKeyModalOpen={setIsApiKeyModalOpen}
				handleSignOut={handleSignOut}
				user={user}
			></NavBar>
			<main className="max-w-4xl mx-auto px-4 py-4 sm:py-8 space-y-4 sm:space-y-8">
				<div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
					<GenerateKeywordForm
						generateKeyWords={generateKeyWords}
						loading={loading}
						setTopic={setTopic}
						topic={topic}
					></GenerateKeywordForm>

					{keywords?.length ? (
						<GeneratedKeywords
							keywords={keywords}
							copySuccess={copySuccess}
							copyToClipboard={copyToClipboard}
						></GeneratedKeywords>
					) : null}
				</div>
				<History
					savedKeyWords={savedKeyWords}
					clearHistory={clearHistory}
					copyToClipboard={copyToClipboard}
					copySuccess={copySuccess}
				></History>
			</main>

			<ApiKeyModal
				isOpen={isApiKeyModalOpen}
				onClose={() => setIsApiKeyModalOpen(false)}
				onSave={handleSaveApiKey}
				currentApiKey={apiKey}
			/>
		</div>
	);
};

export default Dashboard;
