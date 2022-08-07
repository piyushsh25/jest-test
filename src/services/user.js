import axios from "axios";

async function getUser() {
	try {
		const response = await axios.get("https://mocki.io/v1/509bfedd-11c8-42ca-b773-dad8ab7504b9");
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			const serverError = error;
			if (serverError && serverError.response) {
				return serverError.response.data;
			}
		}
		
		return { errorMessage: "something went wrong!" };
	}
}

export default getUser;