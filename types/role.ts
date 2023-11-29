const Roles = [
  {id: 1, name: 'Administrator'},
] as const;

type Role = typeof Roles[number]['name'];

export {
  Roles,
  type Role,
}