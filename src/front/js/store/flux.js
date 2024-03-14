const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            // Estado inicial del store
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
            resultados: [], // Almacenar los resultados de la búsqueda de libros
            urlBase: "https://openlibrary.org/search.json", 
        },
        actions: {
            login: async (email, password) => {
                const actions = getActions();
                try {
                    const data = await actions.APIfetch("/login", "POST", { email, password });
                    if (data.error) {
                        console.error("Error al iniciar sesión:", data.error);
                        return false;
                    }
                    setStore({ token: data.token });
                    localStorage.setItem("accessToken", data.token);
                    return true;
                } catch (error) {
                    console.error("Error al realizar la petición:", error);
                    return false;
                }
            },
            signup: async (email, password, first_name, last_name, phone, location) => {
                const actions = getActions();
                try {
                    const res = await actions.APIfetch("/signup", "POST", {
                        email, password, first_name, last_name, phone, location
                    });
                    if (res.error) {
                        console.error("Error al registrar el usuario:", res.error);
                        return false;
                    } else {
                        console.log("Usuario registrado exitosamente");
                        return true;
                    }
                } catch (error) {
                    console.error("Error al realizar la petición:", error);
                    return false;
                }
            },
            getMessage: async () => {
                const actions = getActions();
                try {
                    const data = await actions.APIfetch("/hello");
                    setStore({ message: data.message });
                } catch (error) {
                    console.log("Error loading message from backend", error);
                }
            },
            changeColor: (index, color) => {
                const store = getStore();
                const demo = store.demo.map((elm, i) => {
                    if (i === index) elm.background = color;
                    return elm;
                });
                setStore({ demo: demo });
            },
            APIfetch: async (endpoint, method = "GET", body = null) => {
                const params = { method, headers: {} };
                if (body) {
                    params.headers["Content-Type"] = "application/json";
                    params.body = JSON.stringify(body);
                }
                try {
                    const res = await fetch(`${process.env.BACKEND_URL}api${endpoint}`, params);
                    if (!res.ok) throw new Error(res.statusText);
                    return await res.json();
                } catch (error) {
                    console.error("Error fetching data:", error);
                    throw error;
                }
            },
            setBooks: async (searchTerm) => {
                const store = getStore();
                try {
                    const response = await fetch(`${store.urlBase}?q=${searchTerm}&limit=50`);
                    if (!response.ok) throw new Error('Respuesta no exitosa de la API');
                    const data = await response.json();
                    const filteredResults = data.docs.filter(doc => doc.title.toLowerCase().includes(searchTerm.toLowerCase())).slice(0, 6);
                    setStore({ resultados: filteredResults });
                } catch (error) {
                    console.error("Error al realizar la búsqueda:", error);
                }
            },
            loadSession: () => {
                const token = localStorage.getItem("accessToken");
                setStore({ token });
            }
        }
    };
};

export default getState;

