import { TestBed } from '@angular/core/testing';

import { RecipeServiseService } from './recipe-servise.service';

describe('RecipeServiseService', () => {
  let service: RecipeServiseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeServiseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
