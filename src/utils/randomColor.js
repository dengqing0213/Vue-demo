const randomColor = () => {
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  let a = Math.random() * 0.5 + 0.5
  return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')'
}
export default randomColor
