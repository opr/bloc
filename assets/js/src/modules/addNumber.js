export default function addNumber(a, b, c = false) {
  if(c) {
    return a+b*2;
  }
  return a+b;
}
