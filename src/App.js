import { useState,useEffect } from 'react';
import firebase from './firebaseConnection'



function App() {

let [titulo,setTitulo] = useState('')
let [autor,setAutor] = useState('')
let [posts,setPosts] = useState([])
let [email,setEmail] = useState('')
let [senha,setSenha] = useState('')
let [user,setUser] = useState('')
let [userLogged,setUserLogged] = useState([])

useEffect(()=>{

  async function buscaLista(){
  
    
  try{
    await firebase.firestore()
    .collection('posts')
    .onSnapshot(data=>{ // atualiza em real time lista
      let lista = []
      data.forEach(res=>{
        lista.push({
          id:res.id,
          titulo:res.data().titulo,
          autor:res.data().autor
        })
      })
      setPosts(lista)
    })
  }catch(error){
    console.log(error)
  }

  
  }
buscaLista()
},[])

useEffect(()=>{
  async function checkLogin(){

    await firebase.auth().onAuthStateChanged(user=>{
      if(user){
        setUser(true)
        setUserLogged({
          uid:user.uid,
          email:user.email
        })
      }else{
        setUser(false)
        setUserLogged({})
      }
    })
  }

  checkLogin()
},[])

async function deletar(id){
  try{
    await firebase.firestore()
      .collection('posts')
      .doc(id)
      .delete()
      alert('POST DELETADO!')
  }catch(error){
    console.log(error)
  }
}


async function atualizar(id){
  try{
    await firebase.firestore()
        .collection('posts')
        .doc(id)
        .update({
          titulo:titulo,
          autor:autor
        })
        setTitulo('')
        setAutor('')
  }catch(error){
    console.log(error)
  }
}

async function handleAdd(){

  try{
    await firebase.firestore()
        .collection('posts')
        .doc()  // pode ser .add({titulo:titulo,autor:autor})
        .set({
          titulo:titulo,
          autor:autor
        })
        alert('Cadastrado com sucesso')
        setTitulo('')
        setAutor('')
  }catch(error){
    console.log(error)
  }
}

/*async function handleSearch(){
  try{
    let snapshot = await firebase.firestore()
    .collection('posts')
    .doc('yJLCmoNRwQVDPytfMUu0')
    .get()

    setTitulo(snapshot.data().titulo)
    setAutor(snapshot.data().autor)
  }catch(error){
    console.log(error)
  }
}*/

/*async function buscaLista(){
  let postsResult = []
  try{
    alert('teste')
    let lista = await firebase.firestore().collection('posts').get()
    lista.forEach(res=>{
      postsResult.push({
        id:res.id,
        titulo:res.data().titulo,
        autor:res.data().autor
      })
    })
    setPosts(postsResult)
    console.log({posts})
}catch(error){
  console.log(error)
  }
}*/
async function logar(){
  try{
    await firebase.auth().createUserWithEmailAndPassword(email,senha)
    console.log('Usuário cadastrado com sucesso!')
  }catch(error){
    if(error.code === 'auth/email-already-in-use'){
      alert('Email ja cadastrado na base de dados')
    }
    if(error.code === 'auth/weak-password'){
      alert('Senha mto fraca, pelo menos 6 digitos')
    }
    if(error.code === 'auth/invalid-email'){
      alert('email inválido')
    }
    console.log(error)
  }
  
}

async function logout(){
  await firebase.auth().signOut()
}

async function logarUsuario(){
  try{
    let userLogged = await firebase.auth().signInWithEmailAndPassword(email,senha)
    console.log(userLogged.user)
  }catch(error){
    console.log(error)
  }
  
}


  return (
    <div className="App">
        <h1>React js + firebase ;)</h1>

      
        {user && (
          <div>
            <h1>Seja bem vindo você está logado</h1>
            <span>{userLogged.uid} - {userLogged.email}</span>
          </div>
          
        )}

      <label>Cadastro de Usuário</label><br></br>

      <input type="text" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
      <br></br>
      <input type="text" value={senha} onChange={(e)=>{setSenha(e.target.value)}}/>
      <button onClick={logar}>Criar Usuário</button>
      <br/>
      <button onClick={logout}>Logout</button>
      <button onClick={logarUsuario}>Logar</button>




      <hr></hr>
      <br></br><br></br>

      <label>Titulo</label>
      <textarea value={titulo} onChange={(e)=>{setTitulo(e.target.value)}}></textarea><br></br>
      <label>Autor</label>
      <input value={autor} onChange={(e)=>{setAutor(e.target.value)}}></input>

      <button onClick={handleAdd}>Cadastrar</button>
      <button>Buscar Doc</button><br></br>
      
      

      <ul>
        {posts.map(res=>{
          return(
          <div key={res.id}>
              <li>{res.titulo}</li>
              <li>{res.autor}</li>
            <button onClick={()=>{atualizar(res.id)}}>Atualizar</button>
            <button onClick={()=>{deletar(res.id)}}>Deletar</button>
          </div>
          )
        })}
        </ul>
    </div>
  );
}

export default App;
