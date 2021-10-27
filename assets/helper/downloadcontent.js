function downloadEbook() {
  const cname = document.forms["myForm"]["cname"].value;
  const cemail = document.forms["myForm"]["cemail"].value;
  const cnumber = document.forms["myForm"]["cnumber"].value;
  const cwhoami = document.forms["myForm"]["cwhoami"].value;
  const cmsg = document.forms["myForm"]["cmsg"].value;
  if(!cname || !cemail || !cnumber || !cwhoami || !cmsg) {
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
            const opts = {
              name: cname,
              leadType: 'download',
              mobileNo: cnumber,
              emailId: cemail,
              roleType: cwhoami,
              query: cmsg
            }
      
            fetch(BASEURL + '/lead/createLead', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts)
            }).then(function(response) {
              return response.json();
            }).then(function(data) {
              if(data.code === 0) {
                // myFunction('snackbar');
                const params = new URLSearchParams(location.search);
                const id = params.get('id');
                if(id) {
                  const BASEURL = commonVars.API_URL;
                  fetch(BASEURL + `/homecontent/fetchDownloadUrlForHomeContent?uuid=${id}`).then(res => {
                    if(!res.ok) {
                      throw Error("ERROR")
                    }
                    return res.json();
                  }).then(data => {
                    if(data.code === 0) {
                      document.myForm.reset();
                      grecaptcha.reset();
                      setTimeout(() => {
                        const response = {
                          file: data.data,
                        };
                        window.open(response.file);
                      }, 100);
                    } else {
                      throw Error("ERROR")
                    }
                  }).catch(error => {
                    console.log(error)
                  })
                }
              } else {
                grecaptcha.reset();
                const errmsgObj = data.errors[0];
                const errMsg = errmsgObj[Object.keys(errmsgObj)[0]];
                const myMsg = errMsg ? errMsg : 'Some Error Occurred'
                const errorHtml = `
                  <div id="snackbar2">${myMsg}</div>
                `
                document.querySelector("#snackhtml").innerHTML = errorHtml
                myFunction('snackbar2')
              }
            });
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

function loadCapNew() {
  grecaptcha.render('recapnew', {
    sitekey: commonVars.CAPTCHA,
    size: "invisible",
    callback: function(response) {
    }
});
}

window.onload = function() {
  loadCapNew();
};