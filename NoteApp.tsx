import "react-native-gesture-handler";
import React from "react";
import { View, StatusBar, Text } from "react-native";
import { useSelector, RootStateOrAny, useDispatch } from "react-redux";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import {
	createStackNavigator,
	CardStyleInterpolators,
} from "@react-navigation/stack";
import NoteList from "./containers/noteList";
import NoteDetails from "./containers/noteDetails";
import { switchTheme } from "./redux/actions/themeAction";
import { LIGHT_THEME } from "./utils/themes";
import Onboarding from "./containers/onboarding";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setNote } from "./redux/actions/noteAction";
import SearchNote from "./components/NoteSearch";
import {
	NOTE_LIST,
	NOTE_DETAILS,
	NOTE_SEARCH,
	ONBOARDING,
} from "./utils/ScreenConfig";

const Stack = createStackNavigator();

export default function NoteApp() {
	const [isFirstLaunch, setIsFirstLaunch] = React.useState(true);
	const [loading, setLoading] = React.useState(true);
	const dispatch = useDispatch();

	React.useEffect(() => {
		(async () => {
			try {
				const value = await AsyncStorage.getItem("firstLaunch");
				const notes = await AsyncStorage.getItem("notes");
				const themeMode = await AsyncStorage.getItem("themeMode");
				if (value === "false") {
					setIsFirstLaunch(false);
				}
				if (notes !== null) {
					dispatch(setNote(JSON.parse(notes)));
				}
				if (themeMode !== null && themeMode === "light") {
					dispatch(switchTheme(LIGHT_THEME));
				}
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		})();
	}, []);

	const theme = useSelector((state: RootStateOrAny) => state.appTheme.theme);

	if (loading) {
		return (
			<View
				style={{
					height: "100%",
					backgroundColor: theme.header,
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Text>Loading...</Text>
			</View>
		);
	}

	const myTheme = {
		...DefaultTheme,
		colors: {
			...DefaultTheme.colors,
			background: theme.background,
		},
	};

	return (
		<>
			<StatusBar
				backgroundColor={theme.background}
				barStyle={theme.statusBarStyle}
			/>

			<NavigationContainer theme={myTheme}>
				<Stack.Navigator
					initialRouteName={
						!isFirstLaunch ? NOTE_LIST.name : ONBOARDING.name
					}
					screenOptions={{
						headerStyle: {
							backgroundColor: "transparent",
							shadowColor: "transparent",
							elevation: 0,
						},
						headerTitleStyle: {
							fontSize: 14,
							color: theme.lightText,
							fontWeight: "700",
							textAlign: "center",
							width: "100%",
						},
						headerTitleAlign: "center",
						cardStyleInterpolator:
							CardStyleInterpolators.forHorizontalIOS,
						gestureEnabled: true,
						headerTintColor: theme.lightText,
					}}
				>
					{isFirstLaunch && (
						<Stack.Screen
							name={ONBOARDING.name}
							component={Onboarding}
							options={{
								headerShown: false,
							}}
						/>
					)}
					<Stack.Screen name={NOTE_LIST.name} component={NoteList} />
					<Stack.Screen
						name={NOTE_SEARCH.name}
						component={SearchNote}
						options={{
							title: NOTE_SEARCH.title,
						}}
					/>
					<Stack.Screen
						name={NOTE_DETAILS.name}
						component={NoteDetails}
						options={{
							title: NOTE_DETAILS.title,
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</>
	);
}
