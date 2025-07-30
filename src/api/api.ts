import OpenAPIClientAxios from "openapi-client-axios";
import type { Client } from "../openapi";

let client:Client

const API = async () => {
    if (!client) {
        const apiInstance = new OpenAPIClientAxios({ definition: import.meta.env.VITE_OPENAPI_URL })
        client = await apiInstance.init<Client>()
    }
    return client
}

export default  API;