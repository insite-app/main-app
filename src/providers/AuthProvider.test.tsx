import { register, login, logout, getCurrentUser } from './AuthProvider';
import api from '../utils/api';

// Test for register function
describe('AuthProvider', () => {
  describe('register', () => {
    it('registers user successfully', async () => {
      const dummyUser = { username: 'john', password: 'password123' };
      const dummyResponse = { data: { id: 1, username: 'john' } };

      jest.spyOn(api, 'post').mockResolvedValue(dummyResponse);

      const response = await register(dummyUser);

      expect(api.post).toHaveBeenCalledWith('/auth/register', dummyUser);
      expect(response).toEqual(dummyResponse.data);
    });
  });

  // Test for login function
  describe('login', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('logs in user successfully', async () => {
      const dummyResponse = { data: { accessToken: 'access123', refreshToken: 'refresh123' } };

      jest.spyOn(global.Storage.prototype, 'setItem');
      jest.spyOn(api, 'post').mockResolvedValue(dummyResponse);

      const response = await login('john', 'password123');

      expect(global.localStorage.setItem).toHaveBeenCalledWith('accessToken', 'access123');
      expect(global.localStorage.setItem).toHaveBeenCalledWith('refreshToken', 'refresh123');
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        username: 'john',
        password: 'password123',
      });
      expect(response).toEqual(dummyResponse.data);
    });
  });

  // Test for logout function
  describe('logout', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('logs out user successfully', async () => {
      jest.spyOn(global.Storage.prototype, 'removeItem');
      await logout();
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('accessToken');
      expect(global.localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    });
  });

  // Test for getCurrentUser function
  describe('getCurrentUser', () => {
    it('fetches current user successfully', async () => {
      const dummyResponse = { data: { id: 1, username: 'john' } };
      jest.spyOn(api, 'get').mockResolvedValue(dummyResponse);

      const user = await getCurrentUser();

      expect(api.get).toHaveBeenCalledWith('/auth/user');
      expect(user.data).toEqual(dummyResponse.data);
    });
  });
});
