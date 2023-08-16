class MainApi {
    constructor(options) {
        this._url = options.url;
        this.headers = options.headers;
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    setToken(token) {
        this.headers.authorization = `Bearer ${token}`;
    }

    getUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this.headers
        })
        .then(this._checkResponse)
    }

    editUserInfo(userData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: userData.name,
                email: userData.email
            })
        })
        .then(this._checkResponse)
    }

    register({ name, email, password }) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            }),
        })
        .then(this._checkResponse)
        .then((data) => {
            if (data.token) {
                this.setToken(data.token);
                localStorage.setItem('jwt', data.token);
                return data;
            } else {
                return;
            }
        })
    }

    authorize({ email, password }) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(this._checkResponse)
        .then((data) => {
            if (data.token) {
                this.setToken(data.token);
                localStorage.setItem('jwt', data.token);
                return data;
            } else {
                return;
            }
        })
    }
}

const mainApi = new MainApi ({
    url: 'http://api.mesto.moscow89er.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default mainApi;