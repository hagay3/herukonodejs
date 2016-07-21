/**
 * Created by levinsky on 7/20/16.
 */
'use strict';
module.exports = {
  calc: function (person) {
    let isMarried = person.getMarried || person.getKids !== "0";
    let isLowSalary = person.getLowSalary;
    let hasInsurace = person.getHasOldMI;

    if (hasInsurace) {
      return "please maintain your existing managers insurance";
    }
    let oldAge = person.getOldAge;
    if (oldAge)
    {
      return "according to your response -  a managers insurance is the right choise for you, please consider purchasing IDI Managers insurance , Generic track, it had the highest yields in the last 8 & 5 years, according to bituach-net";
    }
    person.setLink = "http://www.eku.co.il/%D7%9E%D7%A7%D7%93%D7%9E%D7%99-%D7%A7%D7%A6%D7%91%D7%94-%D7%9E%D7%95%D7%91%D7%98%D7%97%D7%99%D7%9D-%D7%91%D7%91%D7%99%D7%98%D7%95%D7%97-%D7%9E%D7%A0%D7%94%D7%9C%D7%99%D7%9D-%D7%9C%D7%90-%D7%91%D7%98/";
    if(isLowSalary) {
      return this.resultfullPension(!isMarried);
    }
    if (!isLowSalary) {
      let result =  "Please deposit to one of the following Pension funds upto to the salary allowed limit:" + this.pensioFunds();
      return result +" , the rest of your salary sholud be depoistied to a Yalin Lapidot Provident Fund (kupat gemel), Stocks track, its yields are highest in the last 5 years, according to gemel-net";
    }
  },
  pensioFunds: function (isSingle) {
    let  result =  "\n1. Phoenix pension in Goverment Bonds track. its yields are highest in the last 5 years \n2. Harel Pension: its yields are highest in the last 8 years, according to Pensya-net";
    if (isSingle) {
        result = result + "dont forget to update your fund on your maritial status to avoid paying unneeded premiums, keep updating your status every 2 years until you get married";
    }
    return result;

  },
  resultfullPension: function(isSingle) {
    let result =  "Please deposit to one of the folliwing Pension funds:" + this.pensioFunds();


    return result
  }
};

