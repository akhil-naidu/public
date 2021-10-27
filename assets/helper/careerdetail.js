function applyJob() {
  const cname = document.forms["myForm"]["cname"].value;
  const cemail = document.forms["myForm"]["cemail"].value;
  const cnumber = document.forms["myForm"]["cnumber"].value;
  const cccode = document.forms["myForm"]["cccode"].value;
  const cfile = document.forms["myForm"]["cfile"].value;
  const cmsg = document.forms["myForm"]["cmsg"].value;
  if(!cname || !cemail || !cnumber || !cfile || !cmsg || !cccode) {
    document.getElementById("myCheck").click();
  } else {
    grecaptcha.ready(() => { grecaptcha.execute(commonVars.CAPTCHA).then(async (captcha) => {
      if(!captcha || captcha.length === 0) {
        grecaptcha.reset();
        const myMsg = 'Invalid Captcha'
        const errorHtml = `
          <div id="snackbar2">${myMsg}</div>
        `
        document.querySelector("#snackhtml").innerHTML = errorHtml
        myFunction('snackbar2')
      } else {
        const BASEURL = commonVars.API_URL
        fetch(BASEURL + '/captcha/verify', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' },
          body: JSON.stringify({ captcha })
        }).then(res => res.json()).then(function(data) {
          if(data.success) {
            fetch(BASEURL + '/jobposting').then(res => {
              if(!res.ok) {
                throw Error("ERROR")
              }
              return res.json();
            }).then(data => {
              if(data.code === 0) {
                const params = new URLSearchParams(location.search);
                const id = params.get('id');
                const ourJob = [...data.data].find(list => list.jobId === id)
                const files = document.querySelector('#cfile').files;
                const fileType = files[0].type;
                axios.get(BASEURL + `/jobposting/fetchUploadUrlForCV`, {params: {contentType: fileType}}).then(res => {
                  if(res.data.code === 0) {
                    const s3Res = res.data.data;
                    axios.put(s3Res.signedUrl, files[0], {headers: {"Content-Type": fileType}}).then(res2 => {
                      if(res2.status === 200) {
                        const pNumber = cccode.concat(cnumber).replaceAll(' ', '');
                        const cv = {
                          name: cname,
                          mobileNo: pNumber,
                          emailId: cemail,
                          description: cmsg,
                          cvUuid: s3Res.newuuid,
                          jobId: ourJob._id
                        }
        
                        axios.post(BASEURL + '/jobposting/applyJob', cv).then(res3 => {
                          if(res3.data.code === 0) {
                            myFunction('snackbar');
                            document.myForm.reset();
                            grecaptcha.reset();
                            setTimeout(function(){ window.location.href = `careers.html` }, 5000);
                          } else {
                            grecaptcha.reset();
                            if(data.errors) {
                              const errmsgObj = data.errors[0];
                              const errMsg = errmsgObj[Object.keys(errmsgObj)[0]];
                              myMsg = errMsg ? errMsg : 'Some Error Occurred'
                            } else if(data.message) {
                              myMsg = data.message
                            } else {
                              myMsg = 'Some Error Occurred'
                            }
                            const errorHtml = `
                              <div id="snackbar2">${myMsg}</div>
                            `
                            document.querySelector("#snackhtml").innerHTML = errorHtml
                            myFunction('snackbar2')
                          }
                        })
                      } else {
                        grecaptcha.reset();
                        const myMsg = 'Some Error Occurred'
                        const errorHtml = `
                          <div id="snackbar2">${myMsg}</div>
                        `
                        document.querySelector("#snackhtml").innerHTML = errorHtml
                        myFunction('snackbar2')
                      }
                    })
                  } else {
                    grecaptcha.reset();
                    const myMsg = 'Some Error Occurred'
                    const errorHtml = `
                      <div id="snackbar2">${myMsg}</div>
                    `
                    document.querySelector("#snackhtml").innerHTML = errorHtml
                    myFunction('snackbar2')
                  }
                })
              } else {
                throw Error("ERROR")
              }
            }).catch(error => {
              console.log(error)
            })
          } else {
            grecaptcha.reset();
            const myMsg = 'Invalid Captcha'
            const errorHtml = `
              <div id="snackbar2">${myMsg}</div>
            `
            document.querySelector("#snackhtml").innerHTML = errorHtml
            myFunction('snackbar2')
          }
        })
      }
    })})
  }
}

function expandJob() {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  if(id) {

    const BASEURL = commonVars.API_URL
    fetch(BASEURL + '/jobposting').then(res => {
      if(!res.ok) {
        throw Error("ERROR")
      }
      return res.json();
    }).then(data => {
      if(data.code === 0) {
        const ourJob = [...data.data].find(list => list.jobId === id)
        
        const html = `
          <div class="bgCyan">
            <div class="row">
              <div class="col-xs-12 col-sm-6 padjd">
                <h4 class="font20 blueColor">${ourJob.name}</h4>
              </div>
              <div class="col-xs-12 col-sm-6 padjd">
                <h4 class="font20 blueColor floatsizeRight">Job ID: ${ourJob.jobId}</h4>
              </div>
            </div>
            <hr class="grayColor">
            <div class="row">
              <div class="col-xs-12 padjd">
                <h4 class="font20">Job Description</h4>
              </div>
              <div class="col-xs-12 padjd">
                <div id="detailjd"></div>
              </div>
            </div>
            <div class="row">
              <div class="col-xs-12 padjd center">
                <h4 class="font20">Fill Your Contact Information</h4>
              </div>
              <div class="col-xs-12">
                <div class="jobForm">
                  <form name="myForm" id="myForm">
                    <div class="form-group">
                      <label>Full Name</label>
                      <input name="cname" id="cname" type="text" class="form-control contactinput"  placeholder="Enter Your Name" required minlength="4" maxlength="20">
                    </div>
                    <div class="form-group">
                      <label>Your Email</label>
                      <input name="cemail" id="cemail" type="text" class="form-control contactinput" placeholder="Enter Your Email" required>
                    </div>
                    <div class="form-group" >
                        <label>Contact Number</label>
                        <div class="row">
                            <div class="col-xs-4">
                                <div id="countryph">
                                </div>
                            </div>
                            <div class="col-xs-8">
                                <input style="float: right;" name="cnumber" id="cnumber" type="text" class="form-control contactinput" placeholder="Enter Your Contact Number" required minlength="10" maxlength="10">
                            </div>
                        </div>                      
                    </div>
                    <div class="form-group custom-file">
                      <label>Upload Your CV</label>
                      <input type="file" accept="application/pdf" class="form-control contactinput paddingBtm" name="cfile" id="cfile" required>
                    </div>
                    <div class="form-group">
                      <label>Description About Yourself </label>
                      <textarea name="cmsg" id="cmsg" class="form-control contactinput" rows="3" placeholder="Write here..." required minlength="5" maxlength="200"></textarea>
                    </div>
                    <div style="margin-bottom: 20px;" id="recapnew"></div>
                    <button type="button" class="btn btn-primary sendmsg" onclick="applyJob()">SUBMIT</button>
                    <button id="myCheck" class="inviBtn" type="submit"></button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        `
  
        document.querySelector("#jobopening").innerHTML = html
  
        const jd = ourJob.fullJD.split("\n").filter(list=>list)
  
        const jdhtmlArr = jd.map(list => {
          return `
            <li>${list}</li>
          `
        })
  
        jdhtmlArr.unshift(`<ul>`)
        jdhtmlArr.push(`</ul>`)
  
        const jdhtml = jdhtmlArr.join('')
        document.querySelector("#detailjd").insertAdjacentHTML("afterbegin", jdhtml)

        setTimeout(function(){ loadCapNew(); loadCountry(); }, 1000);
      } else {
        throw Error("ERROR")
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

function loadCountry() {
  const htmlArr = [
    `
      <select name="cccode" id="cccode" class="form-control contactinput" required>
    `
  ]

  countriesList.forEach(element => {
    const theOpt = `<option value="${element.phone}">${element.phone} ${element.label}</option>`
    htmlArr.push(theOpt)
  });

  htmlArr.push(`</select>`)

  const html = htmlArr.join('')
  document.querySelector("#countryph").innerHTML = html
}

function loadCapNew() {
  grecaptcha.render('recapnew', {
    sitekey: commonVars.CAPTCHA,
    size: "invisible",
    callback: function(response) {
    }
});
}

window.onload = function() {
  expandJob();
};
