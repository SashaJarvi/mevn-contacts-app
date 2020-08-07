const express = require('express')
const router = express.Router()

const Record = require('../models/Record')

router.get('/', async (req, res) => {
    await Record.find((err, records) => {
        if (err) {
            res.status(500).send('Internal server error')
            return
        }

        res.json(records)
    })
})

router.get('/:id', async (req, res) => {
    await Record.findById(req.params.id, (err, record) => {
        if (err) {
            res.status(500).send('Internal server error')
            return
        }

        res.json(record)
    })
})

router.post('/', async (req, res) => {
    const record = new Record(req.body)
    await record.save((err) => {
        if (err) {
            res.status(500).send('Internal server error')
            return
        }

        res.json({ state: 'added successfully' })
    })
})

router.put('/:id/edit', async (req, res) => {
    await Record.findByIdAndUpdate(req.params.id, req.body,(err) => {
        if (err) {
            res.status(500).send('Internal server error')
            return
        }

        res.json({ state: 'updated successfully' })
    })
})

router.delete('/:id/delete', async (req, res) => {
    await Record.findByIdAndRemove(req.params.id,(err) => {
        if (err) {
            res.status(500).send('Internal server error')
            return
        }

        res.json({ state: 'deleted successfully' })
    })
})

module.exports = router
