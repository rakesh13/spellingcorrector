var unirest = require("unirest");

var req = unirest("POST", "https://textanalysis.p.rapidapi.com/textblob-spelling-correction");

req.headers({
	"x-rapidapi-host": "textanalysis.p.rapidapi.com",
	"x-rapidapi-key": "944aafacafmsh2b4d2d0b2b0274dp11cfa4jsn7fca7c18a7b2",
	"content-type": "application/x-www-form-urlencoded",
	"useQueryString": true
});

req.form({
	"text": "This is speling cheker test"
});

req.end(function (res) {
	if (res.error) throw new Error(res.error);
    alert(res.body);
	console.log(res.body);
});

// Button click handler
const onAnalyzeButtonClick = () => {
  // Getting a textarea element with a comment
  const commentElement = document.getElementById('comment');
  // Getting comment text
  const commentText = commentElement.value.trim();

  // Handle empty comment
  if (!commentText) {
          return handleEmptyComment();
  }
  // Calling the API and passing the result with the displayResult as a callback function
  return analyzeComment(commentText, displayResult);
};

const analyzeComment = (comment, callback) => {
  // Creating an object to send to the server
  const data = {
          fieldvalues: comment
          , language: 'enUS'
  };
  // Encoding data for application/x-www-form-urlencoded content type
  const formattedData = Qs.stringify(data);
  // POST request to server
  axios.post(API_URL, formattedData, { headers: REQUEST_HEADERS })
          .then(response => {
            const data = response.data;
            alert(data);
            // Calling a callback function with data from the server
            callback(data)
          })
          .catch(error => console.error(error))
};

const handleEmptyComment = () => {
  const resultBlockElement = document.getElementById('main-result-block');
  resultBlockElement.classList.add('invisible');
  return alert('Your comment is empty =(');
};

const displayResult = result => {
  // Remove invisible class for main-result-block
  const resultBlockElement = document.getElementById('main-result-block');
  resultBlockElement.classList.remove('invisible');

  // Setting the color of the result text depending on the response label
  const label = result.label;
  const resultElement = document.getElementById('result');
  resultElement.setAttribute('class', label);
  let resultText = '';

  // Choosing the result text depending on response label
  switch (label) {
      case 'pos':
          resultText = 'Wow! Your comment is very positive!';
          break;
      case 'neg':
          resultText = 'Negative comment';
          break;
      case 'neutral':
          resultText = 'Simple comment';
          break;
      default:
          resultText = 'Hmmm, cant understand your comment';
  }

  // Setting the result text
  resultElement.textContent = resultText;
};