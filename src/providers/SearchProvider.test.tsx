import { search } from './SearchProvider';
import api from '../utils/api';

describe('SearchProvider', () => {
  describe('search', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('returns search results successfully', async () => {
      const query = 'test';
      const page = 1;
      const limit = 5;
      const dummyResponse = { data: [{ id: 1, name: 'Test Result' }] };

      jest.spyOn(api, 'get').mockResolvedValue(dummyResponse);

      const results = await search(query, page, limit);

      expect(api.get).toHaveBeenCalledWith(`/search?q=${query}&page=${page}&limit=${limit}`);
      expect(results).toEqual(dummyResponse.data);
    });

    it('throws an error on search failure', async () => {
      const query = 'test';
      const error = new Error('Search failed');

      jest.spyOn(api, 'get').mockRejectedValue(error);

      await expect(search(query)).rejects.toThrow('Search failed');
    });
  });
});
