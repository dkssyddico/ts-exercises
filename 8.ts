/*

Intro:

    Project grew and we ended up in a situation with
    some users starting to have more influence.
    Therefore, we decided to create a new person type
    called PowerUser which is supposed to combine
    everything User and Admin have.

Exercise:

    Define type PowerUser which should have all fields
    from both User and Admin (except for type),
    and also have type 'powerUser' without duplicating
    all the fields in the code.

*/

/* 해설
- 왜 타입에러가 발생했을까?
    
    type property를 제외한 User와 Admin의 property를 모두 가진 PowerUser라는 새로운 타입이 필요했다. 

- 어떻게 해결할 수 있었을까? 

    1. 단순하게 PowerUser interface에 
      {
        type: 'powerUser'.
        name: string;
        age: number;
        occupation: string;
        role: string;
      }
    로 지정해주는 방법이 있다. 
    
    2. 공식힌트에서는 Utility type을 이용해보라고 권장한다. Omit을 이용해 User와 Admin에 있는 type을 제거해주고, 
    인터섹션(&)을 이용해 PowerUser의 type property의 타입을 정해준다. 

 */

interface User {
  type: 'user';
  name: string;
  age: number;
  occupation: string;
}

interface Admin {
  type: 'admin';
  name: string;
  age: number;
  role: string;
}

type PowerUser = Omit<User, 'type'> &
  Omit<Admin, 'type'> & {
    type: 'powerUser';
  };

export type Person = User | Admin | PowerUser;

export const persons: Person[] = [
  {
    type: 'user',
    name: 'Max Mustermann',
    age: 25,
    occupation: 'Chimney sweep',
  },
  { type: 'admin', name: 'Jane Doe', age: 32, role: 'Administrator' },
  { type: 'user', name: 'Kate Müller', age: 23, occupation: 'Astronaut' },
  { type: 'admin', name: 'Bruce Willis', age: 64, role: 'World saver' },
  {
    type: 'powerUser',
    name: 'Nikki Stone',
    age: 45,
    role: 'Moderator',
    occupation: 'Cat groomer',
  },
];

function isAdmin(person: Person): person is Admin {
  return person.type === 'admin';
}

function isUser(person: Person): person is User {
  return person.type === 'user';
}

function isPowerUser(person: Person): person is PowerUser {
  return person.type === 'powerUser';
}

export function logPerson(person: Person) {
  let additionalInformation: string = '';
  if (isAdmin(person)) {
    additionalInformation = person.role;
  }
  if (isUser(person)) {
    additionalInformation = person.occupation;
  }
  if (isPowerUser(person)) {
    additionalInformation = `${person.role}, ${person.occupation}`;
  }
  console.log(`${person.name}, ${person.age}, ${additionalInformation}`);
}

console.log('Admins:');
persons.filter(isAdmin).forEach(logPerson);

console.log();

console.log('Users:');
persons.filter(isUser).forEach(logPerson);

console.log();

console.log('Power users:');
persons.filter(isPowerUser).forEach(logPerson);

// In case if you are stuck:
// https://www.typescriptlang.org/docs/handbook/utility-types.html
