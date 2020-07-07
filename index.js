
/*Functionality for Naive Bayes
creates pseudo-random data
uses bayes theory in order to generate independed probabilities for each variable
displays a bubblechart with the probabilities translated into bubblesize to visualize decision-making
*/

let combinedlist=[];
let statisticalList=[[],[],[]];
let income;
let debt;
let loanAmount;
let paidInFull;

//creates pseudo-random data and sets up lists for use in analysis
for (let index=0;index<4;index++){
combinedlist.push([]);
}
for (let i=0;i<100000;i++){
    let income =Math.floor(Math.random()*200000);
    if (income<5000){
      income =Math.floor(Math.random()*200000);
    }
combinedlist[0].push(income);
let debt= Math.floor(Math.random()*2*income);
combinedlist[1].push(debt);
let loan=Math.floor(Math.random()*income);
if (loan<1000){
  loan+=1000;
}
combinedlist[2].push(loan);
let paidInFull=Math.random();

if (debt/income<.3|| loan/income<.1){
  if (paidInFull>.03){
    paidInFull=true;
  }else {
    paidInFull=false;
  }
}else if (debt/income<.5|| loan/income<.3){
  if (paidInFull>.05){
    paidInFull=true;
  }else {
    paidInFull=false;
  }
}else if (debt/income<.7|| loan/income<.5){
  if (paidInFull>.1){
    paidInFull=true;
  }else {
    paidInFull=false;
  }
}else if(debt/income<1|| loan/income<.75){
  if (paidInFull>.2){
    paidInFull=true;
  }else {
    paidInFull=false;
  }
}else if(debt/income<1.5||loan/income>1){
  if (paidInFull>.3){
    paidInFull=true;
  }else {
    paidInFull=false;
  }
}else {
  if (paidInFull>.4){
    paidInFull=true;
  }else {
    paidInFull=false;
  }
}
combinedlist[3].push(paidInFull);
statisticalList[0].push(Math.floor((debt/income)*10)/10);
statisticalList[1].push(Math.floor((loan/income)*10)/10);
statisticalList[2].push(paidInFull);
}


document.getElementById("item_1").innerText=combinedlist[0][0];
document.getElementById("item_2").innerText=combinedlist[1][0];
document.getElementById("item_3").innerText=combinedlist[2][0];
document.getElementById("item_4").innerText=combinedlist[3][0];
document.getElementById("item_5").innerText=combinedlist[0][1];
document.getElementById("item_6").innerText=combinedlist[1][1];
document.getElementById("item_7").innerText=combinedlist[2][1];
document.getElementById("item_8").innerText=combinedlist[3][1];
document.getElementById("item_13").innerText=combinedlist[0][9999];
document.getElementById("item_14").innerText=combinedlist[1][9999];
document.getElementById("item_15").innerText=combinedlist[2][9999];
document.getElementById("item_16").innerText=combinedlist[3][9999];




let trues=0;
let count=combinedlist[3].length;
for (let i=0;i<combinedlist[3].length;i++){
  if (combinedlist[3][i]==true){
    trues++;
  }}
let totalGoodLoans=trues;
let current_default=Math.round((100-(trues/count*100)),2);
document.getElementById("Current_Message").innerText="Your dataset has records of 100,000 loans"+
 " and a default rate of "+(current_default)+"%";


let ratios=[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9];
let ratioList;

let debtToIncomeratios=[0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1.0,1.1,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9];
let debtToIncomeList;


function train(){
  ratioList=[];
  for (let ratio=0; ratio<=.91;ratio=ratio+.1){
    ratioList.push([[0],[0]]);
}


for (let i=0;i<statisticalList[1].length;i++){
    for (let z=0;z<ratios.length;z++){
      if (statisticalList[1][i]==ratios[z]){
        ratioList[z][0]++;
        if (statisticalList[2][i]==true){
          ratioList[z][1]++;
        }
        break;
  }
}
}

for (let i=0; i<ratioList.length;i++){
  ratioList[i][0]=ratioList[i][0]/(statisticalList[1].length);
  ratioList[i][1]=ratioList[i][1]/totalGoodLoans;
}

debtToIncomeList=[];

for (let ratio=0; ratio<2;ratio=ratio+.1){
  debtToIncomeList.push([[0],[0]]);
}

for (let i=0;i<statisticalList[0].length;i++){
  for (let z=0;z<debtToIncomeratios.length;z++){
    if (statisticalList[0][i]==debtToIncomeratios[z]){
      debtToIncomeList[z][0]++;
      if (statisticalList[2][i]==true){
        debtToIncomeList[z][1]++;
      }
      break;
}
}
}

for (let i=0; i<debtToIncomeList.length;i++){
  debtToIncomeList[i][0]=debtToIncomeList[i][0]/(statisticalList[0].length);
  debtToIncomeList[i][1]=debtToIncomeList[i][1]/totalGoodLoans;
}
console.log(debtToIncomeList);

let pGood=totalGoodLoans/count;
resultingList=[];

for (let i=0; i<debtToIncomeList.length;i++){
    for (let z=0;z<ratioList.length;z++){
      let probability1=ratioList[z][1]*pGood/ratioList[z][0];
      let probability2=debtToIncomeList[i][1]*pGood/debtToIncomeList[i][0];
      
      let thingy=15;
      if (probability1*probability2>.85){
        thingy=12;
      }else if (probability1*probability2>.8){
        thingy=10;
      }else if (probability1*probability2>.75){
        thingy=7;
      }else if (probability1*probability2>.7){
        thingy=5;
      }else {
        thingy=3;
      }
        resultingList.push([debtToIncomeratios[i],ratios[z],probability1*probability2,thingy]);
        console.log(resultingList[(i*ratioList.length)+z]);
    }
  }
 
  let goodData=[];
  let medData=[];
  let badData=[];
  for (let i=0;i<resultingList.length;i++){

    if (resultingList[i][2]>=.85){
      goodData.push({x:resultingList[i][0],y:resultingList[i][1],r:resultingList[i][3]});
    }else if (resultingList[i][2]>=.7){
      medData.push({x:resultingList[i][0],y:resultingList[i][1],r:resultingList[i][3]});
    }else if (resultingList[i][2]<.7){
      badData.push({x:resultingList[i][0],y:resultingList[i][1],r:resultingList[i][3]});
    }
  }
  
let ctx=document.getElementById("myChart");
Chart.defaults.global.animation.duration = 2000;
  let totalDataset=[
    {
      label: ["Good Loans"],
      backgroundColor: "rgba(20,255,90,1)",
      borderColor: "rgba(255,221,50,1)",
      data: goodData,
      order:0
    },
    {
      label: ["Review Loans"],
      backgroundColor: "rgba(255,221,50,1)",
      borderColor: "rgba(255,221,50,1)",
      data: medData,
      order:1
    },
    {
      label: ["Reject Loans"],
      backgroundColor: "rgba(255,00,1)",
      borderColor: "rgba(255,221,50,1)",
      data: badData,
      order:2
    },
  ]

  let myBubbleChart = new Chart(ctx, {
      type: 'bubble',
      data:{
        datasets: totalDataset
      },
      options: {
        scales:{
          xAxes:[{
            scaleLabel:{
              display:true,
              labelString:"Debt to Income ratio"
            }
          }],
          yAxes:[{
            scaleLabel:{
              display:true,
              labelString:"Loan amount to Income Ratio"
            }
          }]
        }
      }
  });


myBubbleChart.update();

document.getElementById("Upper_Message").innerText="The data is used to create predictions for defaulting loans based on the applications loan/income ratio and debt/income ratio. The graph below visually represents the decision-making for the algorithm after \"training\". The bigger the circle the higher the probabilty of being paid in full.";
document.getElementById("Bottom_Message").innerText="With this new data you can automatically; approve the highest quality loans and deny the lowest quality loans. Now, your team will only need to manually review \"borderline\" cases."+
" Your team will have more time to review these cases and a statistical default prediction from the computer that can help them with their decision-making"+"\n\n"+
"This type of model can be expanded easily and is extremely useful for complicated decision-making when you have prior historical data.";

}




//called to generate probabilities for variables



//P(c|x)=P(x|c)*P(c)/P(x)
//probability that a loan is good given "x"
//Probability that a good loan has "x" times probability that a loan is good divided by probability that a loan has "x"
