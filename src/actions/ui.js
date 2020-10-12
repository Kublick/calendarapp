const { types } = require("../types/types");

export const uiOpenModal = () => ({
	type: types.uiOpenModal,
});

export const uiCloseModal = () => ({
	type: types.uiCloseModal,
});
