import {
	ADD_NOTE,
	SET_NOTE,
	DELETE_NOTE,
	UPDATE_NOTE,
	DELETE_ALL_NOTE,
} from "../actions/noteAction";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState: any = {
	notes: {},
	nextId: 1,
};

type actionType = {
	type: any;
	note: { id: number; title: String; description: String };
	notes?: any;
	id: any;
};

const noteDetailsReducer = (state = initialState, action: actionType) => {
	switch (action.type) {
		case UPDATE_NOTE:
			AsyncStorage.setItem("notes", JSON.stringify(state));
			return state;

		case SET_NOTE:
			return action.notes;

		case ADD_NOTE:
			const id =
				action.note.id === state.nextId
					? state.nextId + 1
					: state.nextId;

			return {
				notes: {
					...state.notes,
					[action.note.id]: action.note,
				},
				nextId: id,
			};

		case DELETE_NOTE:
			const dvalue = { ...state.notes };
			delete dvalue[`${action.id}`];
			if (Object.keys(dvalue).length === 0) {
				return initialState;
			}
			return { ...state, notes: dvalue };

		case DELETE_ALL_NOTE:
			return initialState;

		default:
			return state;
	}
};

export default noteDetailsReducer;
