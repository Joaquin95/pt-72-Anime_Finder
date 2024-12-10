const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: sessionStorage.getItem("token"),
		},
		actions: {
			// Use getActions to call a function within a fuction


			login: async (email, password) => {
				let response = await fetch(process.env.BACKEND_URL + "/login", {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({ 
						email: email,
						password: password
					})
				})
				let data = await response.json()
				sessionStorage.setItem("token", data.access_token);
				console.log(sessionStorage.getItem("token"))
			},













			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
