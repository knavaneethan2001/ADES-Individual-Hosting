// Jun Hao Own Hosting
//var host = "https://cjh-backend-ca2.herokuapp.com";

// Default Cher Hosting
var host = "https://ades-2b01.herokuapp.com";

var chart;
var intervalArr = [];
    $(document).on('change','.form-select', function () {
        
        let queue = $(this).val();
        let chartid = $(this).attr('id').substring(14);
        
        // If previous chart present clear its interval
        if (!intervalArr === undefined || !intervalArr.length == 0) {
            clearInterval(intervalArr[chartid])
        }

        // Show Graph
        showLoaderDisplay(`chart${chartid}`)

        // Generate Graph
        chart = new Chart(document.getElementById(`chart${chartid}`).getContext('2d'), {
            type: 'line',
            data: {
                datasets: [{
                    borderColor: '#12af54',
                    fill: false,
                }]
            },
            options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: ''
                },
                animation: false,
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 1,
                            fontColor: "#FFF"
                        }
                    }],
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'minute',
                        },
                        ticks: {
                            fontColor: "#FFF"
                        }
                    }],
                },
                tooltips: {
                    enabled: false,
                },
                elements: {
                    point: {
                        radius: 0
                    }
                },
            }
        })
        
        var chartObj = {
            chart: chart
        }

        
        intervalArr[chartid] 
            // 3 Second interval
            = setInterval(function(){
                showLoaderDisplay(`loader${chartid}`)
                getArrivalRate(queue, chartObj, chartid)
            },3000)
        
        })

// Custom Date to ISO with timezone
Date.prototype.toIsoString = function () {
    let tzo = -this.getTimezoneOffset(),
        dif = tzo >= 0 ? '+' : '-',
        pad = function (num) {
            let norm = Math.floor(Math.abs(num));
            return (norm < 10 ? '0' : '') + norm;
        };
    return this.getFullYear() +
        '-' + pad(this.getMonth() + 1) +
        '-' + pad(this.getDate()) +
        'T' + pad(this.getHours()) +
        ':' + pad(this.getMinutes()) +
        ':' + pad(this.getSeconds()) +
        dif + pad(tzo / 60) +
        ':' + pad(tzo % 60);
}

let add_minutes = function (dt, minutes) {
    return new Date(dt.getTime() + minutes * 60000);
}

function getArrivalRate(queue_id , chartObj, trackerid){
    let date = add_minutes(new Date(), -3)
    let dt = date.toIsoString().slice(0, 19) // e.g 2021-01-23T15:19:19
    //let dt = moment().subtract(moment.duration("00:03:00")).format().replace('+', '%2B');

    let url = `${host}/company/arrival_rate?queue_id=${queue_id}&from=${dt}%2B08:00&duration=3`

    
    $.get(url, function (data, status) {
        
        updateChart(data,chartObj);
        hideLoaderDisplay(`loader${trackerid}`);

    })
    .done(function(){
        toggleError(`error-graph${trackerid}`,"","hidden")
    })
    .error(function (jqXHR){
        let errCode = jqXHR.status;
        if (errCode == 404){
            // Toggle Error Msg
            toggleError(`error-graph${trackerid}`,"Queue Id does not exist","visible")
        }else if (errCode == 400){
            toggleError(`error-graph${trackerid}`,"Customer Id should be 10-digits","visible")
        }else{
            toggleError(`error-graph${trackerid}`,"Unable to establish connection with database","visible")
        }

        // Stop interval & Loader
        clearInterval(intervalArr[trackerid])
        hideLoaderDisplay(`loader${trackerid}`)
    });
    
    
}

function showLoaderDisplay(id){
    let concat = "#" + id;
    $(concat).show();
}

function hideLoaderDisplay(id){
    let concat = "#" + id;
    $(concat).hide();
}

function toggleError(id,err,display){
    let concat = "#" + id;
    $(concat).css("visibility", display)
    $(concat).text(err)
}

function updateChart(jsonData, chartObj){
    chartObj.chart.data.labels = jsonData.map(e => { return moment.unix(e.timestamp).format() } );
    chartObj.chart.data.datasets[0].data = jsonData.map(e => { return e.count } );
    chartObj.chart.update();
}