const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "black",
					initial: "black"
				},
				{
					title: "SECOND",
					background: "black",
					initial: "black"
				}
			],
			token: sessionStorage.getItem("token"),
      anime: [],
			favorites: [],
			manga: [],
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
        setStore({token: data.access_token})
				console.log(sessionStorage.getItem("token"))
			},
      logout: () => {
        sessionStorage.removeItem("token")
        setStore({token: null})
      }, 
      getAnime: () => {
				fetch(apiUrl + "anime")
				.then(resp => resp.json())
				.then(data => setStore({planets: data.results}))
				.catch(error => console.log(error))
			},
			getManga: () => {
				fetch(apiMangaUrl + "manga")
				.then(resp => resp.json())
				.then(data => setStore({planets: data.results}))
				.catch(error => console.log(error))
			},
			addFavorites: (favItem) => {
				setStore({
					favorites: [...getStore().favorites, favItem]
				})
			},
			deleteFavorites: (index) => {
				const store = getStore();
				const newFavorites = store.favorites.filter((_, i) => i !== index); 
				setStore({
					favorites: newFavorites
				})
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
