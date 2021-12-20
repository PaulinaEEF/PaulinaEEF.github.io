import './assets/CSS/indexStyle.css'
import { useHistory } from 'react-router-dom'
function Principal(){
    let history = useHistory();
    var perfil; 

    function append(apunte, hoy, tags, likes, dislikes, subir, correo, usuario, div, idNum  ){
        if(apunte && tags){
            const contenedor = document.getElementById(div);
            const publicacion = document.createElement('div');
            var carta = document.createElement('div');
            carta.className = "card";
            var cuerpoCarta = document.createElement('div');
            cuerpoCarta.className = "card-body";
            var textoCarta = document.createElement('p');
            textoCarta.className = "card-text";
            textoCarta.innerHTML = apunte;
            cuerpoCarta.appendChild(textoCarta);
            carta.appendChild(cuerpoCarta);
            publicacion.className = "container container_p rounded w-50 shadow my-3 py-3 contenerPublicacion";
            var us = document.createElement('label');
            var fa = document.createElement('label');
            fa.innerHTML = hoy;
            fa.className = "lbl d-block";
            us.innerHTML = usuario;
            us.className = "lbl";
            publicacion.appendChild(us);
            publicacion.appendChild(fa);
            publicacion.appendChild(carta);
            var tagsN = tags.split(";");
            for (var i = 0; i < tagsN.length; i++) {
                const tag = document.createElement('button');
                tag.className = "btn p-0 my-3";
                var tag_1 = document.createElement('span');
                tag_1.className = "tag_1";
                tag_1.innerHTML = tagsN[i];
                tag.appendChild(tag_1);
                tag.onclick = function(){buscarEtiqueta(tag);};
                publicacion.appendChild(tag);
            }
            var like = document.createElement('button');
            like.className = "btn_r";
            like.innerHTML = likes;
            like.onclick = function() {btn_Reaccion(like);};
            var dislike = document.createElement('button');
            dislike.className = "btn_r";
            dislike.innerHTML = dislikes;
            dislike.onclick = function() {btn_Reaccion(dislike);};
            var img_like = document.createElement('i');
            var img_dislike = document.createElement('i');
            img_like.className = "fas fa-thumbs-up";
            img_dislike.className = "fas fa-thumbs-down"; 
            if(subir){
                if(localStorage.getItem(correo)){      
                    const idBTN = localStorage.getItem(correo).split(",");
                    dislike.id = idBTN.length + "d";
                    like.id = idBTN.length + "l";
                }
            }else{
                dislike.id = idNum + "d";
                like.id = idNum + "l";
            }
            like.appendChild(img_like)
            dislike.appendChild(img_dislike);
            var reaccion = document.createElement('div');
            reaccion.className = "reacciones";
            reaccion.appendChild(like);
            reaccion.appendChild(dislike);

            const usuarioAct = localStorage.getItem("usuarioActual").split("|");
            if(localStorage.getItem("reacciones#"+ usuarioAct[0])){
                const listaReaccion = localStorage.getItem("reacciones#"+ usuarioAct[0]).split(",");
                for( var m = 0; m < listaReaccion.length; m++ ){
                    var perfilReaccion = listaReaccion[m].split("|");
                    if(perfilReaccion[0] === perfil){
                        const reaccionesR = perfilReaccion[1].split(";");
                        for( var n = 0; n < reaccionesR.length; n++ ){
                            var reaccionR = "";
                            if(reaccionesR[n].includes("d")){
                                reaccionR = reaccionesR[n].split("d")[0];
                            }
                            else{
                                reaccionR = reaccionesR[n].split("l")[0];
                            }
                            if(reaccionR === idNum){
                                if(reaccionesR[n].includes("d"))
                                    dislike.style.background = "rgb(194, 30, 30)";
                                else
                                    like.style.background = "rgb(18, 20, 128)";
                            }
                        }
                        if(idNum)
                        m = listaReaccion.length;
                    }
                }
            }

            publicacion.appendChild(reaccion);
            contenedor.appendChild(publicacion);
            if(subir){
                if(localStorage.getItem(correo)){      
                    const lista = localStorage.getItem(correo).split(",");
                    var cadena = (lista.length+1) + "|" + apunte + "|" + hoy + "|" + tags + "|" + 0 + "|" + 0;     
                    localStorage.setItem(correo, localStorage.getItem(correo) + ',' + cadena);
                }else{
                    var cadena = 1 + "|" + apunte + "|" + hoy + "|" + tags + "|" + 0 + "|" + 0;     
                    localStorage.setItem(correo,cadena);
                }    
                const ap = document.getElementById('apunte');
                ap.value = "";
                const tg = document.getElementById('tags');
                tg.value = "";
            }
        }else{
            window.alert("Llene cada uno de los datos");
        }
    }

    window.onload = function(e){
        e.preventDefault();
        var cell = document.getElementById("miPublicacion");
        if ( cell.hasChildNodes() ){
            while ( cell.childNodes.length >= 1 ){
                cell.removeChild( cell.firstChild );
            }
        }
        const usAct = localStorage.getItem("usuarioActual").split("|");
        perfil = usAct[0];
        if(localStorage.getItem(usAct[0])){
            const apuntes = localStorage.getItem(usAct[0]).split(",");
            for(var i = 0; i < apuntes.length; i++ ){
                var elementos = apuntes[i].split("|");  
                append(elementos[1],elementos[2],elementos[3],elementos[4],elementos[5], false, usAct[0], usAct[1],'miPublicacion', i);
            }
        }
        const contenedorMayor = document.getElementById("contenedor");
        var publicacionE = document.getElementById("publicacionEtiqueta");
        contenedorMayor.removeChild(publicacionE);
        var publicacionEtiqueta = document.createElement("div");
        publicacionEtiqueta.id="publicacionEtiqueta";
        contenedorMayor.appendChild(publicacionEtiqueta);
        const publicacion = document.getElementById("publicacion");
        publicacion.style.display = "block";
        const misPublicaciones = document.getElementById("miPublicacion");
        misPublicaciones.style.display = "block";
        const otraPublcacion = document.getElementById("otraPublicacion");
        otraPublcacion.style.display = "none";
        const otroUsuario = document.getElementById("otroUsuario");
        otroUsuario.style.display = "none";
        const tagses = document.getElementById("tagsForm");
        if(tagses)
            tagses.style.display = "none";
    }

    function subir(e){
        e.preventDefault();
        const apunte = document.getElementById('apunte').value;
        const tags = document.getElementById('tags').value;
        const tiempoTranscurrido = Date.now();
        const hoy = new Date(tiempoTranscurrido);
        const usAct = localStorage.getItem("usuarioActual").split("|");
        append(apunte, hoy.toDateString(), tags, 0, 0, true, usAct[0], usAct[1],'miPublicacion', 0);
    }
    
    function cerrarSesion(e){
        e.preventDefault();
        history.push("");
    }

    
    function btn_Reaccion(e){
        const id = e.id;
        var nPublicacion = 0;
        var imagen = document.createElement("i");
        if( id.includes("d") ){
            nPublicacion = id.split("d")[0];
            imagen.className = "fas fa-thumbs-down";
        }else{
            nPublicacion = id.split("l")[0];
            imagen.className = "fas fa-thumbs-up";
        }
        const user = localStorage.getItem("usuarioActual").split("|");
        const correo = user[0];
        if(!perfil)
            perfil = correo;
        const cadena = perfil + "|" + id;
        var borrarD = false;
        var borrarL = false;
        var borrarD1 = false;
        var borrarL1 = false;
        if( localStorage.getItem("reacciones#"+correo) ){
            const listaReacciones = localStorage.getItem("reacciones#"+correo).split(",");
            var listaModificada = "";
            var existente = false;
            for( var i = 0; i < listaReacciones.length; i++){
                var reaccionesAcum = ""; 
                const elementosReaccion = listaReacciones[i].split("|");
                var cambiado = false;
                if( elementosReaccion[0] === perfil ){
                    existente = true;
                    const reaccion_a_usuario = elementosReaccion[1].split(";");
                    var encontrado = false;
                    for( var j = 0; j < reaccion_a_usuario.length; j++){
                        if( id === reaccion_a_usuario[j]){
                            if(id.includes("d"))
                                borrarD = true;
                            else
                                borrarL = true;
                            reaccion_a_usuario[j] = "";
                            encontrado = true;
                        }else{
                            var idReaccion = "";
                            if(reaccion_a_usuario[j].includes("d")){
                                idReaccion = reaccion_a_usuario[j].split("d");
                            }else{
                                idReaccion = reaccion_a_usuario[j].split("l");
                            }
                            if( idReaccion[0] === nPublicacion[0]){
                                if(reaccion_a_usuario[j].includes("d")){
                                    reaccion_a_usuario[j] = idReaccion[0]+"l";
                                    borrarD1 = true;
                                }else{
                                    reaccion_a_usuario[j] = idReaccion[0]+"d";
                                    borrarL1 = true;
                                }
                                cambiado = true;
                            }
                        }
                        reaccionesAcum += reaccion_a_usuario[j];
                    }
                    var reaccionesAcum2 = "";
                    for( var j = 0; j < reaccionesAcum.length; j++){
                        reaccionesAcum2 += reaccionesAcum[j];
                        if(reaccionesAcum[j] === "d" || reaccionesAcum[j] === "l"){
                            if(j < reaccionesAcum.length -1)
                                reaccionesAcum2 += ";"
                        }
                    }
                    if(!encontrado && !cambiado){
                        reaccionesAcum2 += ";" + id;
                    }
                    var nuevaReaccion = perfil + "|" + reaccionesAcum2;
                    if( reaccionesAcum2.length < 1)
                        nuevaReaccion = "";
                    listaModificada += nuevaReaccion;
                    listaReacciones[i] = listaModificada;
                }
            }
            if(!existente){
                localStorage.setItem("reacciones#"+correo,localStorage.getItem("reacciones#"+correo)+","+cadena);
            }else if(localStorage.getItem("reacciones#"+correo)){
                const tamano = localStorage.getItem("reacciones#"+correo).split(",");
                if(tamano.length < 1){
                    localStorage.removeItem("reacciones#"+correo);
                }
                else
                    localStorage.setItem("reacciones#"+correo,listaReacciones);
            }
        }else{
            localStorage.setItem("reacciones#"+correo,cadena);
        }
        const arreglar = localStorage.getItem("reacciones#"+correo).split(",");
        var arreglado = "";
        for(var m = 0; m < arreglar.length; m++){
            if(arreglar[m]){
                arreglado += arreglar[m];
                if( m < arreglar.length - 1 )
                    arreglado += ",";
            }
        }
        const publicacionesPerfil = localStorage.getItem(perfil).split(",");
        var acumPublic = "";
        var like = 0;
        var disLike = 0;
        for( var i = 0; i < publicacionesPerfil.length; i++ ){
            if( i === nPublicacion){
                const publicacionPerfil = publicacionesPerfil[nPublicacion];
                const elementosPublicacionPerfil = publicacionPerfil.split("|");
                disLike = elementosPublicacionPerfil[5];
                like = elementosPublicacionPerfil[4];
                if(id.includes("d"))
                    disLike++;
                else
                    like++;
                if(borrarL)
                    like-=2;
                if(borrarD)
                    disLike-=2;
                if(borrarL1)
                    like--;
                if(borrarD1)
                    disLike--;
                publicacionesPerfil[i] = elementosPublicacionPerfil[0] + "|" + elementosPublicacionPerfil[1] + "|"+elementosPublicacionPerfil[2]+"|"+elementosPublicacionPerfil[3]+"|"+like+"|"+disLike;
            }
            acumPublic += publicacionesPerfil[i];
            if(i < publicacionesPerfil.length - 1){
                acumPublic += ",";
            }
        }
        var boton = document.createElement("button");
        var otroBoton = "";
        var imagenOtra = document.createElement("i");
        boton = e;
        if(boton.id.includes("l")){
            boton.innerText = like;
            otroBoton = boton.parentNode.lastChild;
            imagenOtra.className = "fas fa-thumbs-down";
            boton.style.background = "rgb(18, 20, 128)";
        }else{
            boton.innerText = disLike;
            boton.style.background = "rgb(194, 30, 30)";
            otroBoton = boton.parentNode.firstChild;
            imagenOtra.className = "fas fa-thumbs-up";
        }
        otroBoton.style.background = "rgb(77, 111, 150)";
        if(otroBoton.id.includes("d"))
            otroBoton.innerText = disLike;
        else
            otroBoton.innerText = like;
        if(borrarD || borrarL)
            boton.style.background = "rgb(77, 111, 150)";
        localStorage.setItem(perfil,acumPublic);
        localStorage.setItem("reacciones#"+correo,arreglado);
        boton.appendChild(imagen);
        otroBoton.appendChild(imagenOtra);
    }

    function etiquetas(e){
        if(e.value !== ""){
            var contenedorMayor = document.getElementById("contenedor");
            const useAct = localStorage.getItem("usuarioActual").split("|");
            perfil = useAct[0];
            var titulo = document.createElement("h2");
            titulo.innerText = "Mis Etiquetas";
            titulo.className = "title text-center";
            var contenedor = document.createElement("div");
            contenedor.appendChild(titulo);
            var tagses = document.getElementById("tagsForm");
            if(tagses)
                contenedorMayor.removeChild(tagses);

            var otra = document.getElementById("otraPublicacion");
            contenedorMayor.removeChild(otra);
            var otraP = document.createElement("div");
            otraP.id="otraPublicacion";
            contenedorMayor.appendChild(otraP);

            var otra = document.getElementById("otroUsuario");
            contenedorMayor.removeChild(otra);
            var otraP = document.createElement("div");
            otraP.id="otroUsuario";
            contenedorMayor.appendChild(otraP);
            var publicacionE = document.getElementById("publicacionEtiqueta");
            contenedorMayor.removeChild(publicacionE);
            var publicacionEtiqueta = document.createElement("div");
            publicacionEtiqueta.id="publicacionEtiqueta";
            contenedorMayor.appendChild(publicacionEtiqueta);

            var todoTag = document.createElement("div");
            todoTag.id = "tagsForm";
            contenedor.className = "container container_p rounded w-50 shadow my-3 py-3 contenerPublicacion";
            const publicacion = document.getElementById("publicacion");
            publicacion.style.display = "none";
            const misPublicaciones = document.getElementById("miPublicacion");
            misPublicaciones.style.display = "none";

            var tagsContainer = document.createElement("div");
            tagsContainer.className = "container";

            if(localStorage.getItem(perfil)){
                const estudianteActual = localStorage.getItem(perfil).split(",");
                var lista=[];
                for(var j = 0; j < estudianteActual.length; j++){
                    var publicacionEstudiante = estudianteActual[j].split("|");
                    var tags = publicacionEstudiante[3].split(";");
                    var pasa = true;
                    for (var i = 0; i < tags.length; i++) {
                        pasa = true;
                        for(var k = 0; k < lista.length; k++ ){
                            if(tags[i] === lista[k])
                                pasa = false;
                        }
                        if(pasa){
                            lista.unshift(tags[i]);
                            var tag_1 = document.createElement('span');
                            const tag_btn = document.createElement('button');
                            
                            tag_btn.onclick = function(){buscarEtiqueta(tag_btn);};
                            
                            tag_btn.className = "btn p-0 my-3";
                            tag_1.className = "tag_1";
                            tag_1.innerHTML = tags[i];
                            tag_btn.appendChild(tag_1);
                            tagsContainer.appendChild(tag_btn);
                        }
                        contenedor.appendChild(tagsContainer);
                    }
                }
                todoTag.appendChild(contenedor);
                contenedorMayor.appendChild(todoTag);
            }
        }else{
            
        }
    }

    function buscarEtiqueta(e){
        const contenedorMayor = document.getElementById("contenedor");
        var tagses = document.getElementById("tagsForm");
        if(tagses)
            contenedorMayor.removeChild(tagses);
        const tagForm = document.createElement("div");
        tagForm.id = "tagsForm";
        contenedorMayor.appendChild(tagForm);
        const publicacion = document.getElementById("publicacion");
        publicacion.style.display = "none";
        const misPublicaciones = document.getElementById("miPublicacion");
        misPublicaciones.style.display = "none";
        var publicacionE = document.getElementById("publicacionEtiqueta");
        contenedorMayor.removeChild(publicacionE);
        var publicacionEtiqueta = document.createElement("div");
        publicacionEtiqueta.id="publicacionEtiqueta";
        contenedorMayor.appendChild(publicacionEtiqueta);

        var otra = document.getElementById("otroUsuario");
        contenedorMayor.removeChild(otra);
        var otraP = document.createElement("div");
        otraP.id="otroUsuario";
        contenedorMayor.appendChild(otraP);
        
        var boton = document.createElement("button");
        boton = e;
        if(localStorage.getItem("gmail")){
            const gmails = localStorage.getItem("gmail").split(",");
            var usuario = "";
            for(var i = 0; i < gmails.length; i++ ){
                const user = gmails[i].split("|");
                if(perfil === user[0])
                    usuario = user[1];
            }
        }
        if(localStorage.getItem("email")){
            const emails = localStorage.getItem("email").split(",");
            for(var i = 0; i < emails.length; i++ ){
                const user = emails[i].split("|");
                if(perfil === user[0])
                    usuario = user[1];
            }
        }
        if(localStorage.getItem(perfil)){
            const estudiantePublicaciones = localStorage.getItem(perfil).split(",");
            for(var i = 0; i < estudiantePublicaciones.length; i++ ){
                const elementos = estudiantePublicaciones[i].split("|");
                if(elementos[3].includes(boton.firstChild.innerHTML))
                    append(elementos[1],elementos[2],elementos[3],elementos[4],elementos[5],false,perfil,usuario,"publicacionEtiqueta",i);
            }
        }
    }

    return(
        <div id="contenedor">
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <button className="btn navbar-brand" onClick={window.onload}>Bearnote</button>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <button className="btn nav-link active" aria-current="page" onClick={window.onload}>Inicio</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn nav-link" onClick ={window.onload}>Mis Apuntes</button>
                                </li>
                                <li className="nav-item">
                                    <button className="btn nav-link" onClick = {etiquetas} >Etiquetas</button>
                                </li>
                            </ul>
                            <form className="d-flex">
                                <button className="btn nav-link" href="#" tabIndex="-1" onClick={cerrarSesion}>Cerrar Sesión</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="container container_p rounded w-50 shadow my-3 py-3 " id="publicacion">
                <textarea className="form-control" rows="1" placeholder="En que estoy pensando..." id="apunte"></textarea>
                <input type="text" placeholder="Etiquetas:" className="form-control my-2" id="tags"></input>
                <button className="btn btn-primary bg-blue" onClick={subir}><i className="fas fa-plus-circle"></i>Subir</button>
            </div>
            <div id="miPublicacion"></div>
            <div id="otraPublicacion"></div>
            <div id="otroUsuario"></div>
            <div id="tagsForm"></div>
            <div id="publicacionEtiqueta"></div>
        </div>
    );
}

export default Principal