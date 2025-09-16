import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions } from 'angular-in-memory-web-api';

@Injectable({ providedIn: 'root' })
export class MockApiService implements InMemoryDbService {
  createDb() {
    const items = [
      { id: 1, name: 'Angular Book', description: 'Learn Angular step by step' },
      { id: 2, name: 'Laptop', description: 'Powerful developer machine' },
      { id: 3, name: 'Headphones', description: 'Noise cancelling headphones' }
    ];
    return { items };
  }

  // Special case: handle POST /api/login
  post(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'login') {
      const { email, password } = reqInfo.utils.getJsonBody(reqInfo.req);

      if (email === 'test@example.com' && password === 'password') {
        const body = {
          token: 'mock-token-123456',
          user: { email }
        };

        return reqInfo.utils.createResponse$(() => ({
          body,
          status: 200
        }));
      } else {
        return reqInfo.utils.createResponse$(() => ({
          status: 401,
          body: { message: 'Invalid email or password' }
        }));
      }
    }
    return undefined; 
  }
}