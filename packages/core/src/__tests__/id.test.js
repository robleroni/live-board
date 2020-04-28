import Id from '../id.js';

describe("util-id", () => {
  it("should generate a random id", () => {
    const id = Id();
    expect(id).toHaveLength(10);
  });
});
