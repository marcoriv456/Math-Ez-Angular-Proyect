import { TestBed } from '@angular/core/testing';
import { GithubService } from './github.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('GithubService (Jest)', () => {
  let service: GithubService;
  let httpClientMock: { get: jest.Mock };

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        GithubService,
        { provide: HttpClient, useValue: httpClientMock },
      ],
    });

    service = TestBed.inject(GithubService);
  });

  it('should return formatted github profile data', async () => {
    const mockResponse = {
      avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
      name: 'Marco Rivera',
      login: 'marcoriv456',
    };

    httpClientMock.get.mockReturnValue(of(mockResponse));

    const result = await service.getGithubProfileData();

    expect(result).toEqual({
      img: mockResponse.avatar_url,
      name: mockResponse.name,
      username: mockResponse.login,
    });

    expect(httpClientMock.get).toHaveBeenCalledWith('https://api.github.com/users/marcoriv456');
  });
});
