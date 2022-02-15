const fs = require('fs');

fs.readFile('./1-input.json', (err, file) => {
    const data = JSON.parse(file);
    const obj = {};
    data.expenseData.map(exp => {
        obj[exp.startDate] = -exp.amount;
    });    
    data.revenueData.map(rev => {                
        if(obj[rev.startDate]){            
            obj[rev.startDate]+=rev.amount;
        }else{
            obj[rev.startDate] = rev.amount;
        }                
    });

    const sortedExp = data.expenseData.sort((a,b) => a.startDate.localeCompare(b.startDate));
    const sortedRev = data.revenueData.sort((a,b) => a.startDate.localeCompare(b.startDate));
    let startDate = (sortedExp[0].startDate.localeCompare(sortedRev[0].startDate)===-1?sortedExp[0]:sortedRev[0]).startDate;    
    const endDate = (sortedExp[sortedExp.length-1].startDate.localeCompare(sortedRev[sortedRev.length-1].startDate)===1?sortedExp[sortedExp.length-1]:sortedRev[sortedRev.length-1]).startDate;    
    while(startDate!=endDate) {
        if(!obj[startDate]){
            obj[startDate] = 0;
        }
        const tempDate = new Date(startDate);        
        tempDate.setMonth(tempDate.getMonth()+1);        
        startDate = tempDate.toISOString();        
    }
    const balance = Object.keys(obj).reduce((arr, curr)=> {        
        arr.push({amount:obj[curr], startDate:curr})
        return arr;
    },[]).sort((a,b)=> a.startDate.localeCompare(b.startDate));

    const output = {
        balance
    }

    console.log(output);
})