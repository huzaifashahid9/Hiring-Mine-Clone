const fetchApi =async ()=>{
    try {
        const api = await fetch("https://backend-prod.app.hiringmine.com/api/jobAds/all?limit=20&pageNo=1&keyWord=&category=&isPending=false").then(res => res.json())
        console.log(api);
        
    //condition of salary
        let payRangeStart = api.data[0].payRangeStart;
        if(payRangeStart !== 0){
            payRangeStart = api.data[0].payRangeStart;
        }else{
        payRangeStart = "No salary mentioned"
        }

       

       //for loop start
        for(var i = 0; i < api.data.length; i++){
            //company name value seting
            let companyName = api.data[i].companyName;
            if(companyName ==''){
                companyName = "Anonymous"
            }else{
                companyName = api.data[i].companyName;
            }
            
            //value of status checking
            let isActive = api.data[i].category.isActive;
                if(isActive){
                    isActive = "Active"
                }else{
                    isActive = "1 hour ago"
                }

            //username set
            let userName = api.data[i].user.userName;
            //city
            let userCity = api.data[i].city;
            
            //salary checking
            let salary;
            let salaryCurrency = api.data[i].salaryCurrency;
            let startSalary = api.data[i].payRangeStart
            let endSalary = api.data[i].payRangeEnd
                
                if(startSalary !== 0 && endSalary !== 0){
                    if(salaryCurrency === "USD"){
                        salary = `$ ${startSalary} - ${endSalary}`
                    }else{
                        salary = `RS ${startSalary} - ${endSalary}`
                    }
                }else{
                    salary = "No salary mentioned"
                }
            

            cardContainer.innerHTML += `<div class="card"> 
            <div class="right">
                <div class="information">
                    <p id="companyName">${companyName}</p>
                    <p id="profileName">${api.data[i].designation}</p>
                    <p id="salary">${salary}</p>
                </div>

                <div class="time">
                    <p> <b>${userCity}</b></p>
                    <p> <span>${isActive}</span></p>
                </div>
            </div>

           <div class="left">
                <div class="card-logo">
                    <img src="./monly.png" alt="">
                </div>
            <div class="profile-info">
                <p>${api.data[i].views} views</p>
                <p>posted by <span>${userName}</span></p>
            </div>
           </div> 
        </div>` 
        }
    } catch (error) {
        alert("Network error! Please try Again..")
    }
}

fetchApi()