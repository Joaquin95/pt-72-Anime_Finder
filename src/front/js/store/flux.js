const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            demo: [
                { title: "FIRST", background: "black", initial: "black" },
                { title: "SECOND", background: "black", initial: "black" },
            ],
            token: sessionStorage.getItem("token"),
        },
        actions: {
            login: async (email, password) => {
                try {
                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email, password }),
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error("Login failed:", errorData);
                        return alert(errorData.message || "Login failed!");
                    }

                    const data = await response.json();
                    sessionStorage.setItem("token", data.access_token);
                    setStore({ token: data.access_token });
                    console.log("Token stored:", data.access_token);
                } catch (error) {
                    console.error("Network error during login:", error);
                    alert("An error occurred. Please try again.");
                }
            },

            logout: () => {
                sessionStorage.removeItem("token");
                setStore({ token: null });
                console.log("User logged out, token removed");
            },

            validateToken: async () => {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    console.log("No token found");
                    return false;
                }

                try {
                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/validate-token", {
                        method: "GET",
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (!response.ok) {
                        console.error("Token validation failed");
                        sessionStorage.removeItem("token");
                        setStore({ token: null });
                        return false;
                    }

                    console.log("Token is valid");
                    return true;
                } catch (error) {
                    console.error("Error validating token:", error);
                    sessionStorage.removeItem("token");
                    setStore({ token: null });
                    return false;
                }
            },

            getMessage: async () => {
                const token = getStore().token;
                if (!token) {
                    console.error("No token available");
                    return;
                }

                try {
                    const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/hello", {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    if (!response.ok) {
                        console.error("Failed to fetch message");
                        return;
                    }

                    const data = await response.json();
                    setStore({ message: data.message });
                    return data;
                } catch (error) {
                    console.error("Error loading message from backend:", error);
                }
            },

            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });

                setStore({ demo });
            },
        },
    };
};

export default getState;

