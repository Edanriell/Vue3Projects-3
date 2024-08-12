import countries from "./countries.json";
import states from "./states.json";
import USA_cities from "./USA_localities.json";
import ARG_cities from "./ARG_localities.json";

const LOCALITIES = {
	USA: USA_cities,
	ARG: ARG_cities
};

const service = {
	getCountries() {
		return countries.sort();
	},
	getStatesByCountry(country_code: any) {
		return (states as any)[country_code].sort();
	},
	getCitiesByCountryAndState(country_code: any, state_name: any) {
		const cities: any = (LOCALITIES as any)[country_code].filter((item: any) => {
			return state_name == item.state;
		});
		return cities.sort();
	}
};

export default service;
