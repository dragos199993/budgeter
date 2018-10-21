const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const mongodb = require('mongodb')
const jwt = require('jsonwebtoken')
const  config = require('../../config.js')




router.post('/signup', async (req, res) => {
    await bcrypt.hash(req.body.password, 10,  async (error, hash) =>{
        if(error) return res.status(500).json({ error })
        else{
            const users = await loadUserCollection()
            await users.insertOne({
                email: req.body.email,
                password: hash
            }, error => {
                if(error) return res.status(500).send("There was a problem creating the user")
                users.findOne({
                    email: req.body.email
                }).then( user => {
                    let token = jwt.sign({id: user._id}, config.config.secret, {expiresIn: 86400})
                    res.status(200).json({
                        auth: true,
                        token,
                        user
                    })
                })
            })
        }
    })
})


router.post('/signin', async (req, res) => {
    const users = await loadUserCollection()
    users.findOne({
        email: req.body.email
    }).then(user => {
        bcrypt.compare(req.body.password, user.password, (err, result) => {
            if(err) return res.status(401).json({
                failed: "Unauthorized Access"
            })
            if(result) {

                const token =  jwt.sign({id: user._id}, config.config.secret, {expiresIn: 86400})

                return res.status(200).json({
                    auth: true,
                    token,
                    user
                })
            }
            return res.status(401).json({
                failed: "Unauthorized Access"
            })
        })
    }).catch(error => {
        res.status(500).json({ error })
    })
})

async function loadUserCollection() {
    const client = await mongodb.MongoClient.connect
    ('mongodb://test:test12@ds133353.mlab.com:33353/vue_mongo', {useNewUrlParser: true})
    return client.db('vue_mongo').collection('users')
}

module.exports = router