import { types } from "../types/types";
import moment from "moment";

const initialState = {
	events: [
		{
			id: "123",
			title: "Cumple",
			start: moment().toDate(),
			end: moment().add(2, "hours").toDate(),
			user: {
				_id: "123",
				name: "Max",
			},
		},
	],
	activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.eventAddNew:
			return {
				...state,
				events: [...state.events, action.payload],
			};
		case types.eventSetActive:
			return {
				...state,
				activeEvent: action.payload,
			};
		case types.eventClearActiveEvent:
			return {
				...state,
				activeEvent: null,
			};
		case types.eventUpdated:
			return {
				...state,
				events: state.events.map((e) =>
					e.id === action.payload.id ? action.payload : e
				),
			};
		case types.eventDeleted:
			return {
				...state,
				events: state.events.filter((e) => e.id !== state.activeEvent.id),
				activeEvent: null,
			};
		default:
			return state;
	}
};
