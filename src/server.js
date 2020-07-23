const express = require('express');
require('./dbconection');
const Student = require('./studentModel');
const User = require('./userModel');
const uuid = require('uuid');
const app = express();
app.use(express.json());

app.get('/turma/:turma',async(req,res)=>{
    const turma = req.params.turma;
    const alunos = await Student.find({turma:turma})
    console.log(alunos)
    
   if (alunos.length > 0){
       res.status(200).json({alunos})
       return
   }
   res.status(404).json({message:"Turma inválida"})
})

app.post('/createStudent', async (req, res) => {
   

    const name = req.body.name;
    const turma = req.body.turma;
    const user = await Student.findOne({name:name});
    console.log(user)

    if (user){
        res.status(200).json({message:'Usuário já existente :',id: user.id})
        return;
    }

    const id = uuid.v4()
    const newStudent = new Student({
        name: name,
        id : id,
        turma : turma

    });

 newStudent.save()
        .then((resp) => {

            console.log(resp)

            res.status(200).json({ message: 'Cadastrado realizado com sucesso ! ' })
        })
        .catch((erro) => {

            console.log(erro)

            res.status(400).json({ message: ' Verifique os dados inseridos' })
        })

})

app.delete('/delete/:id',async (req,res)=>{
var id = req.params.id
var del = await Student.deleteOne({id:id})
var cont = del.deletedCount
if (cont > 0){
res.status(200).json({message:'Deletado com sucesso'})
return ;
}
res.status(404).json({message:'ID não encontrado'})

})













app.listen(3000, () => {
    console.log('Server online')
});