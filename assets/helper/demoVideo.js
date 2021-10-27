function sortpack(array) {
  const newArr = [];

  // newArr.push(array.find(list => list.planId === 'Edumatica_Basic'))
  // newArr.push(array.find(list => list.planId === 'Edumatica_Plus'))
  newArr.push(array.find(list => list.planId === 'Edumatica_Max'))

  return newArr;
}

function redirectToLogin () {
  window.location.replace(commonVars.REACT_APP_URL + '/login');
}

function playstoreRed () {
  window.location.replace('https://play.google.com/store/apps/details?id=com.muzeroapp');
}

function redirectToReg (pack, cycle) {
    if(pack && cycle) {
      window.location.replace(commonVars.REACT_APP_URL + `/register?planId=${pack}&paymentcycle=${cycle}`);
    } else {
      window.location.replace(commonVars.REACT_APP_URL + '/register');
    }
}

function toEdumaticamarketplace () {
  window.location.href = commonVars.REACT_APP_URL + '/edumaticamarketplace/tutorsearch'
  //window.history.pushState("", "", commonVars.REACT_APP_URL + '/edumaticamarketplace/tutorsearch')
  //window.location.replace(commonVars.REACT_APP_URL + '/edumaticamarketplace/tutorsearch');
}

function redirectTC () {
    window.open(commonVars.REACT_APP_URL + '/terms-conditions');
}

function redirectPP () {
    window.open(commonVars.REACT_APP_URL + '/privacy-policy');
}

function redirectDC () {
  window.open(commonVars.REACT_APP_URL + '/web-disclaimer');
}

function viewBlog(id, type) {
    window.location.href = `resources-details.html?id=${id}&type=${type}`
}

function catchus(platform) {
    if(platform === 'twitter') {
        const url = `https://twitter.com/Edumatica_io` 
        window.open(url)
    } else if(platform === 'fb') {
        const url = `https://www.facebook.com/edumatica.io`
        window.open(url)
    } else if(platform === 'linkedin') {
        const url = `https://www.linkedin.com/company/edumatica-edu/`
        window.open(url)
    } else if(platform === 'ig') {
        const url = `https://www.instagram.com/edumatica.io/`
        window.open(url)
    } else if(platform === 'yt') {
        const url = `https://www.youtube.com/channel/UCfelp3dtxARx-nu6oIKAGVw`
        window.open(url)
    }
}

function fetchContentsBlog(current_page) {
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

        paginatedItems.filter(list => list.type === 'Blog').forEach(content => {
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
            htmlArr.push(`<a style="cursor: pointer" onclick="fetchContentsBlog(${index+1})">${index + 1}</a>`)
          }
        }

        htmlArr.push(
          `
            </div>
            </div>
          `
        )
        const html = htmlArr.join('')
        document.querySelector("#selectedcontentblog").innerHTML = html
      } else {
        throw Error("ERROR")
      }
    }).catch(error => {
      console.log(error)
    })
  }

  function fetchFeePack() {
    const BASEURL = commonVars.API_URL
    fetch(BASEURL + '/finance/edumacpackage?avtivePackagesOnly=false').then(res => {
      if(!res.ok) {
        throw Error("ERROR")
      }
      return res.json();
    }).then(data => {
      if(data.code === 0) {
        let activePackages = sortpack([...data.data].slice(0, 3));

        const emptyArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell spCell"></td>`)
        const empty = emptyArr.join('')

        const stuArr = activePackages.map(list => {
          const stucolval = (list.studentCount === -1) ? '&#10004;' : `Upto ${list.studentCount} Students`
          return (
            
            `<td class="tbborder tbTestcenter paddingtablecell">${stucolval}</td>`
          )
        })
        const stu = stuArr.join('')

        const batArr = activePackages.map(list => {
          const batcolval = (list.batchCount === -1) ? '&#10004;' : `Upto ${list.batchCount} Batches`
          return (
            `<td class="tbborder tbTestcenter paddingtablecell">${batcolval}</td>`
          )
        })
        const bat = batArr.join('')

        const livClassArr = activePackages.map(list => {
          const livquocolval = (list.liveClassQuota === -1) ? '&#10004;' : `${list.liveClassQuota} hrs`
          return (
            `<td class="tbborder tbTestcenter paddingtablecell">${livquocolval}</td>`
          )
        })
        const livClass = livClassArr.join('')

        const classRecArr = activePackages.map(list => {
          const recquocolval = (list.recordingQuota === -1) ? '&#10004;' : `${list.recordingQuota} hrs`
          return (
            `<td class="tbborder tbTestcenter paddingtablecell">${recquocolval}</td>`
          )
        })
        const classRec = classRecArr.join('')

        const livClassRecArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const livClassRec = livClassRecArr.join('')

        const vidSharArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const vidShar = vidSharArr.join('')

        const noteSharArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const noteShar = noteSharArr.join('')

        const unlimArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const unlim = unlimArr.join('')

        const qbArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const qb = qbArr.join('')

        const autAttArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const autAtt = autAttArr.join('')

        const feeCollArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const feeColl = feeCollArr.join('')

        // const tranFeeArr = activePackages.map(list => list.convenienceFee ? `<td class="tbborder paddingtablecell">${list.convenienceFee} %</td>` : `<td class="tbborder paddingtablecell">-</td>`)
        // const tranFee = tranFeeArr.join('')

        const chatSArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const chatS = chatSArr.join('')

        const emailSArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const emailS = emailSArr.join('')

        const callSArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell">&#10004;</td>`)
        const callS = callSArr.join('')

        const unlimDashArr = activePackages.map(list => `<td class="tbborder tbTestcenter paddingtablecell spCell">&#10004;</td>`)
        const unlimDash = unlimDashArr.join('')

        let html = `
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="tbborder mainHeadT centertable"><span class="tablespan">Features</span></th>
                <th class="tbborder tbTestcenter mainHeadT">100 % Free</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="tbborder paddingtablecell spCell centertable"><span class="tablespan">Smart Collaboration Platform</span></td>
                <td class="tbborder paddingtablecell spCell setwidth"></td>
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Add Unlimited Students</span></td>
                ${stu}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Unlimited Batches</span></td>
                ${bat}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Live Classes</span></td>
                ${livClass}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Class Recording</span></td>
                ${classRec}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell spCell centertable"><span class="tablespan">Smart Document Sharing</span></td>
                ${empty}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Live Class Recording</span></td>
                ${livClassRec}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Video Sharing</span></td>
                ${vidShar}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Notes Sharing</span></td>
                ${noteShar}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell spCell centertable"><span class="tablespan">Smart Assessment Management</span></td>
                ${empty}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Unlimited Assessment</span></td>
                ${unlim}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Inbuilt Question Bank</span><br/><p class="subtextPay">Standard VI-XII & JEE Available*<p></td>
                ${qb}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell spCell centertable"><span class="tablespan">Smart Attendance Management</span></td>
                ${empty}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Automatic Attendance Capture</span></td>
                ${autAtt}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell spCell centertable"><span class="tablespan">Smart Payment Management</span></td>
                ${empty}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Unlimited Fees Collection</span></td>
                ${feeColl}
              </tr>
              
              <tr>
                <td class="tbborder paddingtablecell spCell centertable"><span class="tablespan">Edumatica Support</span></td>
                ${empty}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Chat Support</span></td>
                ${chatS}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Email Support</span></td>
                ${emailS}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell centertable"><span class="tablespan">Call Support</span></td>
                ${callS}
              </tr>
              <tr>
                <td class="tbborder paddingtablecell spCell centertable"><span class="tablespan">Unlimited Dashboard Analytics</span></td>
                ${unlimDash}
              </tr>
            </tbody>
          </table>
        `

        document.querySelector("#paypack").innerHTML = html
      } else {
        throw Error("ERROR")
      }
    }).catch(error => {
      console.log(error)
    })
  }
  
  fetchContentsBlog(1);
  fetchFeePack();
