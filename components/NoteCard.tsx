import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { RootStateOrAny, useSelector } from "react-redux";
import { NOTE_DETAILS } from "./../utils/ScreenConfig";

type propType = {
	navigation: any;
	id: number;
	title: String;
	description: String;
};
export default function NoteCard({
	navigation,
	id,
	title,
	description,
}: propType) {
	const style = styles(
		useSelector((state: RootStateOrAny) => state.appTheme.theme)
	);

	const noteCardPress = () => {
		navigation.navigate(NOTE_DETAILS.name, {
			id: id,
			title: title,
			description: description,
		});
	};

	return (
		<TouchableOpacity
			style={{ ...style.noteContainer }}
			onPress={noteCardPress}
		>
			<Text numberOfLines={1} style={style.noteTitle}>
				{title}
			</Text>
			<Text numberOfLines={2} style={style.noteDescription}>
				{description}
			</Text>
		</TouchableOpacity>
	);
}
const styles = (theme: any) =>
	StyleSheet.create({
		noteContainer: {
			backgroundColor: theme.primaryBackground,
			borderRadius: 4,
			paddingVertical: 15,
			paddingHorizontal: 10,
			marginVertical: 10,
			shadowColor: theme.primaryText,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.8,
			shadowRadius: 2,
			elevation: 1,
			borderColor: theme.secondaryText,
			borderRightWidth: 5,
		},
		noteTitle: {
			fontSize: 20,
			color: theme.primaryText,
			fontWeight: "bold",
		},
		noteDescription: {
			fontSize: 16,
			marginTop: 7,
			color: theme.secondaryText,
		},
	});
