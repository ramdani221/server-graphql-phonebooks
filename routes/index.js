var express = require('express');
var router = express.Router();
const Phonebooks = require('../models/Phonebooks')
const path = require("path")
const fs = require('fs');
const { getPhonebook, updateAvatar } = require('../services/phonebooks');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.put('/phonebooks/:id/avatar', async function (req, res, next) {
  let avatar;
  let uploadPath;


  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: 'No files were uploaded.' });
  }

  avatar = req.files.avatar;
  let fileName = Date.now() + '_' + avatar.name
  uploadPath = path.join(__dirname, '..', 'public', 'images', fileName);

  avatar.mv(uploadPath, async function (err) {
    if (err)
      return res.status(500).send(err);
    try {
      const profile = await getPhonebook(req.params.id);
      if (profile.avatar) {
        const filePath = path.join(__dirname, '..', 'public', 'images', profile.avatar);
        try { fs.unlinkSync(filePath) } catch {
          const phonebooks = await updateAvatar(req.params.id, {avatar: fileName})
          return res.status(201).json(phonebooks)
        }
      }
      const phonebooks = await updateAvatar(req.params.id, { avatar: fileName });

      res.status(201).json(phonebooks)
    } catch (err) {
      console.log(err)
      res.status(500).json(err)
    }
  });
});

module.exports = router;
