import { test, expect } from 'vitest';

test('user create new transaction', () => {
    // TODO: Do http call to create a new transaction
    const responseStatusCode = 201;
    expect(responseStatusCode).toEqual(201);
});