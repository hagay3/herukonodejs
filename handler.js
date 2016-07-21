/**
 * Created by levinsky on 7/20/16.
 */
'use strict';
module.exports = {
  calc: function (person) {
    let isMarried = person.getMarried;
    let isLowSalary = person.getLowSalary;
    let hasInsurace = person.getHasOldMI;

    if (hasInsurace) {
      return "please maintain your existing managers insurance";
    }
    let oldAge = person.getOldAge;
    if (oldAge)
    {
      return "according to your response a managers insurance is the right choise for you";
    }
    if(isLowSalary) {
      return this.resultfullPension(!isMarried);
    }
    if (!isLowSalary) {
      let result =  "Please deposit to one of the folliwing Pension funds upto to the salary allowed limit:" + this.pensioFunds();
      return result +" , the rest of your salary sholud be depoistied to a Yalin Lapidot Provident Fund (kupat gemel), Stocks track ";
    }
  },
  pensioFunds: function () {
   return " 1. Phoenix pension in Goverment Bonds track. its yields are highest in the last 5 years \n2. Harel Pension: its yields are highest in the last 8 years";

  },
  resultfullPension: function(isSingle) {
    let result =  "Please deposit to one of the folliwing Pension funds:" + this.pensioFunds();
    if (isSingle) {
      result = result + "dont forget to update your status is not married to avoid paying unneeded premiums, keep updating your status 2 years until you get married"
    }
    return result
  }
};

