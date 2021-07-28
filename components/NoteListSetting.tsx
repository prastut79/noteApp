import {
	View,
	Text,
	StyleSheet,
	Pressable,
	Switch,
	Alert,
	ToastAndroid,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import { switchTheme } from "../redux/actions/themeAction";
import { DARK_THEME, LIGHT_THEME } from "../utils/themes";
import BottomPopup from "../components/BottomPopup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteAllNote, updateNote } from "../redux/actions/noteAction";

export default function NoteListSettings({
	visible,
	setVisible,
	noteLength,
}: any) {
	const theme = useSelector((state: RootStateOrAny) => state.appTheme.theme);
	const [darkMode, setDarkMode] = React.useState(
		theme.mode === "dark" ? true : false
	);
	const style = styles(theme);
	const dispatch = useDispatch();

	const toggleDarkMode = () => {
		const targetMode = darkMode ? "light" : "dark";
		dispatch(
			switchTheme(targetMode === "light" ? LIGHT_THEME : DARK_THEME)
		);
		AsyncStorage.setItem("themeMode", targetMode);
		setDarkMode((currentMode) => !currentMode);
	};

	const deleteAll = () => {
		Alert.alert(
			"Confirm",
			"Do you really wanna delete all the note?",
			[
				{ text: "No", style: "cancel" },
				{
					text: "Yes",
					onPress: () => {
						setVisible(false);
						dispatch(deleteAllNote());
						dispatch(updateNote());
						ToastAndroid.showWithGravity(
							"All Notes Deleted.",
							ToastAndroid.SHORT,
							ToastAndroid.BOTTOM
						);
					},
					style: "destructive",
				},
			],
			{ cancelable: true }
		);
	};
	return (
		<BottomPopup visible={visible} setVisible={setVisible} title="Settings">
			{noteLength > 0 && (
				<Pressable
					android_disableSound
					style={({ pressed }) => [
						{
							backgroundColor: pressed ? theme.lightText : null,
						},
						style.settingsButton,
					]}
					onPress={deleteAll}
				>
					<Ionicons
						name="trash"
						size={21}
						color={theme.secondaryText}
						style={{ marginRight: 10 }}
					/>
					<Text style={style.settingButtonText}>Delete All</Text>
				</Pressable>
			)}
			<View style={{ ...style.settingsButton }}>
				<Ionicons
					name="moon"
					size={21}
					color={theme.secondaryText}
					style={{ marginRight: 10 }}
				/>
				<Text style={style.settingButtonText}>Dark Mode</Text>
				<Switch
					trackColor={{
						false: theme.lightText,
						true: theme.header,
					}}
					thumbColor={theme.secondaryText}
					ios_backgroundColor={theme.header}
					onValueChange={toggleDarkMode}
					value={darkMode}
					style={{
						marginLeft: 15,
						transform: [{ scaleX: 1.4 }, { scaleY: 1.3 }],
					}}
				/>
			</View>
		</BottomPopup>
	);
}

const styles = (theme: any) =>
	StyleSheet.create({
		settingsButton: {
			width: "100%",
			paddingHorizontal: 15,
			paddingVertical: 15,
			flexDirection: "row",
		},
		settingButtonText: {
			color: theme.secondaryText,
			fontSize: 17,
			fontWeight: "bold",
		},
	});
