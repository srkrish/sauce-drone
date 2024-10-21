import pet from '../../../fixtures/pet.json';
describe('Pet API', () => {
    const petEndpoint = 'https://petstore.swagger.io/v2/pet';
    const apiKey = 'special-key';

    it('should create a new pet', () => {
        cy.request({
            method: 'POST',
            url: petEndpoint,
            headers: {
                'api_key': apiKey
            },
            body: pet
        })
        .its('body')
        .then((pet) => {
            expect(pet).to.have.property('id', pet.id);
            expect(pet).to.have.property('name', pet.name);
            expect(pet).to.have.property('status', pet.status);
        });
    });

    it('should retrieve the pet by ID', () => {
        cy.request({
            url: `${petEndpoint}/${pet.id}`,
            headers: {
                'api_key': apiKey
            }
        })
        .its('body')
        .then((pet) => {
            expect(pet).to.have.property('id', pet.id);
            expect(pet).to.have.property('name', pet.name);
            expect(pet).to.have.property('status', pet.status);
        });
    });

    it('tries to retrieve a non-existent pet', () => {
        cy.request({
            url: `${petEndpoint}/0`,
            headers: {
                'api_key': apiKey
            },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.eq('Pet not found');
        });
    });

    it('tries to retrieve a pet with an invalid ID', () => {
        cy.request({
            url: `${petEndpoint}/abc`,
            headers: {
                'api_key': apiKey
            },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(404);
            expect(response.body.message).to.include('abc');
        });
    });   

    it('should update the pet', () => {
        pet.status = 'sold';
        cy.request({
            method: 'PUT',
            url: petEndpoint,
            headers: {
                'api_key': apiKey
            },
            body: pet
        })
        .its('body')
        .then((pet) => {
            expect(pet).to.have.property('id', pet.id);
            expect(pet).to.have.property('name', pet.name);
            expect(pet).to.have.property('status', 'sold');
        });
    });

    it('update a pet in the store with form data', () => {
        cy.request({
            method: 'POST',
            url: `${petEndpoint}/${pet.id}`,
            headers: {
                'api_key': apiKey,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: true,
            body: {
                petId: pet.id,
                name: pet.name,
                status: 'pending'
            }
        })
        .then((response) => {
            expect(response.body.message).to.eq(pet.id.toString());
            expect(response.status).to.eq(200);
        });
    });

    it('should delete the pet', () => {
        cy.request({
            method: 'DELETE',
            url: `${petEndpoint}/${pet.id}`,
            headers: {
                'api_key': apiKey
            }
        })
        .then((response) => {
            expect(response.body.message).to.eq(pet.id.toString());
            expect(response.status).to.eq(200);
        });
    });

    it('tries to delete a non-existent pet', () => {
        cy.request({
            method: 'DELETE',
            url: `${petEndpoint}/0`,
            headers: {
                'api_key': apiKey
            },
            failOnStatusCode: false
        })
        .then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});