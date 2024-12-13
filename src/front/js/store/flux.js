const getState = ({ getStore, getActions, setStore }) => {
	const apiUrl = "https://api.jikan.moe/v4/"
	const apiMangaUrl = "https://api.jikan.moe/v4/manga/{id}/full"
	
	return {
		store: {
			starships: [],
			favorites: [],
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
			}












			
			
		}
	};
};

export default getState;
