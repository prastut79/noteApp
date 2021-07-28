import React, { MutableRefObject } from "react";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableHighlight,
	Animated,
	useWindowDimensions,
} from "react-native";
import { useSelector, RootStateOrAny } from "react-redux";
import OnboardingCard from "../components/OnboardingCard";
import { LIGHT_THEME as theme } from "../utils/themes";
import { useRef, useState } from "react";
import ListPagination from "../components/ListPagination";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Onboarding = ({ navigation }: any) => {
	const scrollX = useRef(new Animated.Value(0)).current;
	const [currentIndex, setCurrentIndex] = useState(0);
	const onboardingData = useRef(
		useSelector((state: RootStateOrAny) => state.onboardingData)
	).current;

	const width = useRef(useWindowDimensions().width).current;
	const viewableItemsChanged = useRef(({ viewableItems }: any) => {
		if (viewableItems.length > 0) setCurrentIndex(viewableItems[0].index);
	}).current;

	const onboardingCard = ({ item, index }: any) => {
		const inputRange = [
			(index - 1) * width,
			index * width,
			(index + 1) * width,
		];
		const opacity = scrollX.interpolate({
			inputRange,
			outputRange: [0, 1, 0],
		});
		const translateY = scrollX.interpolate({
			inputRange,
			outputRange: [-100, 0, -100],
		});
		return (
			<Animated.View style={{ opacity, transform: [{ translateY }] }}>
				<OnboardingCard data={item} />
			</Animated.View>
		);
	};

	const flatListRef = useRef<FlatList>(null);

	const navigateHome = async () => {
		await AsyncStorage.setItem("firstLaunch", "false");
		navigation.replace("noteList");
	};

	const leftButtonPress = () => {
		if (currentIndex > 0) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex - 1,
			});
		} else if (currentIndex === 0) {
			navigateHome();
		}
	};
	const rightButtonPress = () => {
		if (currentIndex + 1 < onboardingData.length) {
			flatListRef.current?.scrollToIndex({
				index: currentIndex + 1,
			});
		} else if (currentIndex + 1 === onboardingData.length) {
			navigateHome();
		}
	};
	return (
		<View style={styles.onboardingContainer}>
			<View style={styles.listContainer}>
				<Animated.FlatList
					data={onboardingData}
					renderItem={onboardingCard}
					ref={flatListRef}
					keyExtractor={(item) => item.id}
					showsHorizontalScrollIndicator={false}
					horizontal
					pagingEnabled
					bounces={false}
					scrollEventThrottle={32}
					onScroll={Animated.event(
						[{ nativeEvent: { contentOffset: { x: scrollX } } }],
						{ useNativeDriver: true }
					)}
					viewabilityConfig={{
						itemVisiblePercentThreshold: 50,
					}}
					onViewableItemsChanged={viewableItemsChanged}
					scrollEnabled={true}
				/>
			</View>
			<View style={{ alignItems: "center", flex: 0.1 }}>
				<ListPagination
					length={onboardingData.length}
					scrollX={scrollX}
				/>
			</View>
			<View>
				<View>
					<TouchableHighlight
						style={[
							styles.button,
							{
								borderTopRightRadius: 50,
								borderBottomRightRadius: 50,
								backgroundColor: theme.lightText,
								width: width / 3,
							},
						]}
						underlayColor={theme.secondaryText}
						onPress={leftButtonPress}
						touchSoundDisabled={true}
					>
						<Text
							style={[
								styles.buttontext,
								{ color: theme.primaryText },
							]}
						>
							{currentIndex === 0 ? "SKIP" : "BACK"}
						</Text>
					</TouchableHighlight>
				</View>
				<View
					style={{
						position: "absolute",
						right: 0,
					}}
				>
					<TouchableHighlight
						style={[
							styles.button,
							{
								borderTopLeftRadius: 50,
								borderBottomLeftRadius: 50,
								backgroundColor: theme.header,
								width: width / 3,
							},
						]}
						underlayColor={theme.header}
						onPress={rightButtonPress}
						touchSoundDisabled={true}
					>
						<Text
							style={[
								styles.buttontext,
								{ color: theme.background },
							]}
						>
							{currentIndex + 1 === onboardingData.length
								? "EXPLORE"
								: "NEXT"}
						</Text>
					</TouchableHighlight>
				</View>
			</View>
		</View>
	);
};

export default Onboarding;

const styles = StyleSheet.create({
	onboardingContainer: {
		height: "100%",
		backgroundColor: theme.background,
	},
	listContainer: {
		flex: 0.8,
	},
	button: {
		height: 60,
		alignItems: "center",
		justifyContent: "center",
		elevation: 1,
		// flex: 0.4,
	},
	buttontext: {
		fontSize: 18,
		fontWeight: "bold",
	},
});
