const {nanoid} = require('nanoid');
const error = require('../../../utils/error');

const TABLA = 'post';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    function list() {
        return store.list(TABLA);
    }

    async function get(id) {
		const user = await store.get(TABLA, id);
		if (!user) {
			throw error('No existe el post', 404);
		}

		return user;
	}

    async function upsert(data, user) {
		const post = {
			id: data.id,
            title: data.title,
			description: data.description,
			user: user,
		}

		if (!post.id) {
			post.id = nanoid();
		}

		return store.upsert(TABLA, post).then(() => post);
	}

    function like(post, user) {
        const like = store.upsert(TABLA + '_like', {
            post: post,
            user: user,
        });

        return like;
	}

    async function postLikes(post) {
        const join = {}
        join[TABLA] = 'user'; // { user: 'user_to' }
        const query = { post: post };
		
		return await store.query(TABLA + '_like', query, join);
	}

    return {
        list,
        upsert,
        get,
        like,
        postLikes,
    }
}