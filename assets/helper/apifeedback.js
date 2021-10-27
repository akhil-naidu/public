function fetchFeedback() {
  const BASEURL = commonVars.API_URL
  fetch(BASEURL + '/customerfeedback').then(res => {
    if(!res.ok) {
      throw Error("ERROR")
    }
    return res.json();
  }).then(data => {
    if(data.code === 0) {
      const feedbackscust = [...data.data];
      loadCarHtmlQ(feedbackscust);
    } else {
      throw Error("ERROR")
    }
  }).catch(error => {
    console.log(error)
  })
}

window.onload = function() {
  fetchFeedback();
};
