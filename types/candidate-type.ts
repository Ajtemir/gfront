const CandidateTypes = [
  {id: 1, name: 'Citizen'},
  {id: 2, name: 'Mother'},
  {id: 3, name: 'Foreigner'},
  {id: 4, name: 'Entity'},
] as const

type CandidateType = typeof CandidateTypes[number]['name'];

export {
  CandidateTypes,
  type CandidateType,
}