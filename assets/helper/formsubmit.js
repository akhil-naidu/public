function submitForm() {
  const cname = document.forms["myForm"]["cname"].value;
  const cemail = document.forms["myForm"]["cemail"].value;
  const cnumber = document.forms["myForm"]["cnumber"].value;
  const cccode = document.forms["myForm"]["cccode"].value;
  const cwhoami = document.forms["myForm"]["cwhoami"].value;
  const cmsg = document.forms["myForm"]["cmsg"].value;
  if(!cname || !cemail || !cnumber || !cwhoami || !cmsg || !cccode) {
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
            const pNumber = cccode.concat(cnumber).replaceAll(' ', '');
            const opts = {
              name: cname,
              leadType: 'contact-us',
              mobileNo: pNumber,
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
                document.myForm.reset();
                grecaptcha.reset();
                myFunction('snackbar');
              } else {
                grecaptcha.reset();
                let myMsg;
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

function bookdemo() {
  const cname = document.forms["myForm"]["cname"].value;
  const ciname = document.forms["myForm"]["ciname"].value;
  const cemail = document.forms["myForm"]["cemail"].value;
  const cnumber = document.forms["myForm"]["cnumber"].value;
  const cccode = document.forms["myForm"]["cccode"].value;
  const cstudent = document.forms["myForm"]["cstudent"].value;
  if(!cname || !ciname || !cemail || !cnumber || !cccode) {
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
            const pNumber = cccode.concat(cnumber).replaceAll(' ', '');
            const opts = {
              name: cname,
              leadType: 'demo',
              mobileNo: pNumber,
              emailId: cemail,
              instituteName: ciname,
              studentCount: cstudent ? cstudent : '-'
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
                document.myForm.reset();
                grecaptcha.reset();
                myFunction('snackbar');
              } else {
                grecaptcha.reset();
                let myMsg;
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
  loadCapNew();
  loadCountry();
};
