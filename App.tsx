import "react-native-gesture-handler";
import React from "react";
import { Provider } from "react-redux";
import NoteApp from "./NoteApp";
import reduxStore from "./redux/store";

export default function App() {
	return (
		<Provider store={reduxStore}>
			<NoteApp />
		</Provider>
	);
}
