var conexao = require("mongodb").MongoClient;

conexao.connect("mongodb://localhost/empresa")
.then(function(conn){global.conn = conn.db("empresa")}).catch(function(error){console.log(error)})


function listarEmpresas(callback){
    global.conn.collection("dadosempresa").find({}).sort({nome: 1}).toArray(callback);
}

function listarFuncionarios(callback){
    global.conn.collection("funcionarios").find({}).sort({nome: 1}).toArray(callback);
}

function adicionarEmpresa(dados, callback){
	global.conn.collection("dadosempresa").insert(dados, callback);
}

function adicionarFuncionario(dados, callback){
	global.conn.collection("funcionarios").insert(dados, callback);
}

//Recuperar um unico registro do mongo
var ObjectId = require("mongodb").ObjectId;

//Busca empresa por id

function buscarEmpresaPorId(id,callback){
    global.conn.collection("dadosempresa").find(new ObjectId(id)).toArray(callback);
}

function atualizarEmpresa(id, dados, callback) {
    global.conn.collection("dadosempresa").updateOne({_id: new ObjectId(id)},
    {$set: {nome: dados.nome, numero: dados.numero}}, callback);
}

function deleteEmpresa(id, callback) {
    global.conn.collection("dadosempresa").deleteOne({_id: new ObjectId(id)});
}

function buscarFuncionarioPorId(id,callback){
    global.conn.collection("funcionarios").find(new ObjectId(id)).toArray(callback);
}

function atualizarFuncionario(id, dados, callback) {
    global.conn.collection("funcionarios").updateOne({_id: new ObjectId(id)},
    {$set: {nome: dados.nome, matricula: dados.matricula, rg: dados.rg, cpf: dados.cpf,
    rua: dados.rua, numero: dados.numero, bairro: dados.bairro, cidade: dados.cidade}}, callback);
}

function deleteFuncionario(id,callback){
    global.conn.collection("funcionarios").deleteOne({_id: new ObjectId(id)});
}

module.exports = { listarEmpresas, adicionarEmpresa, listarFuncionarios,adicionarFuncionario,
    buscarEmpresaPorId,atualizarEmpresa,deleteEmpresa,buscarFuncionarioPorId,atualizarFuncionario,
    deleteFuncionario }