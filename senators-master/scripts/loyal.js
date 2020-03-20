
    const apps = new Vue({

        el: '#loyal',
        data: {
  
          members: [],
          dMembers:[],
          rMembers:[],
          iMembers:[],
          democratsPercentage:0,
          republicansPercentage:0,
          independentsPercentage:0,
          leastEngaged:[],
          mostEngaged:[]
          
        },
        methods: {
        }
      })
  
      
      let url = document.getElementById('house') ? 'https://api.propublica.org/congress/v1/113/house/members.json' : 'https://api.propublica.org/congress/v1/113/senate/members.json'
      let init =
      {
        method: 'GET',
  
        headers: { 'X-Api-Key': 'g6ojDJPMIkOLxrTaBRLTsiozCC6MzSqBNpZvwCja' }
      }
  
  async function fetchInfoAndCalculateGlanceTable()
  {
      await fetch(url, init)
        .then(
          function (response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
  
            return response.json()
  
            // Examine the text in the response
  
          }
        )
        .then(function (data) {
          senateData = data
          apps.members = senateData.results[0].members
        })
        .catch(function (err) {
          console.log('Fetch Error :-S', err);
        });
  
  
        apps.dMembers = apps.members.filter(member =>  member.party=="D")
        apps.dMembers.forEach(member=> apps.democratsPercentage += member.votes_with_party_pct)
  
        apps.rMembers = apps.members.filter(member =>  member.party=="R")
        apps.rMembers.forEach(member=> apps.republicansPercentage += member.votes_with_party_pct)
  
        apps.iMembers = apps.members.filter(member =>  member.party=="I")
        apps.iMembers.forEach(member=> apps.independentsPercentage += member.votes_with_party_pct)
  
    
        if(apps.dMembers.length!=0)
        {
            apps.democratsPercentage = Math.round(apps.democratsPercentage/apps.dMembers.length,2)
        }else apps.democratPercentage = 0
    
       if(apps.rMembers.length!=0) 
        {
        apps.republicansPercentage = Math.round(apps.republicansPercentage/apps.rMembers.length,2)
        }else apps.republicansPercentage = 0
    
        if(apps.iMembers.length!=0) 
        {
        apps.independentsPercentage = Math.round(apps.independentsPercentage/apps.iMembers.length,2)
        }else apps.independentPercentage = 0
  
  
        function calculateMostLoyals(array)
        {
        let myMembers=array
        let aux = []
        let aux2=[]
        myMembers = myMembers.filter(member=>member.total_votes!=0)

        const tenPercent = Math.round(myMembers.length*0.1)
        let reversedArray=[]
        
        myMembers.sort(function(a,b){
            if(a.votes_with_party_pct > b.votes_with_party_pct)
            {
                return 1;
            }
    
            if (a.votes_with_party_pct < b.votes_with_party_pct)
            {
                return -1;
            }
    
            return 0;
        
        })
  
  
        reversedArray = myMembers.slice().reverse();
      
       
  
        let min = reversedArray[tenPercent].votes_with_party_pct
        let max = myMembers[tenPercent].votes_with_party_pct
        
        for(i=tenPercent;i<myMembers.length;i++)
        {
            {
                if(myMembers[i].votes_with_party_pct==max) aux.push(myMembers[i])
            }
            {
                if(reversedArray[i].votes_with_party_pct==max) aux2.push(reversedArray[i])
            }
        
        }
       
  
        myMembers.length = tenPercent
        reversedArray.length = tenPercent
        aux.forEach(extra=>myMembers.push(extra))
        aux2.forEach(extra=>reversedArray.push(extra))
        
        return ([myMembers,reversedArray])
        
        }
        
        [apps.leastEngaged,apps.mostEngaged] = calculateMostLoyals(apps.members)

  }
  
  fetchInfoAndCalculateGlanceTable()
  
  