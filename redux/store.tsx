import { createStore, combineReducers } from "redux";
import themeReducer from "./reducers/themeReducer";
import onboardingReducer from "./reducers/onboardingReducer";
import noteDetailsReducer from "./reducers/noteReducer";

const store = createStore(
	combineReducers({
		appTheme: themeReducer,
		onboardingData: onboardingReducer,
		notes: noteDetailsReducer,
	})
);

export default store;
