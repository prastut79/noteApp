import { StyleSheet, Animated, useWindowDimensions, View } from "react-native";
import React from "react";
import { LIGHT_THEME as theme } from "../utils/themes";

type propType = {
	length: number;
	scrollX: any;
};

const ListPagination = ({ length, scrollX }: propType) => {
	const { width } = useWindowDimensions();
	return (
		<View style={{ flexDirection: "row" }}>
			{Array(length)
				.fill(undefined)
				.map((_, i) => {
					const inputRange = [
						(i - 1) * width,
						i * width,
						(i + 1) * width,
					];
					const scale = scrollX.interpolate({
						inputRange,
						outputRange: [1, 1.1, 1],
						extrapolate: "clamp",
					});

					const opacity = scrollX.interpolate({
						inputRange,
						outputRange: [0.3, 1, 0.5],
						extrapolate: "clamp",
					});
					return (
						<Animated.View
							style={[
								styles.dot,
								{ transform: [{ scale }], opacity },
							]}
							key={i}
						/>
					);
				})}
		</View>
	);
};

const styles = StyleSheet.create({
	dot: {
		backgroundColor: theme.header,
		height: 10,
		width: 10,
		borderRadius: 5,
		marginHorizontal: 6,
	},
});

export default ListPagination;
