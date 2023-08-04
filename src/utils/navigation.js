const checkIsSupported = () => {
    return Boolean(document.startViewTransition)
}

export const startViewTransition = () => {
    if(!checkIsSupported()) return;

		window.navigation.addEventListener('navigate', (event) => {
			const toUrl = new URL(event.destination.url);
			
			//si donde estamos es distinto a donde vamos (zona) lo ignoramos hacemos un return. 
			if(location.origin !== toUrl.origin) return;
			
			//si es una navegacion en el mismo dominio, intercepto el evento
			event.intercept({
				async handler(){
					console.log(toUrl);
					//cargamos el contenido de la pagina
					//recupero el contenido de la pagina agarrando el pathname que es la ruta
					const response = await fetch(toUrl.pathname);
					//lo convierto a texto
					const text = await response.text();
					//me quiero quedar solo con el contenido dentro del body
					//tengo que usar un regex para sacar el body
					//un regex es una expresion regular que me permite buscar un patron dentro de un string
					//el patron que quiero buscar es el body y quiero que me devuelva el contenido que esta dentro de los parentesis
					const body = text.match(/<body>([\s\S]*)<\/body>/i)[1];
					
					document.startViewTransition(()=>{
						document.body.innerHTML = body;
						document.documentElement.scrollTop = 0;
						
					});
				}
			})
			
		});
	}

