const express = require('express')
const router = express.Router()

const User = require('./Schemes/User')

const crypto = require("crypto")


/////// Работа с пользователями ///////

// Вход
router.post('/login', (req, res) => {
  try {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {

          if (req.body.password === user.password) {
            res.send({status: 200, user: user});
          } else {
            res.send({status: 400, message: 'Неверный логин или пароль'});
          }

        } else {
          res.send({status: 400, message: 'Неверный логин или пароль'});
        }
      });

  } catch (error) {
    res.send(error);
  }

});

// Получение пользователя по token
router.post('/getUser', (req, res) => {
  try {
    User.findOne({token: req.body.token})
      .then(user => {
        if (user) {
          res.send({status: 200, user});
        } else {
          res.send({status: 400, message: req.body.token});
        }
      });

  } catch (error) {
    res.send({ status: 500 });
  }

});


// Добавление пользователя
router.post('/regUser', (req, res) => {
  
  User.findOne({email: req.body.email}).then(user => {
    if (!user) {
      try {
        User.create(req.body)
          .then((user) => {
            
            function cryptor(value) {
              let sha256 = crypto.createHash("sha256")
              sha256.update(value + '', "utf8")
    
              return sha256.digest("base64")
            }
    
            let token = cryptor(user._id)
    
            User.findByIdAndUpdate({_id: user.id}, {token}).then()
    
            user.token = token
            
            res.send(user)
          });
      } catch (err) {
        res.send(err);
      }
    } else {
      res.send({ status: 400 })
    }
  })
  
  
  
});

// Изменение точек на карте пользователя
router.post('/setPoints', async (req, res) => {
  try {
    let user = await User.findOne({ token: req.body.token }).then()

    user.points = req.body.points
    User.findByIdAndUpdate({ _id: user._id }, user)
    .then(() => {
      User.findOne({ token: req.body.token })
        .then(user => {
          res.send(user);
        });
    });
  } catch (err) {
    res.send(err)
  }
  
});




module.exports = router