const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('config/permission.json');
const db = low(adapter);


const createRole = async (role) => {
    const name = '{"'+role+'"' + ':{"grants": []}}';
    const nameObj = JSON.parse(name);
    await db.defaults(nameObj)
    .write();
};

const addGrantByRole = async (role, resource, action) => {
    const tmp = '{"resource":"'+resource+'","action":"'+action+'","attributes": ["*"]}'
    const Obj = JSON.parse(tmp);
    await db.get(role)
    .get('grants')
    .push(Obj)
    .write();
    
};

const deleteGrantByRole = async (role, resource) => {
    const tmp = '{"resource":"'+resource+'"}'
    const Obj = JSON.parse(tmp);
    // console.log(Obj);
    // console.log(Obj2);
    return await db.get(role)
    .get('grants')
    .remove(Obj)
    .write()
    
};

const deleteRolefuntion = async (role) => {
    // var stringDel = JSON.stringify(db.get(role).value());
    // // stringDel = stringDel.substring(1,stringDel.length-1);
    // // console.log(stringDel);
   
    // const Obj = JSON.parse(stringDel);
    // console.log(stringDel)
    // await db.get(role)
    // remove(Obj)
    // .write()

    // // const tmp = '{"'+role+'":{}}'
    // // console.log(Obj);
    // // console.log();
    // return await db.remove(Obj)
    // .write()

    
};

const updateGrantByRole = async (role, resource, action) => {
    const tmp = '{"resource":"'+resource+'"}'
    const tmp2 = '{"action":"'+ action+'"}'
    const Obj = JSON.parse(tmp);
    const Obj2 = JSON.parse(tmp2);
    // console.log(Obj);
    // console.log(Obj2);
    return await db.get(role)
    .get('grants')
    .find(Obj)
    .assign(Obj2)
    .write()
};

module.exports.readDb = function (req, res, next) {
    return res.send(db.value())
};

module.exports.addRole = async function (req, res, next) {
    const {role} = req.body;
    await createRole(role);
    return res.send(db.value());
};


module.exports.addGrant = async function (req, res, next) {
    const role = req.params.role;
    // console.log(role);
    const {resource, action} = req.body;
    await addGrantByRole(role, resource, action);
    return res.send(db.value());
};

module.exports.updateGrant = async function (req, res, next) {
    const role = req.params.role;
    const resource = req.query.resource;
    const {action} = req.body;
    await updateGrantByRole(role, resource, action);
    return res.send(db.value());
    // console.log(resource);
};

module.exports.deleteGrant = async function (req, res, next) {
    const role = req.params.role;
    const resource = req.query.resource;
    await deleteGrantByRole(role, resource);
    return res.send(db.value());
    // console.log(resource);
};

module.exports.deleteRole = async function (req, res, next) {
    const role = req.params.role;
    await deleteRolefuntion(role);
    return res.send(db.value());
    // console.log(resource);
};

