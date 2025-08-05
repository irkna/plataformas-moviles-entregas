const personas = [
    { nombre: "Ana", apellido: "Martínez", edad: 25 },
    { nombre: "Luis", apellido: "Gómez", edad: 30 },
    { nombre: "María", apellido: "Pérez", edad: 19 },
    { nombre: "Juan", apellido: "López", edad: 40 },
];

function ordenarPorApellido(lista) {
    return [...lista].sort((a, b) => a.apellido.localeCompare(b.apellido));
}

function extraerNombres(lista) {
    return lista.map(persona => persona.nombre);
}

function promedioEdad(lista) {
    const suma = lista.reduce((acc, persona) => acc + persona.edad, 0);
    return suma / lista.length;
}

function cumplirAnios(lista) {
    return lista.map(persona => ({
        ...persona,
        edad: persona.edad + 1
    }));
}

function filtrarMayoresEdad(lista) {
    return lista.filter(persona => persona.edad >= 18);
}

function encontrarPersonaMayor(lista) {
    return lista.reduce((mayor, persona) =>
        persona.edad > mayor.edad ? persona : mayor
    );
}

function asignarHeladoFavorito(lista) {
    const sabores = ["chocolate", "frutilla", "vainilla", "menta"];
    return lista.map((persona, i) => ({
        ...persona,
        heladoFavorito: sabores[i % sabores.length]
    }));
}

console.log("1. Ordenado por apellido:", ordenarPorApellido(personas));
console.log("2. Solo nombres:", extraerNombres(personas));
console.log("3. Promedio de edad:", promedioEdad(personas));
console.log("4. Cumplen años:", cumplirAnios(personas));
console.log("5. Mayores de edad:", filtrarMayoresEdad(personas));
console.log("6. Persona mayor:", encontrarPersonaMayor(personas));
console.log("7. Con helado favorito:", asignarHeladoFavorito(personas));