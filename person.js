/**
 * Created by levinsky on 7/21/16.
 */
'use strict';
module.exports = class Person {
  constructor(isMale, married, kids, hasOldMI, lowSalary) {
    this.isMale = isMale;
    this.married = married;
    this.kids = kids;
    this.hasOldMI = hasOldMI;
    this.lowSalary = lowSalary;
  }

  set setIsMale(value){
    this.isMale = value;
  }

  get getIsMale(){
    return this.isMale;
  }

  set setMarried(value){
    this.married = value;
  }

  get getMarried(){
    return this.married;
  }

  set setKids(value){
    this.kids = value;
  }

  get getKids(){
    return this.kids;
  }

  set setHasOldMI(value){
    this.hasOldMI = value;
  }

  get getHasOldMI(){
    return this.hasOldMI;
  }

  set setLowSalary(value){
    this.lowSalary = value;
  }

  get getLowSalary(){
    return this.lowSalary;
  }
  

  display() {
    console.log(this.isMale + " " + this.married + " " + this.kids + " " + this.hasOldMI + " " + this.lowSalary );
  }
};
