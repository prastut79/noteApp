import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	useWindowDimensions,
} from "react-native";
import { LIGHT_THEME as theme } from "./../utils/themes";

type dataType = {
	data: {
		id: String;
		title: String;
		description: String;
		image: any;
	};
};

const OnboardingCard = ({ data }: dataType) => {
	const { width, height } = useWindowDimensions();

	return (
		<View style={[styles.onboardingContainer, { width }]}>
			<View style={styles.imageContainer}>
				<Image
					source={data.image}
					style={{
						width: height / 3.2,
						flex: 1,
						resizeMode: "contain",
					}}
				/>
			</View>
			<View style={styles.textContainer}>
				<Text style={styles.title}>{data.title}</Text>
				<Text style={styles.description}>{data.description}</Text>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	onboardingContainer: {
		flex: 1,
		alignItems: "center",
	},
	imageContainer: {
		alignItems: "center",
		flex: 0.6,
	},
	textContainer: {
		height: "40%",

		flex: 0.4,
		width: "80%",
	},
	title: {
		color: theme.primaryText,
		fontSize: 28,
		lineHeight: 40,
		textAlign: "center",
		fontWeight: "bold",
	},
	description: {
		color: theme.secondaryText,
		fontSize: 18,
		lineHeight: 23,
		textAlign: "center",
		marginTop: 10,
	},
});

export default OnboardingCard;
