const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		message: null,
		demo: [
		  {
			title: "FIRST",
			background: "black",
			initial: "black",
		  },
		  {
			title: "SECOND",
			background: "black",
			initial: "black",
		  },
		],
		token: sessionStorage.getItem("token"),
		anime: [],
		favorites: [],
		manga: [],
		watchlist: [],
	  },
	  actions: {
		// Use getActions to call a function within a fuction
  
		login: async (email, password) => {
		  let response = await fetch(process.env.BACKEND_URL + "/login", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify({
			  email: email,
			  password: password,
			}),
		  });
		  let data = await response.json();
		  sessionStorage.setItem("token", data.access_token);
		  setStore({ token: data.access_token });
		},
		logout: () => {
		  sessionStorage.removeItem("token");
		  setStore({ token: null });
		},
  
		getAnime: () => {
		  fetch("https://api.jikan.moe/v4/schedules") // Fetch top anime
			.then((resp) => resp.json())
			.then((data) => {
			  if (data.data) {
				//   const top12Anime = data.data.slice(0, 12); // Get the first 12 anime
				const animeWithBroadcast = data.data.filter(
				  (animeItem) => animeItem.broadcast.day != null
				);
				console.log("animeWithBroadcast", animeWithBroadcast);
				setStore({ anime: animeWithBroadcast }); // Store the first 12 anime in state
			  }
			})
			.catch((error) => console.error("Error fetching anime:", error));
		},
  
		getAnimeByDay: (day) => {
		  const store = getStore();
		  return fetch("https://api.jikan.moe/v4/schedules")
			.then((response) => response.json())
			.then((data) => {
			  const animeWithBroadcast = data.data.filter(
				(animeItem) => animeItem.broadcast.day != null
			  );
  
			  const formattedDay =
				day.charAt(0).toUpperCase() + day.slice(1).toLowerCase() + "s";
  
			  const filteredAnime = animeWithBroadcast.filter(
				(anime) => anime.broadcast.day === formattedDay
			  );
			  let favs = [];
			  store.favorites.forEach((favAnime) => {
				  filteredAnime.forEach(
				  (item) => {
							  if(item.mal_id === favAnime.anime_id) {
								console.log("mal_id: ", item.mal_id, "anime_id: ", favAnime.anime_id)
								favs.push(favAnime);
							  }
				  }
				);
			  });
			  setStore({ watchlist: favs });
			})
			.catch((error) => {
			  console.log("Error fetching anime:", error);
			  setStore({ anime: [] });
			});
		},
  
		getManga: () => {
		  fetch("https://api.jikan.moe/v4/top/manga") // Fetch top manga
			.then((resp) => resp.json())
			.then((data) => {
			  if (data.data) {
				setStore({ manga: data.data }); // Store the fetched manga list
			  }
			})
			.catch((error) => console.error("Error fetching manga:", error));
		},
		addFavorites: (animeId) => {
		  const store = getStore();
  
		  if (!store.token) {
			console.error("No token found. Please log in.");
			return;
		  }
  
		  console.log("Sending favorite animeId:", animeId);
  
		  fetch(process.env.BACKEND_URL + "/favoriteAnime", {
			method: "POST",
			headers: {
			  "Content-Type": "application/json",
			  Authorization: "Bearer " + store.token, // Send the Bearer token
			},
			body: JSON.stringify({ anime: animeId }),
		  })
			.then((resp) => {
			  console.log("POST Response status:", resp.status); // Log response status
			  if (!resp.ok) throw new Error("Failed to add favorite");
			  return resp.json();
			})
			.then((data) => {
			  console.log("Favorite added successfully:", data);
			})
			.catch((error) => {
			  console.error("Error adding favorite:", error);
			});
		},
  
		deleteFavorites: (animeId) => {
		  const store = getStore();
		  const actions = getActions();

		  fetch(`${process.env.BACKEND_URL}/favorite/anime/${animeId}`, {
			method: "DELETE",
			headers: {
			  Authorization: "Bearer " + store.token, // Add token for authorization
			},
		  })
			.then((resp) => {
			  if (resp.ok) {
				actions.getFavorites(); // Re-fetch updated favorites
			  }
			})
			.catch((error) => console.error("Error deleting favorite:", error));
		},
  
		getFavorites: () => {
		  const store = getStore();
  
		  setStore({ favorites: [], isLoading: true }); // Set loading to true
  
		  fetch(process.env.BACKEND_URL + "/favoriteAnime", {
			method: "GET",
			headers: {
			  Authorization: "Bearer " + store.token, // Send JWT token
			},
		  })
			.then((resp) => {
			  if (!resp.ok) throw new Error("Failed to fetch favorites");
			  return resp.json();
			})
			.then((data) => {
			  setStore({ favorites: data, isLoading: false }); // Set favorites and turn off loading
			})
			.catch((error) => {
			  console.error("Error fetching favorites:", error);
			  setStore({ isLoading: false }); // Turn off loading even if fetch fails
			});
		},
  
		//   exampleFunction: () => {
		//     getActions().changeColor(0, "green");
		//   },
  
		//   getMessage: async () => {
		//     try {
		//       // fetching data from the backend
		//       const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
		//       const data = await resp.json();
		//       setStore({ message: data.message });
		//       // don't forget to return something, that is how the async resolves
		//       return data;
		//     } catch (error) {
		//       console.log("Error loading message from backend", error);
		//     }
		//   },
		//   changeColor: (index, color) => {
		//     //get the store
		//     const store = getStore();
  
		//     //we have to loop the entire demo array to look for the respective index
		//     //and change its color
		//     const demo = store.demo.map((elm, i) => {
		//       if (i === index) elm.background = color;
		//       return elm;
		//     });
  
		//     //reset the global store
		//     setStore({ demo: demo });
		//   },
	  },
	};
  };
  export default getState;