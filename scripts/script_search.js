// Jun Hao Own Hosting
//var host = "https://cjh-backend-ca2.herokuapp.com";

// Default Cher Hosting
var host = "https://ades-2b01.herokuapp.com/";

var arr;
$(document).on('submit', 'form.searchCompany', function (e) {
    e.preventDefault();

    arr = $(this).serializeArray()
    let id = $(this).attr('id').substring(13);

    document.getElementById(`loader-search${id}`).style.visibility = "visible";

    if (!intervalArr === undefined || !intervalArr.length == 0) {
      clearInterval(intervalArr[id])
    }

    // Clear Graph Error from start
    document.getElementById(`error-graph${id}`).style.visibility = "hidden";
    let a = document.getElementById(`dropdownQueues${id}`);
    let url = `${host}/company/queue?company_id=${arr[0].value}`

    getCompany(url,a,id)
});

$(document).on('change','.cb', function () {
  let id = $(this).attr('id').substring(14);
  // If previous chart present clear its interval
  if (!intervalArr === undefined || !intervalArr.length == 0) {
    clearInterval(intervalArr[id])
  }
  
  let a = document.getElementById(`dropdownQueues${id}`);
  let url = `${host}/company/queue?company_id=${arr[0].value}`

  getCompany(url,a,id)
});

function getCompany(url,a, id){
    $.get(url, function (data, status) {
        
      let errormessage = document.getElementById(`error${id}`);
      a.innerHTML = " <option value='blank' style='display:none'></option>";

      if(data.length > 0){
        
        document.getElementById(`loader-search${id}`).style.visibility = "hidden";
        errormessage.innerText = " ";
        
        for(let i = 0; i < data.length; i++){
                
              let hiddeninactive = document.getElementById(`cbHideInactive${id}`).checked
              let queue = data[i].queue_id;

              if(hiddeninactive == true){
                if(data[i].is_active == 1){
                  a = document.getElementById(`dropdownQueues${id}`)
                  a.innerHTML +=  `<option value = ${queue}>${queue}</option>`;
                }else{
                  a = document.getElementById(`dropdownQueues${id}`)
                  a.innerHTML +=  `<option value = ${queue} style="display: none">${queue}</option>`;
                }

              } else {
                a = document.getElementById(`dropdownQueues${id}`)
                a.innerHTML +=  `<option value = ${queue}>${queue}</option>`;
              }
                
              
        }
      } else {
        document.getElementById(`loader-search${id}`).style.visibility = "hidden";
        errormessage.innerText = 'Unknown Company ID'
      }

    }).fail(error => {

      document.getElementById(`loader-search${id}`).style.visibility = "hidden";
      a.innerHTML = ""
      var errormessage = document.getElementById(`error${id}`);

      if (error.responseJSON.code == "INVALID_QUERY_STRING") {
        errormessage.innerText = "Invalid Company Id"
      }

    })
}