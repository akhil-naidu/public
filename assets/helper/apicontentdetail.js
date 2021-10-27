function initDownloadEbook(uuid) {
  window.location.href = `resources-download.html?id=${uuid}`
}

function shresm(platform) {
  const shareUrl = encodeURIComponent(location.href)
  if(platform === 'twitter') {
    const url = `http://twitter.com/share?text=Hey Folks, Check out this content from Edumatica.&hashtags=Edumatica&url=${shareUrl}` 
    window.open(url)
  } else if(platform === 'fb') {
    const url = `https://www.facebook.com/sharer.php?u=${shareUrl}`
    window.open(url)
  } else if(platform === 'linkedin') {
    const url = `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=EdumaticaContent`
    window.open(url)
  }
}

function seeContent () {
  const params = new URLSearchParams(location.search);
  const id = params.get('id');
  const type = params.get('type');

  if(id && type) {
    const BASEURL = commonVars.API_URL
    fetch(BASEURL + '/homecontent').then(res => {
      if(!res.ok) {
        throw Error("ERROR")
      }
      return res.json();
    }).then(data => {
      if(data.code === 0) {
        if(type === 'blog') {
          data.data.filter(list => list._id === id).forEach(content => {
            fetch(BASEURL + `/homecontent/fetchDownloadUrlForHomeContent?uuid=${content.uuid}`).then(res => {
              if(!res.ok) {
                throw Error("ERROR")
              }
              return res.json();
            }).then(data => {
              if(data.code === 0) {
                setTimeout(() => {
                  const response = {
                    file: data.data,
                  };
                  const html = `
                    <embed type="text/html" class="fullHeight" src="${response.file}">
                  `
                  document.querySelector("#selectedcontent").innerHTML = html
                }, 100);
              } else {
                throw Error("ERROR")
              }
            }).catch(error => {
              console.log(error)
            })
          })
        } else if(type === 'ebook') {
          data.data.filter(list => list._id === id).forEach(content => {
            const brf = content.brief ? content.brief : '';
            const html = `
              <div class="container">
                <div class="row paddingBT">
                  <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                    <div class="medMarginTop center">
                      <h3>${content.title}</h3>
                      <p>${brf}</p>
                    </div>
                  </div>
                  <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 smallMarginTop">
                    <div class="center">
                      <button type="button" class="btn btn-primary dldBtn" onclick="initDownloadEbook('${content.uuid}')">Download</button>
                    </div>
                  </div>
                </div>
              </div>
            `

            document.querySelector("#selectedcontent").innerHTML = html
          })
        }
      } else {
        throw Error("ERROR")
      }
    }).catch(error => {
      console.log(error)
    })
  }
}

seeContent();