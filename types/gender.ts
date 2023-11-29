const Genders = [
  {id: 1, name: 'Male'},
  {id: 2, name: 'Female'},
] as const;

type Gender = typeof Genders[number]['name'];

export {
  Genders,
  type Gender,
}