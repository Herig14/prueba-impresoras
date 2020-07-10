const express = require('express');
const app = express();
const Impresora = require('../models/impresora');
const _ = require('underscore')
    //const usuario = require('../models/usuario');

app.get('/impresora', (req, res) => {
    let id = req.params.id;
    Impresora.find() //filtro de busqueda
        .exec((err, impresora) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (impresora.length === 0) {
                res.json({
                    ok: false,
                    err: {
                        message: "No hay impresoras"
                    }
                })
            } else {
                res.json({
                    ok: true,
                    impresora
                })
            }


        })
});

app.get('/impresora/:id', (req, res) => {
    let id = req.params.id;
    Impresora.find({ _id: id }) //filtro de busqueda
        .exec((err, impresora) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if (impresora.length === 0) {
                res.json({
                    ok: false,
                    err: {
                        message: "Impresora no encontrada"
                    }
                })
            } else {
                res.json({
                    ok: true,
                    impresora
                })
            }


        })
});

app.post('/impresora', (req, res) => {
    let body = req.body
    let impresora = new Impresora({
        marca: body.marca,
        modelo: body.modelo,
        serie: body.serie,
        color: body.color,
        ip: body.ip,
        contador: body.contador,
        precio: body.precio,
    })
    impresora.save((err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            impresora: impresoraDB
        })
    })
})

app.put('/impresora/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['modelo', 'color', 'ip', 'precio'])
    Impresora.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, impresoradb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (!impresoradb) {
            res.json({
                ok: false,
                err: {
                    message: "Impresora no encontrada"
                }
            })
        } else {
            res.json({
                ok: true,
                impresora: impresoradb
            })
        }
    })
})

app.delete('/impresora/:id', (req, res) => {
    let id = req.params.id;
    //Usuario.findByIdAndDelete(id, (err, usuarioEliminado) => {
    Impresora.deleteOne({ _id: id }, { new: true, runValidators: true, context: 'query' }, (err, impresoraDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        if (impresoraDB.deletedCount == 0) {
            res.json({
                ok: false,
                err: {
                    message: "Impresora no encontrada"
                }
            })
        } else {
            res.json({
                ok: true,
                message: "Impresora eliminada"
            })
        }
    })
});

module.exports = app