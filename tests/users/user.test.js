import request from 'supertest'
import app from '../../src/app.js'
import { faker } from '@faker-js/faker'
import User from '../../src/models/User.js'
import { Op } from 'sequelize'
import {getAuthToken, setupTestUser} from '../setup.js'
let authToken
const authenticatedRequest = (method, url) => {
    return request(app)[method](url).set('Authorization', `Bearer ${authToken}`);
};
beforeAll(async () => {
    await User.destroy({
        where: {
            [Op.or]: [
                { firstname: { [Op.like]: '%teste%' } },
                { surname: { [Op.like]: '%teste%' } }
            ]
        }
    });
    const testUser = await setupTestUser();
    authToken = await getAuthToken(testUser.email, testUser.password)

    
    const userInDatabase = await User.findOne({ where: { email: testUser.email } })
    createdUserId = userInDatabase.id;
    
});

test('List all users', async () => {
    const res = await request(app).get('/v1/user/search');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('data')
})
test('Should list a user by an existing ID', async () => {
    const res = await authenticatedRequest('get', `/v1/user/${createdUserId}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id');
    expect(res.body).toHaveProperty('firstname');
    expect(res.body).toHaveProperty('surname');
    expect(res.body).toHaveProperty('email');
    expect(res.body).not.toHaveProperty('password');

})

test('Should fail when listing a user with a non-existent ID', async () => {
    const notExists = createdUserId + 909;
    const res = await authenticatedRequest('get', `/v1/user/${notExists}`)
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message')
    expect(res.body.message).toContain('not found')
})
test('Should fail when listing a user with a NaN ID', async () => {
    const res = await authenticatedRequest('get', '/v1/user/abc')
    expect(res.status).toBe(400);
})
test('Should create a user', async () => {
    const randomUser = {
        firstname: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        password: '123456789',
        confirmpassword: '123456789'
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('firstname')
    expect(res.body).toHaveProperty('surname')
    expect(res.body).toHaveProperty('email')
})
test('Should fail when creating a user with an invalid email', async () => {
    const randomUser = {
        firstname: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: 'teste',
        password: '123456789',
        confirmpassword: '123456789'
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('invalid email')
})
test('Should fail when creating a user with an insecure password', async () => {
    const randomUser = {
        firstname: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        password: '12',
        confirmpassword: '12'
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('Invalid password')
})
test('Should fail when passwords don\'t match', async () => {
    const randomUser = {
        firstname: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),
        password: '12',
        confirmpassword: '21'
    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('do not match')
})
test('Should fail when creating a user without password', async () => {
    const randomUser = {
        firstname: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email(),

    }
    const res = await request(app).post('/v1/user').send(randomUser)
    expect(res.status).toBe(400);
    expect(res.body.message).toContain('required')
})

test('Should fail when creating a user with an existing email', async () => {
    const res = await request(app).post('/v1/user').send({
        firstname: 'Garapaxxxxasdasd',
        surname: 'Da silvaxxxa',
        email: 'test@test.com',
        password: '123456789',
        confirmpassword: '123456789'
    })
    expect(res.status).toBe(409);
})
test('Should update username and return 204', async () => {

    const res = await authenticatedRequest('put', `/v1/user/${createdUserId}`).send({
        firstname: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email()
    })
    expect(res.status).toBe(204)
})
test('Should fail when trying to update an invalid user', async () => {
    const notExists = createdUserId + 9090;
    const res = await authenticatedRequest('put', `/v1/user/${notExists}`).send({
        firstname: faker.person.firstName(),
        surname: faker.person.lastName(),
        email: faker.internet.email()
    })
    expect(res.status).toBe(404);
})
test('Should delete a user', async () => {
    const uniqueEmail = faker.internet.email()
    const createUser = await request(app).post('/v1/user').send({
        firstname: 'Delete',
        surname: 'User',
        email: uniqueEmail,
        password: '123456789',
        confirmpassword: '123456789'
    })
    expect(createUser.status).toBe(201);
    const tempId = createUser.body.id;
    const userToken = await getAuthToken(uniqueEmail, '123456789')
    const res = await request(app).
    delete(`/v1/user/${tempId}`)
    .set('Authorization',`Bearer ${userToken}`)
    expect(res.status).toBe(204)
    const checkDeletedUserNotExists = await authenticatedRequest('get', `/v1/user/${tempId}`)
    expect(checkDeletedUserNotExists.status).toBe(404)
})
test('Should fail when deleting a non-existent user', async () => {
    const id = 3023223;
    const res = await authenticatedRequest('delete', `/v1/user/${id}`)
    expect(res.status).toBe(404)
    expect(res.body.message).toContain('not found')
})
describe('CRUD FLOW - User',()=>{
    let tempUserId;
    const tempEmail = faker.internet.email()
    test('Create -> Read -> Update -> Delete',async()=>{
        const createRes = await request(app).post('/v1/user').send({
            firstname:"Garapa",
            surname:"Test",
            email:tempEmail,
            password:"123123123",
            confirmpassword:"123123123"
        });
        const createResToken = await getAuthToken(tempEmail,'123123123')
        expect(createRes.status).toBe(201);
        tempUserId = createRes.body.id;
        // Read
        const readRes = await request(app).get(`/v1/user/${tempUserId}`)
        expect(readRes.status).toBe(200);
        expect(readRes.body.firstname).toBe("Garapa")
        expect(readRes.body.surname).toBe("Test")
        //update
        const updateRes = await request(app).put(`/v1/user/${tempUserId}`)
        .set('Authorization',`Bearer ${createResToken}`)
        .send({firstname:'updated'});
        
        expect(updateRes.status).toBe(204)
        const verify = await request(app).get(`/v1/user/${tempUserId}`)
        expect(verify.body.firstname).toBe('updated')
        //delete
        const deleteRest = await request(app)
        .delete(`/v1/user/${tempUserId}`)
        .set('Authorization',`Bearer ${createResToken}`)
        
        expect(deleteRest.status).toBe(204)
    })
})
describe('Authorization tests', ()=>{
    test('Should return 403 when user A tries to update user',async()=>{
        const userA = await request(app).post('/v1/user').send({
            firstname:'UserA',
            surname:'TestA',
            email:faker.internet.email(),
            password:'123123123',
            confirmpassword:'123123123'
        })
        const userB = await request(app).post('/v1/user').send({
            firstname:'UserB',
            surname:'TestB',
            email:faker.internet.email(),
            password:'123123123',
            confirmpassword:'123123123'
        })

        const tokenUserA = await getAuthToken(userA.body.email,'123123123')
        const tokenUserB = await getAuthToken(userB.body.email,'123123123')
        const res = await request(app).put(`/v1/user/${userB.body.id}`)
        .set('Authorization',`Bearer ${tokenUserA}`)
        .send({firstname:'hacked'})
        expect(res.status).toBe(403)
    })
})