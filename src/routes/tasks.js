const express = require('express');
const router = express.Router();
const { object, string, number } = require('yup');
const { gettaskModel } = require('../models/task');
const { sequelize } = require('../models');
const { Sequelize } = require('sequelize');
const { getTaskModel } = require('../models/task');
const { getUserModel } = require('../models/user');

const addTaskSchema = object({
  description: string().required(),
  user_id: string().required("Missing account ID"),
});

const updateTaskSchema = object({
  description: string().required(),
});

/* ADD task. */
router.post('/', async function (req, res, next) {
  const task = req.body;
  try {
    addTaskSchema.validateSync(task);
    const user = await getUserModel(sequelize, Sequelize).findOne(task, {
      where: {
        id: req.params.id,
      }
    });
    if (!user) {
      res.status(400).json({ error: true, messages: "Unexisting account" })
      return;
    }
    const result = await getTaskModel(sequelize, Sequelize).create(task);
    res.json(result.dataValues);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

/* UPDATE task. */
router.put('/:id', async function (req, res, next) {
  const task = req.body;
  try {
    if (!req?.params?.id) {
      res.status(400).json({ error: true, messages: "Missing task ID" })
    }
    updateTaskSchema.validateSync(task);
    await getTaskModel(sequelize, Sequelize).update(task, {
      where: {
        id: req.params.id,
      }
    });
    const result = await getTaskModel(sequelize, Sequelize).findByPk(req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

/* DELETE task. */
router.delete('/:id', async function (req, res, next) {
  try {
    if (!req?.params?.id) {
      res.status(400).json({ error: true, messages: "Missing task ID" })
    }
    const result = await getTaskModel(sequelize, Sequelize).findByPk(req.params.id);
    const task = {};
    Object.assign(task, result)
    await gettaskModel(sequelize, Sequelize).destroy({
      where: {
        id: req.params.id,
      }
    });
    res.json(task.dataValues);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

/* GET BY ID*/
router.get('/:id', async function (req, res, next) {
  try {
    if (!req?.params?.id) {
      res.status(400).json({ error: true, messages: "Missing task ID" })
    }
    const result = await getTaskModel(sequelize, Sequelize).findByPk(req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error)
    res.status(400).json({ error: true, messages: error.errors })
  }
});

module.exports = router;
