/*
* EasyHTTP Library
* Library for making HTTP requests
* @version 2.0.0
* @#author Colin Willer
* @license MIT
*/

class EasyHTTP {
	// Make an HTTP GET Request
	get(url) {
		return new Promise((resolve, reject) => {
			fetch(url).then((res) => res.json()).then((data) => resolve(data)).catch((err) => reject(err));
		});
	}

	// Make an HTTP POST Request
	post(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then((res) => res.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	// Make an HTTP PUT Request
	put(url, data) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'PUT',
				headers: {
					'Content-type': 'application/json'
				},
				body: JSON.stringify(data)
			})
				.then((res) => res.json())
				.then((data) => resolve(data))
				.catch((err) => reject(err));
		});
	}

	// Make an HTTP DELETE Request
	delete(url) {
		return new Promise((resolve, reject) => {
			fetch(url, {
				method: 'Delete',
				headers: {
					'Content-type': 'application/json'
				}
			})
				.then((res) => res.json())
				.then((data) => resolve('Resource Deleted'))
				.catch((err) => reject(err));
		});
	}
}
