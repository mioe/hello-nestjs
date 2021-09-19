import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
	let app: INestApplication

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleFixture.createNestApplication()
		await app.init()
	})

	it('/ (GET)', () => {
		return request(app.getHttpServer())
			.get('/')
			.expect(200)
			.expect('Hello World!')
	})

	it('/products (GET)', () => {
		return request(app.getHttpServer())
			.get('/products')
			.expect(200)
			.expect('getAll')
	})

	it('/products/1 (GET)', () => {
		return request(app.getHttpServer())
			.get('/products/1')
			.expect(200)
			.expect('getOne 1')
	})

	const product = {
		title: 'Avacado',
		price: 200,
	}

	it('/products (POST)', () => {
		return request(app.getHttpServer())
			.post('/products')
			.send(product)
			.expect(201)
			.expect(`create ${product.title + product.price}`)
	})

	it('/products (DELETE)', () => {
		return request(app.getHttpServer())
			.delete('/products/1')
			.expect(200)
			.expect('remove 1')
	})

	it('/products/1 (PUT)', () => {
		return request(app.getHttpServer())
			.put('/products/1')
			.send(product)
			.expect(200)
			.expect(`update 1, ${product.title + product.price}`)
	})
})
