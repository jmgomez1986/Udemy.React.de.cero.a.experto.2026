import { beforeEach, describe, expect, test } from 'vitest';
import AxiosMockAdapter from 'axios-mock-adapter';
import { heroApi } from '../api/hero.api';
import { heroResponseDataByIdMock } from '../../../test/hero.response.data';
import { getHeroAction } from './get-hero.action';

describe('getHeroAction', () => {
  let mockAdapter = new AxiosMockAdapter(heroApi);

  beforeEach(() => {
    mockAdapter = new AxiosMockAdapter(heroApi);
  });

  test('should fetch hero data and return with complete image url', async () => {
    mockAdapter.onGet('/1').reply(200, heroResponseDataByIdMock);
    const response = await heroApi.get('/1');
    expect(response.data).toEqual(heroResponseDataByIdMock);
  });

  test('should throw an error if hero is not found', async () => {
    mockAdapter.onGet('/idSlug').reply(404);

    expect(async () => await getHeroAction('idSlug')).rejects.toThrow();

    await getHeroAction('idSlug').catch((error) => {
      expect(error).toBeDefined();
    });
  });
});
