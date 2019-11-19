function display_post(){
  $("#topic").html("");
  var query = firebase.database().ref("posts");
  query.on("value", function (data){
    var title = data.val();
    var keys = Object.keys(title);
    for (var i = 1; i <= keys.length; i++) {
      var k = keys[keys.length - i];
      var post_title = title[k].title;
      //var post_id = title[k].uid;
      $("#topic").append(
      '<li ><a class = "showpost" id =' + k + '><b>' + post_title + '</b></a></li>'
      );
    };
    //console.log(keys[0]);
    //console.log($(this).attr('id'));
    $("a.showpost").click(function() {
      var id = $(this).attr('id');
      console.log(id);
      for (var i = 1; i <= keys.length; i++) {
        if (keys[keys.length - i] == id){
          post_detail(title[id].title, title[id].content, title[id].creator_id, title[id].like, title[id].dislike, id);
        }
      };

    });
  });
}

function post_detail(title, content, id, like, dislike, post_id){

  console.log()
  $("#topic").html(
    "<h1>" + title + "</h1><b>" +
    id +"</b>" +
    "<br>" +
    "<p>" + content + "</p>" +
    "<b> like: " + like + "</b>" +
    '<button id="like_po">Like</button>'+
    "<b> Dislike: " + dislike + "</b>" +
    '<button id="dislike_po">Dislike</button>'+
    "<br>"+
    '<button id="home">Home</button>'

  );

  $("#like_po").click(function(){
    var post_ref = firebase.database().ref().child("posts");
    console.log(post_id);
    like ++;
    post_ref.child(post_id).child("like").set(like);
    console.log("good");
    post_detail(title, content, id, like, dislike, post_id);
  });

  $("#dislike_po").click(function(){
    var post_ref = firebase.database().ref().child("posts");
    console.log(post_id);
    dislike ++;
    post_ref.child(post_id).child("dislike").set(dislike);
    console.log("good");
    post_detail(title, content, id, like, dislike, post_id);
  });

  $("#home").click(function(){
    display_post();
  });
};


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
    var id = firebase.auth().currentUser.email;
    console.log(id);
    var post_ref = firebase.database().ref().child("posts");
    var newPostRef = post_ref.push();
    var like = 0;
    var dislike = 0;
    newPostRef.set({
      title: title,
      content: content,
      creator_id: id,
      like: like,
      dislike: dislike
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
