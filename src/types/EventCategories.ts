enum EventCatagories {
	CRICKET = "Cricket",
	FOOTBALL = "Football",
	SQUASH_MEN = "Squash_men",
	CHESS = "Chess",
	SQUASH_WOMEN = "Squash_women",
	TENNIS_WOMEN = "Tennis_women",
	TENNIS_MEN = "Tennis_men",
	ATHLETICS = "Athletics",
}

export const formatEventName = (e: string) => {
	let fName = "";
	let hasU = false;
	for (let i = 0; i < e.length; i++) {
		const char = e.charAt(i);
		if (char === "_") {
			hasU = true;
			fName += " (";
		} else {
			fName += char;
		}
	}
	if (hasU) fName += ")";
	return fName;
};

export default EventCatagories;
