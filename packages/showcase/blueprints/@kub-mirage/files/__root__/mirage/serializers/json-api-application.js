import { JSONAPISerializer } from 'miragejs';
import { camelize } from '@ember/string';

export default JSONAPISerializer.extend({
  keyForModel(modelName) {
    return camelize(modelName);
  },

  keyForCollection(modelName) {
    return camelize(modelName);
  },

  keyForRelationship(relationship) {
    return camelize(relationship);
  },
});
