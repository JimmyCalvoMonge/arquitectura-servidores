/* 

Pequeños ejemplos de Unit Testing de nuestra API utilizando supertest.js *

Correr npm test para probar 

*/

const request = require('supertest');
const app = require('../app');

// Algunas pruebas para /api/employees

//Todos los empleados
describe('GET /api/employees', function() {
it('responds with json', function(done) {
    request(app)
    .get('/api/employees')
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect('Content-Length', '1574')
    .expect(201, done)
});
});

// Algunas pruebas para /api/employees/NAME

//Buscar a Bob
describe('GET /api/employees/Bob', function() {
    it('responds with json', function(done) {
        request(app)
        .get('/api/employees/Bob')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect([{"name":"Bob",
        "age":42,
        "phone":{"personal":"555-123-123","work":"555-456-456","ext":"7673"},
        "privileges":"admin",
        "favorites":{"artist":"Miro","food":"meringue"},
        "finished":[11,25],"badges":["green"],
        "points":[{"points":85,"bonus":20},{"points":64,"bonus":12}]
        }])
        .expect(201, done)
    });
});

// Nombre no encontrado 
describe('GET /api/employees/Jimmy', function() {
    it('responds with json', function(done) {
        request(app)
        .get('/api/employees/Jimmy')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect({ "code": 'not_found' })
        .expect(404, done)
    });
});

// Pruebas para el post request de agregar un empleado.


// Con formato correcto

describe('POST /api/employees', function() {
    it('responds with json', function(done) {
        request(app)
        .post('/api/employees')
        .set('Content-type', 'application/json')
        .send({"name":"Bob",
        "age":42,
        "phone":{"personal":"555-123-123","work":"555-456-456","ext":"7673"},
        "privileges":"admin",
        "favorites":{"artist":"Miro","food":"meringue"},
        "finished":[11,25],"badges":["green"],
        "points":[{"points":85,"bonus":20},{"points":64,"bonus":12}]
        })
        .expect(201,done);
    });
});

// Con formato incorrecto

describe('POST /api/employees', function() {
    it('responds with json', function(done) {
        request(app)
        .post('/api/employees')
        .set('Content-type', 'application/json')
        .send({"NOMBRE":"Jimmy",
        "age":42,
        "phone":{"personal":"555-123-123","work":"555-456-456","ext":"7673"},
        "privileges":"admin",
        "favorites":{"artist":"Miro","food":"meringue"},
        "finished":[11,25],"badges":["green"],
        "points":[{"points":85,"bonus":20},{"points":64,"bonus":12}]
        })
        .expect(501,done);
    });
});