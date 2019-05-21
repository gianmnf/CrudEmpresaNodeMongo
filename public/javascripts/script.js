function excluir(tipo, id){
    if(tipo == 'empresa'){
    if(confirm('Deseja excluir a empresa com o id ' + id + '?')){
        window.location.href="/delete/" + id; 
        alert('A empresa com o id ' + id + ' foi excluída com sucesso.');
    }    
    }
    else if(tipo == 'funcionario'){
    if(confirm('Deseja excluir o funcionario com o id ' + id + '?')){
        window.location.href="/deleteFuncionario/" + id;
        alert('O funcionario com o id ' + id + ' foi excluído com sucesso.');
    }
    }
}