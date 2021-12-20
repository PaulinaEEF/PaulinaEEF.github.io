import React from 'react';

function Registro(){
    
    function regresar(e){
        e.preventDefault();
        window.history.back();
    }
    
    function registro(e){
        e.preventDefault();
        const email = document.getElementById('email').value;
        const user = document.getElementById('user').value;
        const pass1 = document.getElementById('contrasena1').value;
        const pass2 = document.getElementById('contrasena2').value;
        const cadena = email +"|"+user+"|"+pass1;
        var existe = false;
        if(localStorage.getItem('email')){  
            var correos = localStorage.getItem('email').split(",");
            for (var i = 0; i < correos.length; i++) {
                var usuario = correos[i].split("|");
                if(usuario[0] === email){
                    existe = true;
                }
             }
        }
        if(localStorage.getItem('gmail')){  
            var correosG = localStorage.getItem('gmail').split(",");
            for (var i = 0; i < correosG.length; i++) {
                var usuarioG = correosG[i].split("|");
                if(usuarioG[0] === email){
                    existe = true;
                }
             }
        }
        if(!existe){
            if(email && user && pass1 && pass2){
                if(pass1 === pass2){
                    window.alert("Registrado exitosamente");
                    console.log('se pudo registrar');
                    if(localStorage.getItem('email')){            
                        localStorage.setItem('email', localStorage.getItem('email') + ',' + cadena);
                    }else{
                        localStorage.setItem('email',cadena);
                    }    
                    window.history.back();
                }
            }else{
                window.alert("Llene todos los datos");
            }
        }else{
            window.alert("Usuario ya existente");
            console.log("Usuario ya registrado!!!");
        }
    }
    return(
        <div className="container container_p rounded w-50 shadow my-3 py-3">            
            <nav className="row barra py-3 navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="col-9">
                <h1 className="title">Bearnote</h1>
                </div>
            </nav>
            <div className="row" >
                <div className="col bg-white p-5 rounded-end">
                    <div className="mb-4">
                        <label htmlFor="user" className="form-label">Nombre de Usuario</label>
                        <input type="text" className="form-control" name="text" id="user"></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="form-label">Correo Electronico</label>
                        <input type="email" className="form-control" name="email" id="email"></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" name="password" id="contrasena1"></input>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Repetir Contaseña</label>
                        <input type="password" className="form-control" name="password" id="contrasena2"></input>
                    </div>
                    <div className="d-grid">
                            <button type="submit" className="btn btn-primary" id="registrarse" onClick={registro}>Registrate</button>
                    </div>
                    <div className="d-grid mt-3">
                            <button type="submit" className="btn btn-primary" id="registrarse" onClick={regresar}>Regresar</button>
                    </div>
                </div>
            </div>
        </div>
    )
    
}

export default Registro