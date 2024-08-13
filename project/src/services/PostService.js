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
}

export default PostService;