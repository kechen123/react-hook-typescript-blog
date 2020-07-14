var arr = [{
    id: '11',
    value: 9
  },
  {
    id: '22',
    value: 8
  },
  {
    id: '33',
    value: 7
  },
  {
    id: '44',
    value: 6
  },
  {
    id: '55',
    value: 5
  },
  {
    id: '66',
    value: 4
  },
  {
    id: '77',
    value: 3
  },
  {
    id: '88',
    value: 2
  },
];
var min = arr[arr.length - 1].value
for (let index = arr.length - 1; index > 0; index--) {
  arr[index].value = arr[index - 1].value
}
arr[0].value = min;

console.log(arr)