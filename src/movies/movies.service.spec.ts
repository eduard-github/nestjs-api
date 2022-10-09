import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll function', () => {
    it('should return array of movies', () => {
      const movies = service.getAll()
      expect(movies).toBeInstanceOf(Array)
    })
  })

  describe('getOne function', () => {
    it('should return movie', () => {
      service.create({
        title: "The Love Song for Bobby Long",
        year: 2000,
        genres: ['comedy']
      })
      const movie = service.getOne(1)
      expect(movie).toBeDefined()
    })

    it('should return NotFound', () => {
      try {
        service.getOne(9999)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('create function', () => {
    it('creating', () => {
      const beforeCreate = service.getAll().length
      service.create({
        title: "The Love Song for Bobby Long",
        year: 2000,
        genres: ['comedy']
      })
      const afterCreate = service.getAll().length
      expect(afterCreate).toBeGreaterThan(beforeCreate)
    })
  })

  describe('update function', () => {
    it('updating', () => {
      service.create({
        title: "The Love Song for Bobby Long",
        year: 2000,
        genres: ['comedy']
      })

      service.update(1, { year: 2002 })
      const movie = service.getOne(1)
      expect(movie.year).toEqual(2002)
    })

    it('should return NotFound', () => {
      try {
        service.update(9999, { year: 2004 })
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

  describe('remove function', () => {
    it('deleting', () => {
      service.create({
        title: "The Love Song for Bobby Long",
        year: 2000,
        genres: ['comedy']
      })
      const movies = service.getAll().length
      service.remove(1)
      const afterRemove = service.getAll().length
      expect(afterRemove).toBeLessThan(movies)
    })

    it('should return NotFound', () => {
      try {
        service.remove(9999)
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException)
      }
    })
  })

});
