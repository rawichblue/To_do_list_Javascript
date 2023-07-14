const tweetInput = document.getElementById('tweetInput')
const postTweet = document.getElementById('postTweet')
const tweetsContainar = document.getElementById('tweetsContainar') 

postTweet.addEventListener('click', addTweet);
tweetsContainar.addEventListener('click', handleTweetActions);

//fetched textArea
function addTweet() {
    const content = tweetInput.value.trim();
    if (content === ''){
        return;
    }


    const newTweet = {
        id: Date.now(),
        content: content,
        likes: 0
    };

    saveTweet(newTweet);
    displayTweet(newTweet);
    tweetInput.value = '';
}

//show message
function displayTweet(newTweet) {
    const tweetElement = `
    	<div class="tweet" data-id="${newTweet.id}">
    		<p>${newTweet.content}</p>
        	<div class="tweet-actions">
            	<span class="like">Like (${newTweet.likes})</span>
            	<span class="delete">Delete</span>
        	</div>
    	</div >
    `;
    tweetsContainar.insertAdjacentHTML(`afterbegin`,tweetElement);
}


//push data in tweets & save in localStorage
function saveTweet(newTweet) {
    const tweets = getStoredTweets();
    tweets.push(newTweet);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


//Convert Str JSON to array (obj js)
function getStoredTweets() {
    const tweets = localStorage.getItem('tweets');
    return tweets ? JSON.parse(tweets) : [];
}


//function message
function handleTweetActions(event) {
    const target = event.target;
    const tweetElement = target.closest('.tweet');
    const id = parseInt(tweetElement.dataset.id);

    if(target.classList.contains('like')){
        updateTweetLikes(id);
    } else if (target.classList.contains('delete')){
        deleteTweet(id);
        tweetElement.remove();
    }
}


function updateTweetLikes(id){
    const tweets = getStoredTweets();
    const tweetIndex = tweets.findIndex(newTweet => newTweet.id === id);
    tweets [tweetIndex].likes += 1;

    const likeElement = document.querySelector(`[data-id="${id}"] .like`);
    likeElement.textContent = `Like (${tweets[tweetIndex].likes})`;

    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function deleteTweet(id){
    let tweets = getStoredTweets();
    tweets = tweets.filter(newTweet => newTweet.id != id);
    localStorage.setItem('tweets', JSON.stringify(tweets));
}


function loadTweets() {
    const tweets = getStoredTweets();
    for (const newTweet of tweets){
        displayTweet(newTweet)
    }
}

loadTweets();