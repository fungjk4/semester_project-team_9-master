import { TestBed } from '@angular/core/testing';

import { TeacherInformationService } from './teacher-information.service';

describe('TeacherInformationService', () => {
  let service: TeacherInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeacherInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
