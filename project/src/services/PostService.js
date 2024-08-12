class PostService {
    static getPosts(url) {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await fetch(url, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!res.ok) {
                    throw new Error('Network response was not ok ' + res.statusText);
                }
                const data = await res.json();
                resolve(data);
            } catch (err) {
                reject(err);
            }
        });
    }

    static async insertPost(url, params) {
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(params)
            });
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            return await res.json();
        } catch (err) {
            throw new Error('Failed to insert post: ' + err.message);
        }
    }

    
}

export default PostService;