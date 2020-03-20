
    var url = document.getElementById('house') ? 'https://api.propublica.org/congress/v1/113/house/members.json' : 'https://api.propublica.org/congress/v1/113/senate/members.json'
    var init =
    {
      method: 'GET',
      headers: { 'X-Api-Key': 'g6ojDJPMIkOLxrTaBRLTsiozCC6MzSqBNpZvwCja' }
    }
    const apps = new Vue({
      el: '#checkbox',
      data: {
        members: [],
        updateMembers: [],
        states: [],
        state: 'all'
      },
      methods: {
        // check busca los checkboxes seleccionados y filtra lo que se muestra en la tabla con el v-for (updatedMembers)
        check: function () {
          let htmlCollection = document.getElementsByClassName('congress')
          let checkBoxes = [].slice.call(htmlCollection);
          let checked = checkBoxes.filter(e => e.checked)
          // se hace un filter donde se compara por cada miembro si su party es igual a algun checkbox y si su estado coincide con el seleccionado o es "all"
          this.updateMembers = this.members.filter(e => { for (i in checked) { if ((e.party == checked[i].value) && (apps.state == e.state || apps.state == "all")) return true } })
        },
        changeState: function () {
          apps.state = document.getElementById('states').value
        }
      }
    })

    fetch(url, init)
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
        console.log(data);
        apps.members = senateData.results[0].members
        console.log(apps.members);
        apps.updateMembers = apps.members
        apps.members.forEach(member => { if (apps.states.indexOf(member.state) == -1) apps.states.push(member.state) })
      })
      .catch(function (err) {
        console.log('Fetch Error :-S', err);
      });