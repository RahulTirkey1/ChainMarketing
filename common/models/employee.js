'use strict';
module.exports = function(Employee) {
    let totalPeople=[];
Employee.add=function(data,cb)
{ 
    if(!data)
    {
        let err={
            message:"No data is present"
        }
        cb(err);
    }else{
        
        Employee.find({where:{ReferralCode:data.ReferralCode}},(err,doc)=>{
            totalPeople=doc;
            console.log(totalPeople)
        totalPeople.sort((a,b)=>{
            return a.createdAt-b.createdAt;
        });

       setTimeout(()=>{    
    let newData={
        Name:data.Name,
        Salary:data.Salary,
        DOB:data.DOB,
        ID:data.ID,
        ReferralCode:data.ReferralCode,
        createdAt:new Date(),
        }
        data=newData;
        if(totalPeople)
        { console.log(totalPeople)
            updateReferral(totalPeople,10,data.Salary,data);
        }
        Employee.create(data,(err,data)=>{
            data.save();
        })
        let msg={
            message:"Success"
        }
        cb(null,data);
    })
      });
    }    
}

Employee.remoteMethod('add', {
    accepts: {arg:'data', type: 'object'},
    returns: {arg: 'data', type: 'object',root:true},
    http: {path: '/add', verb: 'post'}
});

let updateReferral=(people,num,salary,data) =>
{  let length=people.length;
    let currArray=[];
    while(length>=0)
    {
        currArray=totalPeople[length-1];
        if(currArray && currArray!==data)
        {
            
            currArray.Salary+=salary*(num/100);
            let newDatas={
                Name:currArray.Name,
                Salary:currArray.Salary,
                DOB:currArray.DOB,
                ID:currArray.ID,
                ReferralCode:currArray.ReferralCode,
            }
            Employee.replaceById(currArray.id,newDatas,(err,doc)=>{
                
            })
        }
        length--;
        num=num/2;
    }
}

    
};
