import dayjs from 'dayjs';
import { Factory, trait } from 'miragejs';
import { faker } from '@faker-js/faker';

export default Factory.extend({
  aud: 'https://kub.org',

  email() {
    return faker.internet.email();
  },

  exp() {
    return dayjs().add(1, 'hour').unix();
  },

  iat() {
    return dayjs(this.exp).subtract(1, 'hour').unix();
  },

  iss() {
    return 'https://kub.org';
  },

  given_name() {
    return faker.person.firstName();
  },

  family_name() {
    return faker.person.lastName();
  },

  name() {
    return `${this.given_name} ${this.family_name}`;
  },

  roles() {
    return [];
  },

  sub() {
    return faker.internet.username({
      firstName: this.given_name,
      lastName: this.family_name,
    });
  },

  token_type: 'Bearer',

  user_type() {
    return '<unknown>';
  },

  agencyToken: trait({
    user_type: 'agency',
    roles() {
      return ['AgencyUsers'];
    },
  }),

  customerToken: trait({
    user_type: 'customer',
    roles() {
      return ['Customers'];
    },
  }),

  employeeToken: trait({
    user_type: 'employee',
    email() {
      return `${this.given_name}.${this.family_name}@kub.org`.toLowerCase();
    },
    sub() {
      return (
        this.given_name[0] +
        this.family_name.slice(0, 2) +
        '0' +
        faker.string.numeric(4)
      ).toLowerCase();
    },
    roles() {
      return ['Employees'];
    },
  }),
});
