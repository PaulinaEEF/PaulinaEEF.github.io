import React from 'react'
import { collection, addDoc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
// Librerias de ReactFirebase
import { useFirestore, useFirestoreCollectionData, useUser, useAuth } from 'reactfire';
import './assets/CSS/indexStyle.css';
import { useHistory } from 'react-router-dom'
import GoogleLogin from 'react-google-login';


function Login(){
    let history = useHistory();
    const respuestaGoogle=(respuesta)=>{
    console.log(respuesta);
    var existe = false;
    if(localStorage.getItem('email')){ 
        var correos = localStorage.getItem('email').split(",");
        for (var i = 0; i < correos.length; i++) {
            var usuario = correos[i].split("|");
            if(usuario[0] === respuesta.dt.Nt){
                existe = true;
                window.alert("Usuario ya existente");
            }
        }
    }
    if(!existe){
        console.log("Usuario no existente");
        if(localStorage.getItem('gmail')){
        var correosG = localStorage.getItem('gmail').split(",");
        for (var i = 0; i < correosG.length; i++) {
            var usuarioG = correosG[i].split("|");
            if(usuarioG[0] === respuesta.dt.Nt){
                existe = true;
                localStorage.removeItem('usuarioActual');
                const usuarioActual = respuesta.dt.Nt + "|" +usuarioG[1];
                localStorage.setItem('usuarioActual',usuarioActual);
                history.push("/principal");
            }
        }
    }
    if(!existe){
        const cadena = respuesta.dt.Nt +"|"+respuesta.dt.Ve;
        if(localStorage.getItem('gmail')){            
            localStorage.setItem('gmail', localStorage.getItem('gmail') + ',' + cadena);
            localStorage.removeItem('usuarioActual');
            localStorage.setItem('usuarioActual',cadena);
            history.push("/principal");
        }else{
            console.log("Entró");
            localStorage.setItem('gmail',cadena);
            localStorage.removeItem('usuarioActual');
            localStorage.setItem('usuarioActual',cadena);
            history.push("/principal");
        }    
        console.log("Usuario no existente");
    }   
        console.log(respuesta.dt.Nt);
        console.log(respuesta.dt.Ve);
    }
}
    function iniciar(e){
        e.preventDefault();
        const user = document.getElementById('correo').value;
        const pass = document.getElementById('contrasena').value;
        if(localStorage.getItem('email')){
            var correos = localStorage.getItem('email').split(",");
            var ingreso = false;
            var userAct;
            for (var i = 0; i < correos.length; i++) {
                var usuario = correos[i].split("|");
                if(usuario[0] === user && usuario[2] === pass){
                    ingreso = true;
                    userAct = usuario[1];
                }
            }
            if(ingreso){
                const usuarioActual = user + "|" + userAct;
                localStorage.removeItem('usuarioActual');
                localStorage.setItem('usuarioActual',usuarioActual);
                console.log('Ingresó correctamente');
                history.push("/principal");
            }else{
                window.alert("Usuario y/o contraseña incorrecta");
            }
        }
    }
    return(
        <div className="container container_p rounded w-50 shadow my-3 py-3">
            <nav className="row py-3 navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="col-9">
                <h1 className="title">Bearnote</h1>
                </div>
           </nav>
            <div className="row">
                
                <div className="col bg-white p-5 rounded-end w-50 p-3">
                        <div className="col-12">
                            Iniciar Sesión
                        </div>
                        <form action="#">
                            <div className="mb-4">
                                <label htmlFor="email" className="form-label">Correo Electronico</label>
                                <input type="email" className="form-control" name="email" id="correo"></input>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input type="password" className="form-control" name="password" id="contrasena"></input>
                            </div> 
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary" onClick={iniciar}>Iniciar Sesión</button>
                            </div>
                            <div className="my-3">
                                <span>¿No tienes cuenta? <a href="registro">Registrate</a></span>  <br></br>
                            </div>
                        </form>
                        <div className="container w-100 my-5">
                            <div className="row text-center">
                                <div className="row">
                                    <div className="mt-3">
                                        <GoogleLogin
                                            clientId="569141129094-mnim4ucga5l1ga53jr0cjh3dalsqbcch.apps.googleusercontent.com"
                                            buttonText="Iniciar sesión con Google"
                                            onSuccess={respuestaGoogle}
                                            onFailure={respuestaGoogle}  
                                            cookiePolicy={'single_host_origin'}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col bg d-none d-lg-block col-md-5 col-lg-5 col-xl-6 rounded">
                        </div>
                   </div> 
                </div> 
            </div>
        </div>
    )
}

export default Login