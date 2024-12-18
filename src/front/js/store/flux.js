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
		  console.log(sessionStorage.getItem("token"));
		},
		logout: () => {
		  sessionStorage.removeItem("token");
		  setStore({ token: null });
		},
  
		getAnime: () => {
		  fetch("https://api.jikan.moe/v4/top/anime") // Fetch top anime
			.then((resp) => resp.json())
			.then((data) => {
			  if (data.data) {
				const top10Anime = data.data.slice(0, 24); // Get the first 10 anime
				setStore({ anime: top10Anime }); // Store the first 10 anime in state
			  }
			})
			.catch((error) => console.error("Error fetching anime:", error));
		},
  
		getManga: () => {
		  fetch("https://api.jikan.moe/v4/top/manga") // Fetch top manga
			.then((resp) => resp.json())
			.then((data) => {
			  if (data.data) {
				const top10Manga = date.date.slice(0, 36);
				setStore({ manga: top10Manga }); // Store the fetched manga list
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
		  console.log("Authorization Header:", `Bearer ${store.token}`);
  
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
  