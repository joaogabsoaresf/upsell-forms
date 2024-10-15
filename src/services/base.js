import { ref } from 'vue';

const data = ref(null);
const loading = ref(true);
const error = ref(null);

async function api_get(endpoint) {
    const url = `https://inradar.com.br/api/v1/webhook/operations${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Basic T7p9xERaU+IT7zgXgOdCxEfziYzB+aMPDcOzY6sXbc4='
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const data = await response.json();
        return data
    } catch (error) {}
};

async function api_post(endpoint, body) {
    const url = `https://operations-407517.rj.r.appspot.com/api${endpoint}`;
    // const url = `http://localhost:8000/api${endpoint}`;
    const headers = {
        'Content-Type': 'application/json',
    }

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }
        const data = await response.json();
        return data
    } catch (error) {}
};

export function get() {
    return {
        data,
        loading,
        error,
        api_get,
    };
}

export function post() {
    return {
        data,
        loading,
        error,
        api_post,
    };
}
