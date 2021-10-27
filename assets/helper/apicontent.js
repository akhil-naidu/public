function viewBlog(id, type) {
  window.location.href = `resources-details.html?id=${id}&type=${type}`
}

function dldRes(id, type) {
  resmodal.style.display = "block";
  downloadId = id
}

function getRes(contenttype, current_page) {
  const BASEURL = commonVars.API_URL
  fetch(BASEURL + '/homecontent').then(res => {
    if(!res.ok) {
      throw Error("ERROR")
    }
    return res.json();
  }).then(data => {
    if(data.code === 0) {
      const htmlArr = [
        `
          <h4 class="font20 mt20 xs-mt20 wow fadeInLeft" data-wow-delay="0.3s">Latest ${contenttype}</h4>
          <div class="row wow fadeInLeft" data-wow-delay="0.3s">
        `
      ]
      if(contenttype === 'Blog') {
        const neededArr = data.data.filter(list => list.type === contenttype  && (new Date() > new Date(list.startDate)) && (new Date() < new Date(list.endDate)));
        const LIMIT = commonVars.LIMIT
        let page = current_page || 1,
        per_page = LIMIT || 10,
        offset = (page - 1) * per_page,

        paginatedItems = neededArr.slice(offset).slice(0, LIMIT),
        total_pages = Math.ceil(neededArr.length / per_page);

        paginatedItems.filter(list => list.type === contenttype).forEach(content => {
          const proP = content.thumbnail ? 
            `<img src="${content.thumbnail}" style="width: 100%; height: 222.5px" alt="">`:
            `<img class="pdfIcon" src="assets/img/blogImg.svg" />`
          const brf = content.brief ? content.brief : '';
          htmlArr.push(
            `
              <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 smallMarginTop">
                <div class="blueborder-2">
                  <div>
                    ${proP}
                  </div>
                  <div class="row padDetails-3 smallMarginTop">
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                      <p class="datefont">${new Date(content.startDate).toLocaleDateString()}</p>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                      <div class="mytooltip">
                        <p class="headFont-2">
                          ${content.title}
                        </p>
                        <span class="mytooltiptext">${content.title}</span>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                      <p class="breifFont-2">${brf}</p>
                    </div>
                  </div>
                  <div class="padDetails-2">
                    <button type="button" class="btn btn-primary dldBtn btwidth" onclick="viewBlog('${content._id}', 'blog')">Read More</button>
                  </div>
                </div>
              </div>
            `
          )
        })
        htmlArr.push(
          `
            </div>
            <div class="row wow fadeInLeft medMarginTop" data-wow-delay="0s" >
            <div class="paginationcss">
          `
        )
        for (let index = 0; index < total_pages; index++) {
          if((index + 1) === page) {
            htmlArr.push(`<a style="cursor: pointer" class="activecss">${index + 1}</a>`)
          } else {
            htmlArr.push(`<a style="cursor: pointer" onclick="getRes('Blog', ${index+1})">${index + 1}</a>`)
          }
        }

        htmlArr.push(
          `
            </div>
            </div>
          `
        )
        const html = htmlArr.join('')
        document.querySelector("#selectedcontent").innerHTML = html
      } else if(contenttype === 'E-book') {
        const neededArr = data.data.filter(list => list.type === contenttype  && (new Date() > new Date(list.startDate)) && (new Date() < new Date(list.endDate)));
        const LIMIT = commonVars.EBOOKLIMIT
        let page = current_page || 1,
        per_page = LIMIT || 10,
        offset = (page - 1) * per_page,

        paginatedItems = neededArr.slice(offset).slice(0, LIMIT),
        total_pages = Math.ceil(neededArr.length / per_page);

        paginatedItems.filter(list => list.type === contenttype).forEach(content => {
          const proP = content.thumbnail ? 
            `<img src="${content.thumbnail}" style="width: 100%; height: 190px"  alt="">`:
            `<img class="pdfIcon" src="assets/img/pdf.svg" style="margin-left: 10px" />`
          htmlArr.push(
            `
              <div class="col-md-3 col-lg-3 col-sm-12 col-xs-12 smallMarginTop">
                <div class="invborder">
                  <div>
                    ${proP}
                  </div>
                  <div class="row padDetails-3 smallMarginTop">
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                      <div class="mytooltip">
                        <p class="headFont">
                          ${content.title}
                        </p>
                        <span class="mytooltiptext">${content.title}</span>
                      </div>
                    </div>
                  </div>
                  <div class="padDetails-2">
                    <button type="button" class="btn btn-primary dldBtn btwidth" onclick="dldRes('${content._id}', 'ebook')">Download</button>
                  </div>
                </div>
              </div>
            `
          )
        })

        htmlArr.push(
          `
            </div>
            <div class="row wow fadeInLeft medMarginTop" data-wow-delay="0s" >
            <div class="paginationcss">
          `
        )
        for (let index = 0; index < total_pages; index++) {
          if((index + 1) === page) {
            htmlArr.push(`<a style="cursor: pointer" class="activecss">${index + 1}</a>`)
          } else {
            htmlArr.push(`<a style="cursor: pointer" onclick="getRes('E-book', ${index+1})">${index + 1}</a>`)
          }
        }

        htmlArr.push(
          `
            </div>
            </div>
          `
        )
        const html = htmlArr.join('')
        document.querySelector("#selectedcontent").innerHTML = html
      } else if(contenttype === 'Video') {
        const neededArr = data.data.filter(list => list.type === contenttype  && (new Date() > new Date(list.startDate)) && (new Date() < new Date(list.endDate)));
        const LIMIT = commonVars.LIMIT
        let page = current_page || 1,
        per_page = LIMIT || 10,
        offset = (page - 1) * per_page,

        paginatedItems = neededArr.slice(offset).slice(0, LIMIT),
        total_pages = Math.ceil(neededArr.length / per_page);

        paginatedItems.filter(list => list.type === contenttype).forEach(content => {
          const brf = content.brief ? content.brief : '';
          htmlArr.push(
            `
              <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 smallMarginTop">
                <div class="blueborder">
                  <div>
                    <iframe frameborder="1" allowfullscreen width="100%" src="${content.url}"></iframe>
                  </div>
                  <div class="row padDetails">
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                      <p class="datefont">${new Date(content.startDate).toLocaleDateString()}</p>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                      <div class="mytooltip">
                        <p class="headFont">
                          ${content.title}
                        </p>
                        <span class="mytooltiptext">${content.title}</span>
                      </div>
                    </div>
                    <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                      <p class="breifFont">${brf}</p>
                    </div>
                  </div>
                </div>
              </div>
            `
          )
        })

        htmlArr.push(
          `
            </div>
            <div class="row wow fadeInLeft medMarginTop" data-wow-delay="0s" >
            <div class="paginationcss">
          `
        )
        for (let index = 0; index < total_pages; index++) {
          if((index + 1) === page) {
            htmlArr.push(`<a style="cursor: pointer" class="activecss">${index + 1}</a>`)
          } else {
            htmlArr.push(`<a style="cursor: pointer" onclick="getRes('Video', ${index+1})">${index + 1}</a>`)
          }
        }

        htmlArr.push(
          `
            </div>
            </div>
          `
        )
        const html = htmlArr.join('')
        document.querySelector("#selectedcontent").innerHTML = html
      }
    } else {
      throw Error("ERROR")
    }
  }).catch(error => {
    console.log(error)
  })
}

function fetchContents(current_page) {
  const BASEURL = commonVars.API_URL
  fetch(BASEURL + '/homecontent').then(res => {
    if(!res.ok) {
      throw Error("ERROR")
    }
    return res.json();
  }).then(data => {
    if(data.code === 0) {
      const htmlArr = [
        `
          <h4 class="font20 mt20 xs-mt20 wow fadeInLeft" data-wow-delay="0.3s">Latest Blog</h4>
          <div class="row wow fadeInLeft" data-wow-delay="0.3s" >
        `
      ]

      const neededArr = data.data.filter(list => list.type === 'Blog'  && (new Date() > new Date(list.startDate)) && (new Date() < new Date(list.endDate)));
      const LIMIT = commonVars.LIMIT
      let page = current_page || 1,
      per_page = LIMIT || 10,
      offset = (page - 1) * per_page,

      paginatedItems = neededArr.slice(offset).slice(0, LIMIT),
      total_pages = Math.ceil(neededArr.length / per_page);
      
      paginatedItems.filter(list => ((list.type === 'Blog'))).forEach(content => {
        const proP = content.thumbnail ? 
            `<img src="${content.thumbnail}" style="width: 100%; height: 222.5px" alt="">`:
            `<img class="pdfIcon" src="assets/img/blogImg.svg" />`
        const brf = content.brief ? content.brief : '';
        htmlArr.push(
          `
            <div class="col-md-4 col-lg-4 col-sm-12 col-xs-12 smallMarginTop">
              <div class="blueborder-2">
                <div>
                  ${proP}
                </div>
                <div class="row padDetails-3 smallMarginTop">
                  <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <p class="datefont">${new Date(content.startDate).toLocaleDateString()}</p>
                  </div>
                  <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <div class="mytooltip">
                      <p class="headFont-2">
                        ${content.title}
                      </p>
                      <span class="mytooltiptext">${content.title}</span>
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <p class="breifFont-2">${brf}</p>
                  </div>
                </div>
                <div class="padDetails-2">
                  <button type="button" class="btn btn-primary dldBtn btwidth" onclick="viewBlog('${content._id}', 'blog')">Read More</button>
                </div>
              </div>
            </div>
          `
        )
      })

      htmlArr.push(
        `
          </div>
          <div class="row wow fadeInLeft medMarginTop" data-wow-delay="0s" >
          <div class="paginationcss">
        `
      )
      for (let index = 0; index < total_pages; index++) {
        if((index + 1) === page) {
          htmlArr.push(`<a style="cursor: pointer" class="activecss">${index + 1}</a>`)
        } else {
          htmlArr.push(`<a style="cursor: pointer" onclick="fetchContents(${index+1})">${index + 1}</a>`)
        }
      }

      htmlArr.push(
        `
          </div>
          </div>
        `
      )
      const html = htmlArr.join('')
      document.querySelector("#selectedcontent").innerHTML = html
    } else {
      throw Error("ERROR")
    }
  }).catch(error => {
    console.log(error)
  })
}

function downloadEbook() {
  const cname = document.forms["myForm"]["cname"].value;
  const cemail = document.forms["myForm"]["cemail"].value;
  const cnumber = document.forms["myForm"]["cnumber"].value;
  const cccode = document.forms["myForm"]["cccode"].value;
  const cwhoami = document.forms["myForm"]["cwhoami"].value;
  if(!cname || !cemail || !cnumber || !cwhoami || !cccode) {
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
            fetch(BASEURL + '/homecontent').then(res => {
              if(!res.ok) {
                throw Error("ERROR")
              }
              return res.json();
            }).then(data => {
              if(data.code === 0) {
                const theId = data.data.find(list => list._id === downloadId)
                if(theId && theId.uuid) {
                  const pNumber = cccode.concat(cnumber).replaceAll(' ', '');
                  const opts = {
                    name: cname,
                    leadType: 'download',
                    mobileNo: pNumber,
                    emailId: cemail,
                    roleType: cwhoami
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
                      const id = theId.uuid
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
                              resmodal.style.display = "none";
                              downloadId = ''
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
                }
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

fetchContents(1);