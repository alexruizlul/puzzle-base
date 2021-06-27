const {nanoid} = require('nanoid');
const auth = require('../auth');

const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }
    
    async function list() {
        return store.list(TABLA);
    }
    
    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            email: body.email,
            description: body.description,
            celular: body.celular,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if (body.password || body.email) {
            await auth.upsert({
                id: user.id,
                email: user.email,
                password: body.password,
            })
        }

        return store.upsert(TABLA, user);
    }

    return {
        list,
        get,
        upsert,
    };
}

