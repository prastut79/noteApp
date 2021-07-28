import React from "react";
import {
	StyleSheet,
	TextInput,
	ScrollView,
	Alert,
	ToastAndroid,
	View,
	TouchableOpacity,
} from "react-native";
import { useSelector, RootStateOrAny } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { addNote, updateNote } from "../redux/actions/noteAction";
import { useFocusEffect, RouteProp } from "@react-navigation/native";
import NoteDetailsSettings from "../components/NoteDetailsSetting";
import { NoteType } from "../utils/Enums";

type NoteDetailsScreenRouteProp = RouteProp<
	{ noteDetails: { id: number; title: String; description: String } },
	"noteDetails"
>;

type propType = {
	route: NoteDetailsScreenRouteProp;
	navigation: any;
};

const noteDetails = ({ route, navigation }: propType) => {
	console.log("Note Details Render");

	const modifyType: NoteType = React.useRef(
		route.params && route.params.id ? NoteType.Edit : NoteType.Add
	).current;

	const id = React.useRef(
		route.params && route.params.id
			? route.params.id
			: useSelector((state: RootStateOrAny) => state.notes).nextId
	).current;

	const [inputTitle, setInputTitle] = React.useState(
		route.params && route.params.title ? route.params.title : ""
	);

	const [inputDescription, setInputDescription] = React.useState(
		route.params && route.params.description ? route.params.description : ""
	);
	const [popupVisible, setPopupVisible] = React.useState(false);

	const theme = React.useRef(
		useSelector((state: RootStateOrAny) => state.appTheme.theme)
	).current;

	const style = React.useRef(styles(theme)).current;
	const dispatch = useDispatch();

	const saveNote = () => {
		console.log(inputTitle + "sa");
		const title = inputTitle.trim();
		const description = inputDescription.trim();

		if (title !== "" || description !== "") {
			dispatch(
				addNote({
					id: id,
					title: title,
					description: description,
				})
			);
			dispatch(updateNote());
			ToastAndroid.showWithGravity(
				modifyType,
				ToastAndroid.SHORT,
				ToastAndroid.BOTTOM
			);
		}
		navigation.navigate("noteList");
	};

	const menuPress = () => {
		setPopupVisible(true);
	};
	/*
	Not Getting the latest State Value ISSUE
	https://github.com/react-navigation/react-navigation/issues/6675
	*/
	useFocusEffect(
		React.useCallback(() => {
			console.log("CALLBACK");
			const unsubscribe = navigation.setOptions({
				headerRight: () => (
					<View style={style.actionButtonContainer}>
						<TouchableOpacity
							style={style.button}
							onPress={saveNote}
						>
							<Ionicons
								name="checkmark"
								size={24}
								style={{
									color: theme.primaryText,
								}}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							style={style.button}
							onPress={menuPress}
						>
							<Ionicons
								name="ellipsis-vertical"
								size={20}
								style={{
									color: theme.header,
								}}
							/>
						</TouchableOpacity>
					</View>
				),
			});
			return () => unsubscribe;
		}, [inputTitle, inputDescription])
	);

	return (
		<>
			<NoteDetailsSettings
				visible={popupVisible}
				setVisible={setPopupVisible}
				note={{
					id,
					title: inputTitle,
					description: inputDescription,
					modifyType,
				}}
				navigation={navigation}
			/>
			<ScrollView
				style={style.noteDetailsContainer}
				showsVerticalScrollIndicator={false}
			>
				<TextInput
					style={style.title}
					multiline={true}
					placeholder="Title"
					placeholderTextColor={theme.lightText}
					onChangeText={(text) => {
						setInputTitle(text);
						console.log(text);
					}}
				>
					{inputTitle}
				</TextInput>
				<TextInput
					style={style.description}
					multiline={true}
					placeholder="Description"
					placeholderTextColor={theme.lightText}
					onChangeText={(text) => {
						setInputDescription(text);
					}}
				>
					{inputDescription}
				</TextInput>
			</ScrollView>
		</>
	);
};

export default noteDetails;

const styles = (theme: any) =>
	StyleSheet.create({
		noteDetailsContainer: {
			marginHorizontal: 20,
		},
		actionButtonContainer: {
			flexDirection: "row",
			justifyContent: "flex-end",
			alignItems: "center",
			paddingRight: 10,
		},
		button: {
			marginRight: 5,
			paddingHorizontal: 5,
		},
		title: {
			fontSize: 22,
			color: theme.header,
			textAlign: "center",
			padding: 10,
			borderRadius: 10,
		},
		description: {
			fontSize: 18,
			color: theme.secondaryText,
			padding: 10,
			marginVertical: 10,
			borderRadius: 10,
			lineHeight: 27,
			textAlign: "center",
			backgroundColor: theme.secondaryBackground,
		},
		image: {
			height: 100,
			width: "100%",
			resizeMode: "contain",
			alignSelf: "center",
		},
	});
