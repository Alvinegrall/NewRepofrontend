export default function (amount) {
  if(amount){
    const newAmount = amount.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    return newAmount;
  }
  return 0
}
