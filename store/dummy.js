const db = {
    'user': [
        { id: '1', name: 'Carlos'},
    ],
}

async function list(tabla) {
    return db[tabla] || [];
}

async function get(tabla, id) {
    let coleccion = await list(tabla);
    return coleccion.find(item => item.id === id) || null; 
}

async function upsert(tabla, data) {
    if (!db[tabla]){
        db[tabla] = [];
    }

    db[tabla].push(data);

    console.log(db);
}

async function remove(tabla, id) {
    return true;
}

async function query(tabla, q) {
    let col = await list(tabla);
    let keys = Object.keys(q);
    let key = keys[0];

    return col.find(item => item[key] === q[key]) || null;
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query,
};