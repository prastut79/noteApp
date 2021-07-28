// Logo Link=https://www.flaticon.com/packs/education-144
const initialState = [
	{
		id: "1",
		title: "Quick Note Add",
		description: "Quickly add Notes, Photos and lists to Keep.",
		image: require("./../../assets/images/onboarding1.png"),
	},
	{
		id: "2",
		title: "Easy Sign In",
		description: "Easy Login with Google Account.",
		image: require("./../../assets/images/onboarding2.png"),
	},
	{
		id: "3",
		title: "Light Weight",
		description: "Easy Login with Google A8ccount.",
		image: require("./../../assets/images/onboarding3.png"),
	},
	{
		id: "4",
		title: "Quick Reload",
		description: "Easy Log654in with Google Acc8ount.",
		image: require("./../../assets/images/onboarding4.png"),
	},
];

const onboardingReducer = (state = initialState, action: any) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default onboardingReducer;
