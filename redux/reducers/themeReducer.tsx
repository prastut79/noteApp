import { LIGHT_THEME, DARK_THEME } from "../../utils/themes";
import { SWITCH_THEME } from "../actions/themeAction";

const initialState = {
	theme: DARK_THEME,
};

const themeReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case SWITCH_THEME:
			if (action.theme.mode === state.theme.mode) {
				return state;
			}
			return {
				theme: action.theme,
			};
		default:
			return state;
	}
};

export default themeReducer;
