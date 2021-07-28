import {
	Text,
	StyleSheet,
	Pressable,
	ToastAndroid,
	Clipboard,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch, RootStateOrAny } from "react-redux";
import BottomPopup from "./BottomPopup";
import { deleteNote, updateNote } from "../redux/actions/noteAction";
import { NoteType } from "../utils/Enums";
import { Alert } from "react-native";

export default function NoteDetailsSettings({
	visible,
	setVisible,
	note,
	navigation,
}: any) {
	const theme = useSelector((state: RootStateOrAny) => state.appTheme.theme);

	const style = styles(theme);
	const dispatch = useDispatch();

	const removeNote = () => {
		if (note.modifyType === NoteType.Edit) {
			Alert.alert(
				"Confirm",
				"Do you really wanna delete the note?",
				[
					{ text: "No", style: "cancel" },
					{
						text: "Yes",
						onPress: () => {
							setVisible(false);
							dispatch(deleteNote(note.id));
							dispatch(updateNote());

							navigation.navigate("noteList");
						},
						style: "destructive",
					},
				],
				{ cancelable: true }
			);
		} else {
			setVisible(false);
			navigation.navigate("noteList");
		}
	};
	const copyNote = () => {
		console.log(`${note.title}\n${note.description}`);
		Clipboard.setString(`${note.title}\n\n${note.description}`);
		setVisible(false);
		ToastAndroid.showWithGravity(
			"Note Copied",
			ToastAndroid.SHORT,
			ToastAndroid.BOTTOM
		);
	};
	return (
		<BottomPopup
			visible={visible}
			setVisible={setVisible}
			title="Note Options"
		>
			<Pressable
				android_disableSound
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? theme.lightText : null,
					},
					style.settingsButton,
				]}
				onPress={removeNote}
			>
				<Ionicons
					name="trash"
					size={21}
					color={theme.primaryText}
					style={{ marginRight: 10 }}
				/>
				<Text style={style.settingButtonText}>Delete</Text>
			</Pressable>
			<Pressable
				android_disableSound
				style={({ pressed }) => [
					{
						backgroundColor: pressed ? theme.lightText : null,
					},
					style.settingsButton,
				]}
				onPress={copyNote}
			>
				<Ionicons
					name="copy"
					size={21}
					color={theme.primaryText}
					style={{ marginRight: 10 }}
				/>
				<Text style={style.settingButtonText}>Copy</Text>
			</Pressable>
		</BottomPopup>
	);
}

const styles = (theme: any) =>
	StyleSheet.create({
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
	});
