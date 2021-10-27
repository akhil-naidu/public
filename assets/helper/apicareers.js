function compare( a, b ) {
  if ( a.department < b.department ){
    return -1;
  }
  if ( a.department > b.department ){
    return 1;
  }
  return 0;
}

function expandJob(id) {
  window.location.href = `careers-details.html?id=${id}`
}

function fetchJobopenings() {
  const BASEURL = commonVars.API_URL
  fetch(BASEURL + '/jobposting').then(res => {
    if(!res.ok) {
      throw Error("ERROR")
    }
    return res.json();
  }).then(data => {
    if(data.code === 0) {
      let presort = [...data.data].filter(job => ((new Date() > new Date(job.startDate)) && (new Date() < new Date(job.endDate))))
      let allJobs = [...presort].sort( compare );
      
      const htmlArr = [`<div>`];
      let prevDept = ''

      allJobs.forEach(list => {
        if(!prevDept || (prevDept && (prevDept !== list.department))) {
          htmlArr.push(
            `
              <div class="row">
                <div class="col-xs-12">
                  <h4 class="font20 mt20 xs-mt20">${list.department}</h4>
                </div>
              </div>
            `
          )
        }

        htmlArr.push(
          `
            <div class="row jobBox">
              <div class="col-xs-6">
                <p class="mt10 xs-mt30 md-mt10">${list.name}</p>
              </div>
              <div class="col-xs-6">
                <div class="home-button wow fadeInUp">
                  <a class="xs-mb20 btnapply" onclick="expandJob('${list.jobId}')">APPLY NOW</a>
                </div>
              </div>
            </div>
          `
        )

        prevDept = list.department;
      })

      if(allJobs.length === 0) {
        htmlArr.push(
          `
            <div class="row">
              <div class="col-xs-12">
                <h4 class="font20 mt20 xs-mt20">No Current Vacancies</h4>
              </div>
            </div>
          `
        )
      }

      htmlArr.push(`</div>`)
      const html = htmlArr.join('')
      document.querySelector("#jobopening").insertAdjacentHTML("afterbegin", html)
    } else {
      throw Error("ERROR")
    }
  }).catch(error => {
    console.log(error)
  })
}

fetchJobopenings();