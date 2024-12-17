const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			token: sessionStorage.getItem("token"),
     		anime: [],
			favorites: [],
			manga: [],
		},
		actions: {

			login: (email, password) => {
				fetch(process.env.BACKEND_URL + "/login", {
					method: "POST",
					headers: { "Content-type": "application/json" },
					body: JSON.stringify({ 
						email: email,
						password: password
					})
				})
				.then((response) => response.json())
				.then((data) => {
				sessionStorage.setItem("token", data.access_token);
        		setStore({token: data.access_token})
				console.log(sessionStorage.getItem("token"));
			});
			},

      logout: () => {
        sessionStorage.removeItem("token");
        setStore({token: null });
      }, 

	  getAnimeByDay: (day) => {
		 return fetch ("https://api.jikan.moe/v4/schedules")
		.then((response) => response.json())
		.then((data) => {
			const formattedDay = day.charAt(0).toUpperCase() + day.slice(1).toLowerCase()
			const filteredAnime =data.data.filter(
				(anime) => anime.broadcast?.day === formattedDay
			);
			setStore({ anime: filteredAnime});
			return filteredAnime;
		})
		.catch((error) => { 
			console.log("Error fetching anime:", error);
			setStore({ anime: [] });
	  	});
	  },
	  
      getAnime: () => {
				fetch("https://api.jikan.moe/v4/anime")
				.then(resp => resp.json())
				.then(data => setStore({ anime: data.data || [] }))
				.catch(error => {
					console.log("Error fetching anime:", error);
					setStore({anime: [] });
	  			});
			},

			getManga: () => {
				fetch("https://api.jikan.moe/v4/manga/95/characters")
				.then(resp => resp.json())
				.then(data => setStore({ images: data.data || [] }))
				.catch(error => {
					 console.log( "Error fetching manga:", error);
					 setStore({manga: [] });
			 });
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
