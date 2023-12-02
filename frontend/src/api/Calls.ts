import axios, { AxiosError } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9000/api',
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        if (error.response) {           
            console.error('Error response:', error.response.data);
        } else if (error.request) {           
            console.error('No response received:', error.request);
        } else {           
            console.error('Error setting up the request:', error.message);
        }      
        return Promise.reject(error);
    }
);

async function get(url: string, queryParams: any = null, id: any = null) {
    let newUrl = !id ? url : url + "/" + id;
    return (await api.get(newUrl, { params: queryParams })).data;
}

async function post(url: string, item: any) {
    return (await api.post(
        url,
        item,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )).data;
}

async function put(url: string, id: any, item: any) {
    return (await api.put(
        url + "/" + id,
        item,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )).data;
}

async function remove(url: string, id: any) {
    return (await api.delete(
        url + "/" + id
    )).data;
}

export { get, post, put, remove } 