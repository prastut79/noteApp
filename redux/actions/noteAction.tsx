export const ADD_NOTE = "ADD_NOTE";
export const SET_NOTE = "SET_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_ALL_NOTE = "DELETE_ALL_NOTE";

export const setNote = (notes: any) => {
	return {
		type: SET_NOTE,
		notes: notes,
	};
};
export const addNote = (note: any) => {
	return {
		type: ADD_NOTE,
		note: note,
	};
};
export const deleteNote = (id: string) => {
	return {
		type: DELETE_NOTE,
		id: id,
	};
};

export const updateNote = () => {
	return {
		type: UPDATE_NOTE,
	};
};

export const deleteAllNote = () => {
	return {
		type: DELETE_ALL_NOTE,
	};
};
