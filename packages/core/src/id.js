/**
 * creates a 10 digets, uuid-like, for demo purposes e.g. 6iycaa5z7a
 */
const Id = () => Math.random().toString(36).substring(2,12);

export default Id;