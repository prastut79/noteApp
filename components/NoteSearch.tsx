import {
	StyleSheet,
	TextInput,
	View,
	Keyboard,
	FlatList,
	Text,
} from "react-native";
import React from "react";
import { RootStateOrAny, useSelector } from "react-redux";
// import { NOTE_SEARCH } from "../utils/ScreenConfig";
import { Ionicons } from "@expo/vector-icons";
import NoteCard from "./NoteCard";

export default function NoteSearch({ navigation }: any) {
	const [inputText, setInputText] = React.useState("");
	const [results, setResults] = React.useState([]);

	const theme = React.useRef(
		useSelector((state: RootStateOrAny) => state.appTheme.theme)
	).current;
	const style = styles(theme);
	const data = React.useRef(
		Object.values(useSelector((state: RootStateOrAny) => state.notes.notes))
	).current;
	console.log("render");

	const clearText = () => {
		setInputText("");
		setResults([]);
	};

	const resultRender = ({ item }: any) => (
		<NoteCard
			navigation={navigation}
			id={item.id}
			title={item.title}
			description={item.description}
		/>
	);

	const handleTextChange = (text: any) => {
		setInputText(text);
		const targetText = text.trim();
		if (targetText !== "") {
			const result: any = data.filter((note: any) =>
				(note.title + note.description)
					.toLowerCase()
					.includes(targetText.toLowerCase())
			);
			setResults(result);
		} else if (targetText === "" && results.length !== 0) {
			setResults([]);
		}
	};
	return (
		<View style={style.searchContainer}>
			<View style={style.searchBoxContainer}>
				<Ionicons name="search" size={18} color={theme.secondaryText} />
				<TextInput
					style={style.textInput}
					onChangeText={handleTextChange}
					value={inputText}
					placeholder="Search Notes"
					placeholderTextColor={theme.lightText}
				/>
				{inputText !== "" && (
					<Ionicons
						name="close-circle"
						size={23}
						color={theme.primaryText}
						onPress={clearText}
						style={{ marginLeft: 5 }}
					/>
				)}
			</View>
			{results.length > 0 ? (
				<View style={style.resultContainer}>
					<Text
						style={{
							color: theme.secondaryText,
							fontWeight: "bold",
							textAlign: "right",
						}}
					>{`${results.length} Note${
						results.length > 1 ? "s" : ""
					} found.`}</Text>
					<FlatList
						data={results}
						renderItem={resultRender}
						keyExtractor={(item: any) => item.id.toString()}
						showsVerticalScrollIndicator={false}
					/>
				</View>
			) : (
				<Text
					style={{
						color: theme.primaryText,
						fontSize: 18,
						fontWeight: "bold",
						textAlign: "center",
						marginTop: 30,
					}}
				>
					{inputText !== "" && results.length === 0
						? "No Notes Found."
						: "Search for your Notes."}
				</Text>
			)}
		</View>
	);
}

const styles = (theme: any) =>
	StyleSheet.create({
		searchContainer: {
			marginHorizontal: 20,
			flex: 1,
		},
		searchBoxContainer: {
			flexDirection: "row",
			// height: 20,
			backgroundColor: theme.primaryBackground,
			marginTop: 5,
			paddingVertical: 4,
			paddingHorizontal: 10,
			borderRadius: 20,
			alignItems: "center",
			// justifyContent: "center",
		},

		textInput: {
			color: theme.primaryText,
			fontSize: 16,
			marginLeft: 7,
			flex: 1,
			fontWeight: "bold",
			// backgroundColor: "red",
		},
		resultContainer: { marginTop: 20, marginBottom: 10 },
	});
