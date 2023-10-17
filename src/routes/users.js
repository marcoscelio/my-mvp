const express = require('express');
const router = express.Router();
const { object, string, number } = require('yup');
const { getUserModel } = require('../models/user');
const { sequelize } = require('../models');
const { Sequelize } = require('sequelize');

/* ADD USER. */
router.post('/', async function (req, res, next) {
  const userSchema = object({
    username: string().required(),
    password: string().required(),
  });
  const user = req.body;
  try {
    userSchema.validateSync(user);
    const result = await getUserModel(sequelize, Sequelize).create(user);
    res.json(result.dataValues);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

/* UPDATE USER. */
router.put('/:id', async function (req, res, next) {
  const userSchema = object({
    username: string().required(),
    password: string().required(),
  });
  const user = req.body;
  try {
    if (!req?.params?.id) {
      res.status(400).json({ error: true, messages: "Missing user ID" })
    }
    userSchema.validateSync(user);
    await getUserModel(sequelize, Sequelize).update(user, {
      where: {
        id: req.params.id,
      }
    });
    res.json(user);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

/* DELETE USER. */
router.delete('/:id', async function (req, res, next) {
  try {
    if (!req?.params?.id) {
      res.status(400).json({ error: true, messages: "Missing user ID" })
    }
    const result = await getUserModel(sequelize, Sequelize).findByPk(req.params.id);
    const user = {};
    Object.assign(user, result)
    await getUserModel(sequelize, Sequelize).destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(user.dataValues);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

/* GET ALL USERS */
router.get('/', async function (req, res, next) {

  const userSchema = object({
    username: string().required(),
    password: string().required(),
  });
  const user = req.body;
  try {
    userSchema.validateSync(user);
    const result = await getUserModel(sequelize, Sequelize).findAll();
    res.json(result);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

/* GET BY ID*/
router.get('/:id', async function (req, res, next) {
  try {
    if (!req?.params?.id) {
      res.status(400).json({ error: true, messages: "Missing user ID" })
    }
    const result = await getUserModel(sequelize, Sequelize).findByPk(req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

module.exports = router;
