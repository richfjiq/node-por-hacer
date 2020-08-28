const fs = require("fs");

let listadoPorHacer = [];

const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile("./db/data.json", data, (err) => {
        if (err) throw new Error("No se pudo grabar");
    });
};

const cargarDB = () => {
    try {
        listadoPorHacer = require("../db/data.json");
    } catch (error) {
        listadoPorHacer = [];
    }
};

const crear = (descripcion) => {
    cargarDB();

    let porHacer = {
        descripcion,
        completado: false,
    };

    listadoPorHacer.push(porHacer);

    guardarDB();

    return porHacer;
};

const getListado = () => {
    listado = require("../db/data.json");
    return listado;
};

const actualizar = (descripcion, completado = true) => {
    cargarDB();
    let index = listadoPorHacer.findIndex(
        (tarea) => tarea.descripcion === descripcion
    );
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
};

const borrar = (descripcion) => {
    cargarDB();

    let newData = listadoPorHacer.filter(
        (tarea) => tarea.descripcion !== descripcion
    );

    if (listadoPorHacer.length === newData.length) {
        return false;
    } else {
        listadoPorHacer = newData;
        guardarDB();
        return true;
    }
};

module.exports = { crear, getListado, actualizar, borrar };