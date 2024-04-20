// import { faker } from '@faker-js/faker';
// // or, if desiring a different locale
// // import { fakerDE as faker } from '@faker-js/faker';

const {faker} = require("@faker-js/faker");

const randomName = faker.commerce.product(); // Rowan Nikolaus
const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz

console.log("🚀 ~ randomName:", {randomName, randomEmail})