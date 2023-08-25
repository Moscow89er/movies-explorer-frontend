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

    getUserInfo(token) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${token}`
            }
        })
        .then(this._checkResponse)
    }

    editUserInfo(userData) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({
                name: userData.name,
                email: userData.email
            })
        })
        .then(this._checkResponse)
    }

    register(name, email, password) {
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
    }

    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(this._checkResponse)
    }

    getMovies() {
        return fetch(`${this._url}/movies`, {
            method: 'GET',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(this._checkResponse)
    }

    saveMovie(movie) {
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify(movie)
        })
        .then(this._checkResponse)
    }

    deleteMovie(movieId) {
        return fetch(`${this._url}/movies/${movieId}`, {
            method: 'DELETE',
            headers: {
                ...this.headers,
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(this._checkResponse)
    }
}

const mainApi = new MainApi ({
    url: 'http://api.mesto.moscow89er.nomoreparties.sbs',
    headers: {
        'Content-Type': 'application/json'
    }
})

export default mainApi;