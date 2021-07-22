import { TestBed } from '@angular/core/testing';

import { RecipeShopService } from './recipe-shop.service';

describe('RecipeShopService', () => {
  let service: RecipeShopService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeShopService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
