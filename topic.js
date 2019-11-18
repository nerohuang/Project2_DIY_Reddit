function display_post(){
  var query = firebase.database().ref("posts");
  query.on("value", function (data){
    var title = data.val();
    var keys = Object.keys(title);
    for (var i = 1; i <= keys.length; i++) {
      var k = keys[keys.length - i];
      var post_title = title[k].title;
      //var post_id = title[k].uid;
      $("#topic").append(
      '<li id =' + k + '><a class = "showpost" ><b>' + post_title + '</b></a></li>'
      );
    }
    console.log(keys[0]);
    $(".showpost").on("click",test);
  });

  function test(){
    console.log("good");
  }
}


function new_topic(username){
  $("#topic").html(
    "<input type='text' placeholder='Enter title' id='new_post_title' required>"+
    "<br>"+
    "<textarea id='content' cols='50' rows='10'>Please enter here....</textarea>"+
    "<br>"+
    "<button id='submit_post'>Submit</button>"+
    "<button id='cancel'>Cacnel</button>"
  );

  $("#submit_post").click(function(){
    var title = $("#new_post_title").val();
    var content = $("#content").val();
    var uid = firebase.auth().currentUser.uid;
    var post_ref = firebase.database().ref().child("posts");
    var newPostRef = post_ref.push();
    newPostRef.set({
      title: title,
      content: content,
      creator_uid: uid
    });
    $('#topic').html("");
    display_post();
  });

  $('#cancel').click(function(){
    $('#topic').html("");
    display_post();
  });
}

display_post();
