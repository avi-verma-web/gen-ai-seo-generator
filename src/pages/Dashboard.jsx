import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiKeyModal from "../components/ApiKeyModal";
import { auth, db } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { COHERE_API_KEY } from "../Constants";
// AL5pInSzBIuG3O2GtQnMehGROOuyT1T8D5pitwcM
// https://api.cohere.com/v2/chat
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
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscribe = auth.onIdTokenChanged((currentUser) => {
			if (!currentUser) {
				navigate("/login");
			} else {
				setUser(currentUser);
			}
			return () => unsubscribe();
		});
	}, [navigate]);

	useEffect(() => {
		if (!user) {
			return;
		}
		const firebaseQuery = query(
			collection(db, "keywords"),
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

	return (
		<div>
			<ApiKeyModal
				isOpen={isApiKeyModalOpen}
				onClose={() => setIsApiKeyModalOpen(false)}
				onSave={handleSaveApiKey}
				currentApiKey={apiKey}
			></ApiKeyModal>
		</div>
	);
};

export default Dashboard;
