const Regions = [
  {id: 1, name: 'Bishkek'},
  {id: 2, name: 'Osh'},
  {id: 3, name: 'Batken'},
  {id: 4, name: 'Jalalabat'},
  {id: 5, name: 'Naryn'},
  {id: 6, name: 'Osh region'},
  {id: 7, name: 'Talas region'},
  {id: 8, name: 'Chui region'},
  {id: 9, name: 'Issykkul'},
] as const

type Region = typeof Regions[number]['name']


export {
  Regions,
  type Region,
}
