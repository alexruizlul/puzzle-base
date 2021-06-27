const bcrypt = require('bcrypt');
const auth = require('../../../auth');
const TABLA = 'auth';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if(!store) {
        store = require('../../../store/dummy');
    }

    async function login(email, password) {
        const data = await store.query(TABLA, { email: email});
        
        return bcrypt.compare(password, data.password)
            .then(sonIguales => {
                if (sonIguales === true) {
                    // Generar token
                    return auth.sign({ ...data});
                } else {
                    throw new Error('Información inválida');
                }
            });
    }

    async function upsert(data) {
        const authData = {
            id: data.id,
        }

        if (data.email) {
            authData.email = data.email;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 7);
        }

        return store.upsert(TABLA, authData);
    }

    return {
        login,
        upsert,
    };

};