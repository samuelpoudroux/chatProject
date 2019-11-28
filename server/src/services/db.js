const enjoi = require('enjoi');
const joi = require('@hapi/joi');

const validate = async (jsonSchema, entityToValidate) => {
  const joiSchema = enjoi.schema(jsonSchema);
  const promise = new Promise((resolve, reject) => {
    joi.validate(entityToValidate, joiSchema, (err) => {
      if (err) {
        reject(err);
      }
      resolve();
    });
  });
  await promise;
};

const save = async (entitySchema, entityToSave, dbCollection) => {
  await validate(entitySchema, entityToSave);
  await dbCollection.insert(entityToSave);
};

const upsert = async (entitySchema, entityToSave, dbCollection, upsertCondition) => {
  await validate(entitySchema, entityToSave);
  await dbCollection.update(entityToSave, upsertCondition, { upsert: true });
};

module.exports = {
  save,
  upsert,
  validate,
};
