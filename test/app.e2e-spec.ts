import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
      })
    )
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect("Welcome to the API of movies db");
  });

  describe('/movies requests', () => {
    it('/ (GET 200)', () => {
      return request(app.getHttpServer())
        .get('/movies')
        .expect(200)
        .expect([]);
    });

    it('/ (POST 201)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: "Hatiko", year: 2000 })
        .expect(201)
    });

    it('/ (POST 400)', () => {
      return request(app.getHttpServer())
        .post('/movies')
        .send({ title: "Hatiko" })
        .expect(400)
    });

    it('/:id (GET 200)', () => {
      return request(app.getHttpServer())
        .get('/movies/1')
        .expect(200)
    });

    it('/:id (GET 404)', () => {
      return request(app.getHttpServer())
        .get('/movies/9999')
        .expect(404)
    });

    it('/:id (PATCH 200)', () => {
      return request(app.getHttpServer())
        .patch('/movies/1')
        .send({ title: "Hatiko", year: 2002 })
        .expect(200)
    });

    it('/:id (PATCH 404)', () => {
      return request(app.getHttpServer())
        .patch('/movies/9999')
        .send({ title: "Hatiko", year: 2002 })
        .expect(404)
    });

    it('/:id (DELETE 200)', () => {
      return request(app.getHttpServer())
        .delete('/movies/1')
        .expect(200)
    });

    it('/:id (DELETE 404)', () => {
      return request(app.getHttpServer())
        .delete('/movies/9999')
        .expect(404)
    });
  })

});
