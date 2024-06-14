import { faker } from '@faker-js/faker';

export const generateRandomUsername = () => {
  return faker.internet.userName();
};

export const generateRandomEmail = () => {
  return faker.internet.email();
};
