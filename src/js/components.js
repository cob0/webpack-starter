import '../css/components.css';

export const greetings = (name) => {
    console.log('Creando etiqueta h1, en el HTML.');

    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${name}.`;
    
    document.body.append(h1);
}