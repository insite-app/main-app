import { fetchUsers, getProfile, saveProfile, getAvatarUrl } from './UserProvider';
import api from '../utils/api';

// Test for fetchUsers function
describe('UserProvider', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('fetchUsers', () => {
    it('fetches users with valid token', async () => {
      const dummyToken = 'dummyToken';
      const dummyResponse = { data: [{ id: 1, name: 'John Doe' }] };

      jest.spyOn(global.Storage.prototype, 'getItem').mockReturnValue(dummyToken);
      jest.spyOn(api, 'get').mockResolvedValue(dummyResponse);

      const users = await fetchUsers();

      expect(global.localStorage.getItem).toHaveBeenCalledWith('accessToken');
      expect(api.get).toHaveBeenCalledWith('/users', {
        headers: {
          Authorization: `Bearer ${dummyToken}`,
        },
      });
      expect(users).toEqual(dummyResponse.data);
    });
  });

  // Test for getProfile function
  describe('getProfile', () => {
    it('fetches user profile successfully', async () => {
      const dummyResponse = { data: { id: 1, name: 'John Doe' } };
      jest.spyOn(api, 'get').mockResolvedValue(dummyResponse);

      const profile = await getProfile('john');

      expect(api.get).toHaveBeenCalledWith('/users/john');
      expect(profile).toEqual(dummyResponse.data);
    });
  });

  // Test for saveProfile function
  describe('saveProfile', () => {
    it('saves user profile successfully', async () => {
      const dummyResponse = { data: { id: 1, name: 'John Doe' } };
      const dummyProfile = { name: 'John Doe' };
      jest.spyOn(api, 'put').mockResolvedValue(dummyResponse);

      const response = await saveProfile('john', dummyProfile);

      expect(api.put).toHaveBeenCalledWith('/users/john', dummyProfile);
      expect(response).toEqual(dummyResponse.data);
    });
  });

  // Test for getAvatarUrl function
  describe('getAvatarUrl', () => {
    it('fetches user avatar URL successfully', async () => {
      const dummyResponse = { data: 'http://example.com/avatar.jpg' };
      jest.spyOn(api, 'get').mockResolvedValue(dummyResponse);

      const url = await getAvatarUrl('john');

      expect(api.get).toHaveBeenCalledWith('/users/john/avatar');
      expect(url).toEqual(dummyResponse.data);
    });
  });
});
