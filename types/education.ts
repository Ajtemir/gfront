
const Educations = [
  { id: 1, name: 'Undergraduate'},
  { id: 2, name: 'Incomplete secondary'},
  { id: 3, name: 'Secondary general'},
  { id: 4, name: 'Secondary special'},
  { id: 5, name: 'Incomplete higher'},
  { id: 6, name: 'Higher'},
] as const;

type Education = typeof Educations[number]['name']

export {
  Educations,
  type Education,
}