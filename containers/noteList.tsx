import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	FlatList,
	ToastAndroid,
} from "react-native";
import React from "react";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useSelector, RootStateOrAny } from "react-redux";
import NoteCard from "./../components/NoteCard";
import { NOTE_DETAILS, NOTE_LIST, NOTE_SEARCH } from "../utils/ScreenConfig";
import NoteListSettings from "../components/NoteListSetting";

export default function nodeList({ navigation }: any) {
	const [popupVisible, setPopupVisible] = React.useState(false);

	const theme = useSelector((state: RootStateOrAny) => state.appTheme.theme);

	const style = styles(theme);

	const notes = useSelector((state: RootStateOrAny) => state.notes);

	const DATA = Object.values(notes.notes);

	const navigateAddNote = () => {
		navigation.navigate(NOTE_DETAILS.name);
	};

	const navigateSearchPage = () => {
		navigation.navigate(NOTE_SEARCH.name, { notes: DATA });
	};
	console.log("NotelIST rENDER");

	function menuPress() {
		setPopupVisible(true);
	}

	React.useEffect(() => {
		console.log("NOteList Render");
		const unsubscribe = navigation.setOptions({
			title: NOTE_LIST.title,
			headerRight: () => (
				<View style={{ flexDirection: "row", alignItems: "center" }}>
					<FontAwesome5
						name="search"
						size={17}
						color={theme.secondaryText}
						style={{
							paddingHorizontal: 10,
							paddingVertical: 5,
						}}
						onPress={navigateSearchPage}
					/>

					<Ionicons
						name="ellipsis-vertical"
						size={20}
						color={theme.header}
						style={{
							marginRight: 10,
							paddingHorizontal: 10,
							paddingVertical: 5,
						}}
						onPress={menuPress}
					/>
				</View>
			),
		});
		return () => unsubscribe;
	}, []);

	if (DATA.length === 0) {
		return (
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<NoteListSettings
					visible={popupVisible}
					setVisible={setPopupVisible}
					noteLength={DATA.length}
				/>
				<Text style={style.noNoteText}>No Notes Added.</Text>
				<TouchableOpacity onPress={navigateAddNote}>
					<Text
						style={{
							...style.noNoteText,
							color: theme.header,
						}}
					>
						Add Some?
					</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={style.noteListContainer}>
			<NoteListSettings
				visible={popupVisible}
				setVisible={setPopupVisible}
				noteLength={DATA.length}
			/>
			<View style={{ width: "90%", flex: 1 }}>
				<TouchableOpacity
					style={style.addNoteButton}
					onPress={navigateAddNote}
				>
					{/* <SvgUri
					width="35"
					height="35"
					uri={require("./../assets/images/add.svg") as string}
				/> */}

					<FontAwesome5 name="plus" size={25} color="#f0f0f0" />
				</TouchableOpacity>

				<Text style={style.noteCount}>{`${DATA.length} Note${
					DATA.length > 1 ? "s" : ""
				}.`}</Text>

				{/* All Notes Container */}
				<FlatList
					style={style.notesContainer}
					data={DATA}
					renderItem={({ item }: any) => (
						<NoteCard
							navigation={navigation}
							id={item.id}
							title={item.title}
							description={item.description}
						/>
					)}
					keyExtractor={(item: any) => item.id.toString()}
					showsVerticalScrollIndicator={false}
				/>
			</View>
		</View>
	);
}

const styles = (theme: any) =>
	StyleSheet.create({
		noteListContainer: {
			width: "100%",
			flex: 1,
			alignItems: "center",
		},
		settingsButton: {
			width: "100%",
			paddingHorizontal: 10,
			paddingVertical: 15,
			flexDirection: "row",
		},
		settingButtonText: {
			color: theme.primaryText,
			fontSize: 17,
			fontWeight: "bold",
		},
		searchButton: {
			backgroundColor: theme.primaryBackground,
			marginTop: 5,
			paddingVertical: 7,
			paddingHorizontal: 20,
			borderRadius: 50,
		},

		noteCount: {
			color: theme.secondaryText,
			fontWeight: "bold",
			width: "100%",
			textAlign: "right",
			marginTop: 15,
		},

		addNoteButton: {
			height: 60,
			width: 60,
			borderRadius: 100,
			backgroundColor: theme.header,
			alignItems: "center",
			justifyContent: "center",
			position: "absolute",
			zIndex: 99,
			bottom: 40,
			right: 0,
		},

		notesContainer: {
			marginTop: 10,
			marginBottom: 10,
		},
		noNoteText: {
			fontSize: 20,
			fontWeight: "bold",
			color: theme.primaryText,
			marginBottom: 10,
		},
	});
