function checkCashRegister(price, cash, cid) {
  // Change
  let change = cash*100-price*100;
  
  // Total value of money in drawer
  let sumCash = 0
  for (let elem of cid) {
    sumCash += elem[1]*100;
  }

  // Cover cases where the value in the drawer is less or equal to the change
  if (change > sumCash) {
    return {status: "INSUFFICIENT_FUNDS", change: []};
  } else if (change === sumCash) {
    return {status: "CLOSED", change: cid};
  } else {
    let answer = [];
    cid = cid.reverse();
    let units = {'ONE HUNDRED': 10000,'TWENTY': 2000,'TEN': 1000,'FIVE': 500,'ONE': 100,'QUARTER': 25,'DIME': 10,'NICKEL': 5,'PENNY': 1};
    for (let elem of cid) {
      let holder = [elem[0], 0];
      elem[1] = elem[1]*100; 
      while (change >= units[elem[0]] && elem[1] > 0) {
        change -= units[elem[0]];
        elem[1] -= units[elem[0]];
        holder[1] += units[elem[0]]/100;
      }
      if (holder[1]>0) {
      answer.push(holder);
      }
    }
    if (change > 0) {
      return {status: "INSUFFICIENT_FUNDS", change: []};
    }
    return {status: "OPEN", change: answer};
  }
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])
