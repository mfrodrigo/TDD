test('Devo conhecer as principais assertivas do jest', () => {
  let number = null;
  expect(number).toBeNull();
  number = 10;
  expect(number).not.toBeNull();
  expect(number).toEqual(10);
  expect(number).toBe(10);
  expect(number).toBeGreaterThan(9);
  expect(number).toBeLessThan(11);
});

test('Devo saber trabalhar com objetos', () => {
  const obj = { name: 'John', email: 'john@example.com' };
  expect(obj).toHaveProperty('name', 'John');
  expect(obj).toHaveProperty('email', 'john@example.com');
  expect(obj.name).toEqual('John');
  const obj2 = { name: 'John', email: 'john@example.com' };
  expect(obj).toEqual(obj2);
});
