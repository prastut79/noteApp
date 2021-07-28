import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Modal,
	Button,
	Pressable,
} from "react-native";
import React from "react";
import { useSelector, RootStateOrAny } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

type propType = {
	visible: boolean;
	setVisible: any;
	children: any;
	title?: string;
};

export default function BottomPopup(props: propType) {
	const theme = useSelector((state: RootStateOrAny) => state.appTheme.theme);
	const style = styles(theme);
	return (
		<Modal
			animationType="fade"
			transparent={true}
			visible={props.visible}
			onRequestClose={() => props.setVisible(false)}
		>
			<Pressable
				android_disableSound
				style={style.modelContainer}
				onPress={() => props.setVisible(false)}
			>
				<View
					style={style.model}
					onStartShouldSetResponder={() => true}
				>
					<View style={style.headerContainer}>
						<View style={style.topLine} />
						{props.title && (
							<Text style={style.title}>{props.title}</Text>
						)}
					</View>
					<View style={style.buttonsContainer}>
						{props.children}
						<Pressable
							android_ripple={{
								color: theme.lightText,
							}}
							android_disableSound
							style={({ pressed }) => [
								{
									backgroundColor: pressed
										? theme.lightText
										: null,
								},
								{
									marginTop: 15,
									paddingVertical: 15,
									backgroundColor: theme.primaryBackground,
									borderRadius: 4,
									// width:"90%"
								},
							]}
							onPress={() => props.setVisible(false)}
						>
							<Text
								style={{
									fontSize: 17,
									fontWeight: "bold",
									color: theme.primaryText,
									textAlign: "center",
								}}
							>
								Close
							</Text>
						</Pressable>
					</View>
				</View>
			</Pressable>
		</Modal>
	);
}

const styles = (theme: any) =>
	StyleSheet.create({
		modelContainer: {
			flex: 1,
			height: "100%",
			backgroundColor: "rgba(0,0,0,0.3)",
		},
		model: {
			backgroundColor: theme.secondaryBackground,
			position: "absolute",
			bottom: 0,
			width: "100%",
			borderTopRightRadius: 15,
			borderTopLeftRadius: 15,
		},
		headerContainer: {
			alignItems: "center",
			justifyContent: "center",

			paddingVertical: 15,
		},
		topLine: {
			backgroundColor: theme.lightText,
			paddingHorizontal: 0,
			paddingVertical: 3.3,
			borderRadius: 5,
			width: "12%",
		},
		title: {
			fontSize: 17,
			fontWeight: "bold",
			color: theme.primaryText,
			marginTop: 15,
			borderBottomWidth: 0.7,
			borderColor: theme.lightText,
			width: "100%",
			textAlign: "center",
			paddingBottom: 10,
		},
		buttonsContainer: {
			marginBottom: 15,
		},
		close: {},
	});
