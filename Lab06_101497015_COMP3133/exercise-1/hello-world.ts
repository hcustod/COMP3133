let firstName: string = "Henrique";
let lastName: string = "Custodio";

let greet = (first: string, last: string): void => {
    console.log(`Hello ${first} ${last}`);
};

greet(firstName, lastName);
