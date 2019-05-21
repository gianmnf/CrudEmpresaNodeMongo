var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.listarEmpresas((error, docs) => {
  	if(error){return console.log(error);}
  	
  	console.log(docs);
  	res.render('index', { title: 'Lista de Empresas', docs : docs });    

  })  
});

router.get('/funcionario', function(req, res) {
	global.db.listarFuncionarios((error, docs) => {
		if(error){return console.log(error);}
		
		console.log(docs);
		res.render('funcionario', { title: 'Lista de Funcionarios', docs : docs });    
  
	})  
  });

router.get('/new', function(req, res) {
	res.render('new', { title: 'Cadastrar Empresas',
								dadosempresa: { nome: "", numero: ""},
								action: '/new'});
})

router.get('/newFuncionario', function(req, res) {
	res.render('newFuncionario', { title: 'Cadastrar Funcionarios',
										  funcionarios: {nome: "", matricula: "",
															 rg: "", cpf:"", rua: "",
															 numero: "", bairro: "",
															 cidade: ""},
										  action: '/newFuncionario'});
})

router.post('/new', function(req, res){
	var nome = req.body.nome;
	var numero = parseInt(req.body.numero);
	var endereco = req.body.endereco;
	var cidade = req.body.cidade;
	var bairro = req.body.bairro;

	global.db.adicionarEmpresa( {nome, numero,endereco,bairro,cidade}, (error, result)  => {
		if(error){return console.log(error);}
		res.redirect('/');
	});
});

router.post('/newFuncionario', function(req, res){
	var nome = req.body.nome;
	var matricula = req.body.matricula;
	var rg = req.body.rg;
	var cpf = req.body.cpf;
	var rua = req.body.rua;
	var numero = parseInt(req.body.numero);
	var bairro = req.body.bairro;
	var cidade = req.body.cidade;

	global.db.adicionarFuncionario( {nome,matricula,rg,cpf,rua,numero,bairro,cidade}, (error, result)  => {
		if(error){return console.log(error);}
		res.redirect('/funcionario');
	});
});

router.get('/edit/:id', function(req,res){
	//Recupera id
	var id = req.params.id;
	global.db.buscarEmpresaPorId(id,(error,docs) => {
		if(error){
			return console.log(error);
		}
		res.render('new',{title: 'Edição de empresas', dadosempresa: docs[0], action: '/edit/' + docs[0]._id});
	})
})

router.post('/edit/:id', function(req,res){
	var id = req.params.id;
	var nome = req.body.nome;
	var endereco = req.body.endereco;
	var numero = parseInt(req.body.numero);
	var bairro = req.body.bairro;
	var cidade = req.body.cidade;
	global.db.atualizarEmpresa(id, {nome, endereco, numero, bairro, cidade}, (error,result) => {
		if(error){
			return console.log(error);
		}
		res.redirect('/');
	})
})

router.get('/delete/:id', function(req,res){
	var id = req.params.id;
	global.db.deleteEmpresa(id,(error,docs) => {
		if(error){
			return console.log(error);
		}
		res.redirect('/');
	})
})

//Funcionário

router.get('/editFuncionario/:id', function(req,res){
	var id = req.params.id;
	global.db.buscarFuncionarioPorId(id,(error,docs) => {
		if(error){
			return console.log(error);
		}
		res.render('newFuncionario',{title: 'Edição de Funcionários', funcionarios: docs[0], action: '/editFuncionario/' + docs[0]._id});
	})
})

router.post('/editFuncionario/:id', function(req,res){
	var id = req.params.id;
	var nome = req.body.nome;
	var matricula = req.body.matricula;
	var rg = req.body.rg;
	var cpf = req.body.cpf;
	var rua = req.body.rua;
	var numero = parseInt(req.body.numero);
	var bairro = req.body.bairro;
	var cidade = req.body.cidade;
	global.db.atualizarFuncionario(id, {nome, matricula, rg, cpf, rua, numero, bairro, cidade}, (error,result) => {
		if(error){
			return console.log(error);
		}
		res.redirect('/funcionario');
	})
})

router.get('/deleteFuncionario/:id', function(req,res){
	var id = req.params.id;
	global.db.deleteFuncionario(id,(error,docs) => {
		if(error){
			return console.log(error);
		}
		res.redirect('/funcionario');
	})
})
module.exports = router;
