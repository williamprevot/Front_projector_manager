import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

// Mock pour le AuthService
class MockAuthService {
  isLoggedIn = false;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let authService: AuthService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useClass: MockAuthService } // Remplace le vrai AuthService par le mock
      ]
    });

    guard = TestBed.inject(AuthGuard);
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should return true if user is logged in', () => {
    authService.isLoggedIn = true;
    expect(guard.canActivate({} as any, {} as any)).toBeTrue();
  });

  it('should return false and navigate to login if user is not logged in', () => {
    authService.isLoggedIn = false;
    const navigateSpy = spyOn(router, 'navigate');
    
    expect(guard.canActivate({} as any, {} as any)).toBeFalse();
    expect(navigateSpy).toHaveBeenCalledWith(['index/signIn']);
  });
});
