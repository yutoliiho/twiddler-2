$(document).ready(function() {

  // ------------------- BUTTON BINDINGS ------------------- //

  $('.logo').bind('click', function() {
    stream = streams.home;
    displayingUserTweets = false;
    displayRecentHandler();
    window.scrollTo(0,0);
  });

  $('.home-wrapper').bind('click', function() {
    stream = streams.home;
    displayingUserTweets = false;
    displayRecentHandler();
    window.scrollTo(0,0);
  });

  // ------------------- HELPER FUNCTIONS ------------------- //

  function displayTweets(start, end) {

    $main.html('');

    for (var i = start; i >= end; i--) {

      var $tweet = $('<div class="item"></div>');
      var tweet = stream[i]; 

      var $profileWrapper = $('<span class=profile-wrapper></span>');

      var $thumbnail = $('<img class=thumbnail>');
      var picName = tweet.user;
      var source = 'images/profilePics/' + picName + '.png';
      $thumbnail.attr('id', picName);
      $thumbnail.attr('src', source);
      $thumbnail.attr('alt', picName);

      var $nameWrapper = $('<span class="name-wrapper"><span>)');

      var $username = $('<a class="username"></a>');
      $username.text(getUsername(tweet.user));

      var $handle = $('<span class="handle"></span>');
      $handle.text('@' + tweet.user);

      $nameWrapper.append($username);
      $nameWrapper.append($handle);

      $profileWrapper.append($thumbnail);
      $profileWrapper.append($nameWrapper);

      var $timestamp = $('<span class="timestamp"></span>');
      $timestamp.html(' &middot ' + timeSinceTweet(tweet.created_at));

      var $content = $('<p class="content"></p>');
      $content.text(tweet.message);

      var $actionsWrapper = $('<span class="actions-wrapper"></span>');

      var $row1 = $('<span class="action-row" id="row1"></span>');
      var $row2 = $('<span class="action-row" id="row2"></span>');

      var $commentWrapper = $('<span class="tooltip"></span>');
      var $comment = $('<img class="action" id="comment" src="images/icons/comment.png" alt="comment">');
      var $commentTooltip = $('<p class="tooltip-text" id="comment-text">comment</p>');
      $commentWrapper.append($comment);
      $commentWrapper.append($commentTooltip);

      var $rebarkWrapper = $('<span class="tooltip"></span>');
      var $rebark = $('<img class="action" id="rebark" src="images/icons/rebark.png" alt="rebark">');
      var $rebarkTooltip = $('<p class="tooltip-text" id="rebark-text">rebark</p>');
      $rebarkWrapper.append($rebark);
      $rebarkWrapper.append($rebarkTooltip);

      var $likeWrapper = $('<span class="tooltip"></span>');
      var $like = $('<img class="action" id="like" src="images/icons/like.png" alt="like">');
      var $likeTooltip = $('<p class="tooltip-text" id="like-text">like</p>');
      $likeWrapper.append($like);
      $likeWrapper.append($likeTooltip);

      var $directMessageWrapper = $('<span class="tooltip"></span>');
      var $directMessage = $('<img class="action" id="directMessage" src="images/icons/directMessage.png" alt="directMessage">');
      var $directMessageTooltip = $('<p class="tooltip-text" id="directMessage-text">direct message</p>');
      $directMessageWrapper.append($directMessage);
      $directMessageWrapper.append($directMessageTooltip);

      $row1.append($commentWrapper);
      $row1.append($rebarkWrapper);
      $row2.append($likeWrapper);
      $row2.append($directMessageWrapper);
      $actionsWrapper.append($row1);
      $actionsWrapper.append($row2);

      $profileWrapper.bind('click', function() {
        // SOLUTION TO tweet.user access PROBLEM 
        var userInfo = $(this).context.innerText; 
        var username = getHandleOnly(userInfo);
        userToDisplay = username;
        stream = streams.users[userToDisplay];
        streamLength = stream.length;
        var start = streamLength - 1;
        var end = Math.max(start - displayLength + 1, 0);
        displayingUserTweets = true;
        displayTweets(start, end);
        window.scrollTo(0,0);
      });

      $tweet.append($profileWrapper);
      $tweet.append($timestamp); 
      $tweet.append($content);
      $tweet.append($actionsWrapper); 
      $main.append($tweet);

    }

  }

  function displaySidebars() {

    function displaySidebar1() {

      // --------------- YOUR PROFILE SECTION --------------- //

      var $coverPhoto = $('<img id="cover-photo" src="images/other/cover-photo.png" alt="cover-photo">');

      var $thumbnail = $('<img class="thumbnail" id="your-profile-thumbnail" src="images/profilePics/drhack.png" alt="your-profile-thumbnail">');

      var $username = $('<a class="username">Dr. Hack</a>');
      var $handle = $('<span class="handle">@drhack</span>');

      var $profileWrapper = $('<span id="inner-profile-wrapper"></span>');
      $profileWrapper.append($thumbnail);
      $profileWrapper.append($username);
      $profileWrapper.append($handle);

      var $barks = $('<span class="info-section">barks</span>');
      var $numBarks = $('<p class="info-number">123</p>')
      var $barksWrapper = $('<span class="info-section-wrapper" id="barks-wrapper"></span>');
      $barksWrapper.append($barks);
      $barksWrapper.append($numBarks);

      var $following = $('<span class="info-section">following</span>');
      var $numFollowing = $('<p class="info-number">187</p>');
      var $followingWrapper = $('<span class="info-section-wrapper" id="following-wrapper"></span>');
      $followingWrapper.append($following);
      $followingWrapper.append($numFollowing);

      var $followers = $('<span class="info-section">followers</span>');
      var $numFollowers = $('<p class="info-number">12k</p>');
      var $followersWrapper = $('<span class="info-section-wrapper" id="followers-wrapper"></span>');
      $followersWrapper.append($followers);
      $followersWrapper.append($numFollowers);

      var $infoWrapper = $('<div id="info-wrapper"></div>');
      $infoWrapper.append($barksWrapper);
      $infoWrapper.append($followingWrapper);
      $infoWrapper.append($followersWrapper);

      var $yourProfileWrapper = $('<div id="your-profile-wrapper"></div>');
      $yourProfileWrapper.append($coverPhoto);
      $yourProfileWrapper.append($profileWrapper);
      $yourProfileWrapper.append($infoWrapper);

      // --------------- YOUR TRENDS SECTION --------------- //

      var $trendHeader = $('<h1 class="sidebar-header" id="trend-header">trends for you</h1>');

      var $topic1Header = $('<h2 class="topic-header">Hack Reactor</h2>');
      var $topic1Number = $('<p class="topic-number">20.4k barks</p>');
      var $topic1Wrapper = $('<div class="topic-wrapper"></div>');
      $topic1Wrapper.append($topic1Header);
      $topic1Wrapper.append($topic1Number);

      var $topic2Header = $('<h2 class="topic-header">Carnegie Mellon</h2>');
      var $topic2Number = $('<p class="topic-number">15.8k barks</p>');
      var $topic2Wrapper = $('<div class="topic-wrapper"></div>');
      $topic2Wrapper.append($topic2Header);
      $topic2Wrapper.append($topic2Number);

      var $topic3Header = $('<h2 class="topic-header">#BreakingBad</h2>');
      var $topic3Number = $('<p class="topic-number">11.3k barks</p>');
      var $topic3Wrapper = $('<div class="topic-wrapper"></div>');
      $topic3Wrapper.append($topic3Header);
      $topic3Wrapper.append($topic3Number);

      var $topic4Header = $('<h2 class="topic-header">San Francisco</h2>');
      var $topic4Number = $('<p class="topic-number">9,424 barks</p>');
      var $topic4Wrapper = $('<div class="topic-wrapper"></div>');
      $topic4Wrapper.append($topic4Header);
      $topic4Wrapper.append($topic4Number);

      var $topic5Header = $('<h2 class="topic-header">Vipassana Meditation</h2>');
      var $topic5Number = $('<p class="topic-number">8,073 barks</p>');
      var $topic5Wrapper = $('<div class="topic-wrapper"></div>');
      $topic5Wrapper.append($topic5Header);
      $topic5Wrapper.append($topic5Number);

      var $topic6Header = $('<h2 class="topic-header">#BurningMan</h2>');
      var $topic6Number = $('<p class="topic-number">6,193 barks</p>');
      var $topic6Wrapper = $('<div class="topic-wrapper"></div>');
      $topic6Wrapper.append($topic6Header);
      $topic6Wrapper.append($topic6Number);

      var $topic7Header = $('<h2 class="topic-header">Fortnite</h2>');
      var $topic7Number = $('<p class="topic-number">2,684 barks</p>');
      var $topic7Wrapper = $('<div class="topic-wrapper"></div>');
      $topic7Wrapper.append($topic7Header);
      $topic7Wrapper.append($topic7Number);

      var $topic8Header = $('<h2 class="topic-header">#AlteredStates</h2>');
      var $topic8Number = $('<p class="topic-number">1,967 barks</p>');
      var $topic8Wrapper = $('<div class="topic-wrapper"></div>');
      $topic8Wrapper.append($topic8Header);
      $topic8Wrapper.append($topic8Number);

      var $yourTrendsWrapper = $('<div id="your-trends-wrapper"></div>');
      $yourTrendsWrapper.append($trendHeader);
      $yourTrendsWrapper.append($topic1Wrapper);
      $yourTrendsWrapper.append($topic2Wrapper);
      $yourTrendsWrapper.append($topic3Wrapper);
      $yourTrendsWrapper.append($topic4Wrapper);
      $yourTrendsWrapper.append($topic5Wrapper);
      $yourTrendsWrapper.append($topic6Wrapper);
      $yourTrendsWrapper.append($topic7Wrapper);
      $yourTrendsWrapper.append($topic8Wrapper);

      // --------------- ADD TO SIDEBAR 1 --------------- //

      var $sidebar1 = $('<section id="sidebar1"></section>');
      $sidebar1.append($yourProfileWrapper);
      $sidebar1.append($yourTrendsWrapper);

      $('.main-container').prepend($sidebar1);

    }

    function displaySidebar2() {

      // --------------- WHO TO FOLLOW SECTION --------------- //

      var $whoToFollowHeader = $('<h1 class="sidebar-header">who to follow</h1>');

      var $person1Username = $('<span class="follow-username">Chef Jiro</span>');
      var $person1Handle = $('<span class="follow-handle">@topsushi</span>');
      var $person1Thumbnail = $('<img class="follow-thumbnail" src="images/profilePics/topsushi.png" alt="topsushi">');
      var $person1ProfileWrapper = $('<div class="follow-profile-wrapper"></div>');
      var $person1FollowButton = $('<btn class="follow-button" id="follow-button-1">follow</btn>');            
      var $person1Wrapper = $('<div class="grid-person-wrapper" id="person-1-wrapper"></div>');
      $person1ProfileWrapper.append($person1Username);
      $person1ProfileWrapper.append($person1Handle);
      $person1ProfileWrapper.append($person1Thumbnail);
      $person1Wrapper.append($person1ProfileWrapper);
      $person1Wrapper.append($person1FollowButton);

      var $person2Username = $('<span class="follow-username">Angela Reynolds</span>');
      var $person2Handle = $('<span class="follow-handle">@aerobicangela</span>');
      var $person2Thumbnail = $('<img class="follow-thumbnail" src="images/profilePics/aerobicangela.png" alt="aerobicangela">');
      var $person2ProfileWrapper = $('<div class="follow-profile-wrapper"></div>');
      var $person2FollowButton = $('<btn class="follow-button" id="follow-button-2">follow</btn>');
      var $person2Wrapper = $('<div class="grid-person-wrapper" id="person-2-wrapper"></div>');
      $person2ProfileWrapper.append($person2Username);
      $person2ProfileWrapper.append($person2Handle);
      $person2ProfileWrapper.append($person2Thumbnail);
      $person2Wrapper.append($person2ProfileWrapper);
      $person2Wrapper.append($person2FollowButton);

      var $person3Username = $('<span class="follow-username">Brutus Thorgard</span>');
      var $person3Handle = $('<span class="follow-handle">@notnotbrutus</span>');
      var $person3Thumbnail = $('<img class="follow-thumbnail" src="images/profilePics/notnotbrutus.png" alt="notnotbrutus">');
      var $person3ProfileWrapper = $('<div class="follow-profile-wrapper"></div>');
      var $person3FollowButton = $('<btn class="follow-button" id="follow-button-3">follow</btn>');
      var $person3Wrapper = $('<div class="grid-person-wrapper" id="person-3-wrapper"></div>');
      $person3ProfileWrapper.append($person3Username);
      $person3ProfileWrapper.append($person3Handle);
      $person3ProfileWrapper.append($person3Thumbnail);
      $person3Wrapper.append($person3ProfileWrapper);
      $person3Wrapper.append($person3FollowButton);

      var $person4Username = $('<span class="follow-username">Sarah Koberg</span>');
      var $person4Handle = $('<span class="follow-handle">@santashelper</span>');
      var $person4Thumbnail = $('<img class="follow-thumbnail" src="images/profilePics/santashelper.png" alt="santashelper">');
      var $person4ProfileWrapper = $('<div class="follow-profile-wrapper"></div>');
      var $person4FollowButton = $('<btn class="follow-button" id="follow-button-4">follow</btn>');
      var $person4Wrapper = $('<div class="grid-person-wrapper" id="person-4-wrapper"></div>');
      $person4ProfileWrapper.append($person4Username);
      $person4ProfileWrapper.append($person4Handle);
      $person4ProfileWrapper.append($person4Thumbnail);
      $person4Wrapper.append($person4ProfileWrapper);
      $person4Wrapper.append($person4FollowButton);

      var $person5Username = $('<span class="follow-username">Joe Smith</span>');
      var $person5Handle = $('<span class="follow-handle">@averagejoe89</span>');
      var $person5Thumbnail = $('<img class="follow-thumbnail" src="images/profilePics/averagejoe89.png" alt="averagejoe89">');
      var $person5ProfileWrapper = $('<div class="follow-profile-wrapper"></div>');
      var $person5FollowButton = $('<btn class="follow-button" id="follow-button-5">follow</btn>');
      var $person5Wrapper = $('<div class="grid-person-wrapper" id="person-5-wrapper"></div>');
      $person5ProfileWrapper.append($person5Username);
      $person5ProfileWrapper.append($person5Handle);
      $person5ProfileWrapper.append($person5Thumbnail);
      $person5Wrapper.append($person5ProfileWrapper);
      $person5Wrapper.append($person5FollowButton);

      var $whoToFollowGrid = $('<div id="who-to-follow-grid"></div>');
      $whoToFollowGrid.append($person1Wrapper);
      $whoToFollowGrid.append($person2Wrapper);
      $whoToFollowGrid.append($person3Wrapper);
      $whoToFollowGrid.append($person4Wrapper);
      $whoToFollowGrid.append($person5Wrapper);

      var $findPeopleIcon = $('<img id="find-people-icon" src="images/icons/findpeople.png" alt="find-people-icon">');
      var $findPeopleTooltip = $('<p class="tooltip-text" id="find-people-tooltip">find people you know</p>');
      var $findPeopleWrapper = $('<span class="tooltip" id="find-people-wrapper"></span>');
      $findPeopleWrapper.append($findPeopleIcon);
      $findPeopleWrapper.append($findPeopleTooltip);
      var $findPeopleText = $('<span id="find-people-text">find people you know</span>');

      var $whoToFollowWrapper = $('<div id="who-to-follow-wrapper"></div>');
      $whoToFollowWrapper.append($whoToFollowHeader);
      $whoToFollowWrapper.append($whoToFollowGrid);
      $whoToFollowWrapper.append($findPeopleWrapper);
      $whoToFollowWrapper.append($findPeopleText);

      // --------------- CREDITS AND ADVERTISE SECTION --------------- //

      var $copyright = $('<p class="credits" id="copyright"></p>');
      $copyright.html('&copy 2018 barker');

      var $about = $('<a class="credits link">about</a>');
      var $helpCenter = $('<a class="credits link">help center</a>');
      var $terms = $('<a class="credits link">terms</a>');
      var $privacyPolicy = $('<a class="credits link">privacy policy</a>');
      var $cookies = $('<a class="credits link">cookies</a>');
      var $adsInfo = $('<a class="credits link">ads info</a>');
      var $brand = $('<a class="credits link">brand</a>');
      var $blog = $('<a class="credits link">blog</a>');
      var $status = $('<a class="credits link">status</a>');
      var $apps = $('<a class="credits link">apps</a>');
      var $jobs = $('<a class="credits link">jobs</a>');
      var $marketing = $('<a class="credits link">marketing</a>');
      var $businesses = $('<a class="credits link">businesses</a>');
      var $developers = $('<a class="credits link">developers</a>');

      var $creditsWrapper = $('<div id="credits-wrapper"></div>');
      $creditsWrapper.append($about);
      $creditsWrapper.append($terms);
      $creditsWrapper.append($privacyPolicy);
      $creditsWrapper.append($cookies);
      $creditsWrapper.append($('<br>'));
      $creditsWrapper.append($adsInfo);
      $creditsWrapper.append($brand);
      $creditsWrapper.append($blog);
      $creditsWrapper.append($status);
      $creditsWrapper.append($apps);
      $creditsWrapper.append($jobs);
      $creditsWrapper.append($('<br>'));
      $creditsWrapper.append($marketing);
      $creditsWrapper.append($businesses);
      $creditsWrapper.append($developers);

      var $advertiseIcon = $('<img id="advertise-icon" src="images/icons/advertise.png" alt="advertise-icon">');
      var $advertiseTooltip = $('<p class="tooltip-text" id="advertise-tooltip">advertise with barker</p>');
      var $advertiseWrapper = $('<span class="tooltip" id="advertise-wrapper"></span>');
      $advertiseWrapper.append($advertiseIcon);
      $advertiseWrapper.append($advertiseTooltip);
      var $advertiseText = $('<span id="advertise-text">advertise with barker</span>');

      var $creditsAdvertiseWrapper = $('<div id="credits-advertise-wrapper"></div>');
      $creditsAdvertiseWrapper.append($copyright);
      $creditsAdvertiseWrapper.append($creditsWrapper);
      $creditsAdvertiseWrapper.append($advertiseWrapper);
      $creditsAdvertiseWrapper.append($advertiseText);

      // --------------- ADD TO SIDEBAR 2 --------------- //

      var $sidebar2 = $('<section id="sidebar2"></section>');
      $sidebar2.append($whoToFollowWrapper);
      $sidebar2.append($creditsAdvertiseWrapper);

      $('.main-container').append($sidebar2);

    }

    displaySidebar1();
    displaySidebar2();

  }

  function timeSinceTweet(createdTime) {

    var secondsAgo = Math.floor((Date.now() - createdTime) / 1000);
    var singularPluralSeconds;
    var result;

    if (secondsAgo === 1) {
      singularPluralSeconds = 'second';
    } else {
      singularPluralSeconds = 'seconds';
    }

    // convert to minutes if necessary
    if (secondsAgo >= 60) {
      var minutesAgo = Math.trunc(secondsAgo / 60);
      var secondsRemaining = secondsAgo % 60;
      var singularPluralMinutes;
      if (minutesAgo === 1) {
        singularPluralMinutes = 'minute';
      } else {
        singularPluralMinutes = 'minutes';
      }
      var singularPluralSeconds;
      if (secondsRemaining === 1) {
        singularPluralSeconds = 'second';
      } else {
        singularPluralSeconds = 'seconds';
      }
    }

    if (secondsAgo < 60) {
      result = secondsAgo + 's';
    } else {
      result = minutesAgo + 'm ' + secondsRemaining + 's';
    }

    return result;

  }

  function updateRecentButton(newTweetsAvailable) {

    var singularPlural;
    if (newTweetsAvailable === 1) {
      singularPlural = 'bark';
    } else {
      singularPlural = 'barks';
    }

    var displayedNumber;
    if (newTweetsAvailable > 10) {
      displayedNumber = '10+';
    } else {
      displayedNumber = String(newTweetsAvailable);
    }

    $('#recent-button').html('&uarr;<br> see ' + displayedNumber + ' new ' + singularPlural);

    if (recentButtonActive) {
      $('#recent-button').css({'background-color': recentButtonActiveColor,
                               'color': '#595959',
                               'font-weight': '300'});
    } 

  }

  function displayOlderButton(oldTweetsAvailable) {

    var singularPlural;
    if (oldTweetsAvailable === 1) {
      singularPlural = 'bark';
    } else {
      singularPlural = 'barks';
    }

    var displayedNumber;
    if (oldTweetsAvailable > initialDisplayLength) {
      displayedNumber = initialDisplayLength;
    } else {
      displayedNumber = oldTweetsAvailable;
    }

    var $olderButton = $('<button id="displayOlder"></button>');
    $olderButton.text('show ' + displayedNumber + ' older ' + singularPlural);

    if (olderButtonDisplayed) {
      $('#displayOlder').remove();
      $olderButton.appendTo($main);
    } else {
      $olderButton.appendTo($main);
      olderButtonDisplayed = true;
    }

    $('#displayOlder').bind('click', function() {
      displayOlderHandler(displayedNumber);
    });

  }

  function displayRecentHandler() {
    recentButtonActive = false;
    $('#recent-button').text('0 new barks');
    $('#recent-button').css({'background-color': recentButtonColor,
                             'color': '#c5c5c5',
                             'font-weight': 'lighter'});
    displayLength = initialDisplayLength; // reset
    var start = streams.home.length - 1;
    var end = start - displayLength + 1;
    displayTweets(start, end);
    previousLength = streams.home.length;
    previousEnd = end;
  }

  function displayOlderHandler(available) {
    var end = previousEnd - available;
    displayLength += available;
    var start = end + displayLength - 1;
    displayTweets(start, end);
    previousEnd = end;
  }

  function getUsername(handle) {
    var username;
    switch(handle) {
      case 'shawndrost':
        username = 'Shawn Drost';
        break;
      case 'sharksforcheap':
        username = 'Sharks 4 Cheap';
        break;
      case 'mracus':
        username = 'Mr. Acus';
        break;
      case 'douglascalhoun':
        username = 'Douglas Calhoun';
        break;
    }
    return username;
  }

  function getHandleOnly(info) {
    var start = info.indexOf('@');
    return info.substring(start + 1);
  }

  // ------------------- INITIALIZE VARIABLES ------------------- //
  var $main = $('.tweet-container');
  var previousLength;
  var previousEnd;
  var displayingUserTweets = false;
  var userToDisplay = '';
  var recentButtonActive = false;
  var olderButtonDisplayed = false;
  var initialDisplayLength = 15;
  var autofillLength = initialDisplayLength;
  var displayLength = initialDisplayLength;
  var stream = streams.home;
  var streamLength = stream.length;
  var homeSidebar1Displayed = false;

  // get colors specified in main.css
  var style = getComputedStyle(document.body);
  var recentButtonColor = style.getPropertyValue('--recent-button-color');
  var recentButtonActiveColor = style.getPropertyValue('--recent-button-active-color');

  // ---------- DISPLAY INITIAL TWEETS AND SIDEBARS ---------- //
  displayTweets(streamLength - 1, 0);
  displaySidebars();

  // ------------------- TIMER ACTIONS ------------------- //
  setInterval(function() {

    if (displayingUserTweets) {
      stream = streams.users[userToDisplay];
    } else {
      stream = streams.home;
    }
    streamLength = stream.length;

    if (streamLength <= autofillLength) {

      // fill page until autofill number of tweets are displayed
      displayTweets(streamLength - 1, 0);
      previousLength = streamLength;
      displayLength = streamLength;

    } else { 

      // give user option to display more recent tweets
      var newTweetsAvailable = streamLength - previousLength;
      if (newTweetsAvailable > 0) {
        recentButtonActive = true;
        updateRecentButton (newTweetsAvailable);
      }
      
      // give user option to display up to displayLength older tweets at a time
      var oldTweetsAvailable = streamLength - newTweetsAvailable - displayLength;
      if (oldTweetsAvailable > 0) {
        if (!displayingUserTweets) {
          displayOlderButton(oldTweetsAvailable);
        }
      }

    }

  }, 500);

});
