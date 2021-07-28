export const SWITCH_THEME = "SWITCH_THEME";

export const switchTheme = (theme: any) => {
	return {
		type: SWITCH_THEME,
		theme: theme,
	};
};
