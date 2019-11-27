function display_post(){
  $("#topic").html("");
  var query = firebase.database().ref("posts");
  query.on("value", function (data){
    var title = data.val();
    var keys = Object.keys(title);
    for (var i = 1; i <= keys.length; i++) {
      var k = keys[keys.length - i];
      var post_title = title[k].title;
      var post_id = title[k].uid;
      //console.log(keys[0]);
      $("#topic").append(
      '<li ><a class = "showpost" id =' + k + '><b>' + post_title + '</b></a></li>'
      );
    };
    //console.log(keys[0]);
    //console.log($(this).attr('id'));
    $("a.showpost").click(function() {
      var id = $(this).attr('id');
      //console.log(title[id].reply);
      for (var i = 1; i <= keys.length; i++) {
        if (keys[keys.length - i] == id){
          post_detail(title[id].title, title[id].content, title[id].creator_id, title[id].like, title[id].dislike, id, title[id].reply);
        }
      };

    });
  });
}

function post_detail(title, content, id, like, dislike, post_id, reply_content){

  //console.log("test");
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
    '<button id="reply">Reply post</button>'+
    "<div id='enter_reply'></div>"+
    "<br>"+
    "<h3>Reply comment:</h3>" +
    "<div id='reply_comment'></div>"+
    "<br>"+
    '<button id="home">Home</button>'

  );


  if (reply_content == "undefined"){
    console.log("bad");
    $("#reply_comment").html("");
  }else {
    console.log("good");
    display_reply(reply_content);
  }


  function display_reply(reply_data){
    var reply_key = Object.keys(reply_data);
    for (var i = 0; i < reply_key.length; i++) {
      var k = reply_key[i];
      var reply_detail = reply_data[k].content;
      var reply_user = reply_data[k].reply_id;
      var reply_like_count = reply_data[k].like;
      var reply_dislike_count = reply_data[k].dislike;
      //console.log(keys[0]);
      $("#reply_comment").append(
        '<b>User:' + reply_user + ':</b>' +
        '<br>' +
        '<p>' + reply_detail +'</p>'+
        '<br>' +
        '<button class = "reply_reply"  id = ' + k + '>Reply comment</button>' +
        '&nbsp;&nbsp;&nbsp;' +
        '<b>Like: ' + reply_like_count + '</b>' +
        '<button class = "like_reply" id = ' + k + '>Like</button>' +
        '<b>Disike: ' + reply_dislike_count + '</b>' +
        '<button class = "dislike_reply" id = ' + k + '>Disike</button>' +
        '<br>' +
        '<div id = "reply_reply_text"><div>' +
        '<br>'
        );
      };

      $(".reply_reply").click(function(){
        var reply_id = $(this).attr('id');
        reply_reply_push(reply_data[reply_id].reply_id,post_id);
      });



      $(".like_reply").click(function(){
        var reply_id = $(this).attr('id');
        like = reply_data[reply_id].like ++;
        firebase.database().ref().child("posts").child(post_id).child("reply").child(reply_id).child("like").set(like);
        post_detail(title, content, id, like, dislike, post_id, reply_content);
      });


      $(".dislike_reply").click(function(){
        var reply_id = $(this).attr('id');
        dislike = reply_data[reply_id].dislike ++;
        firebase.database().ref().child("posts").child(post_id).child("reply").child(reply_id).child("dislike").set(dislike);
        post_detail(title, content, id, like, dislike, post_id, reply_content)
      });
    };


  $("#like_po").click(function(){
    var post_ref = firebase.database().ref().child("posts");
    //console.log(post_id);
    like ++;
    post_ref.child(post_id).child("like").set(like);
    //console.log("good");
    post_detail(title, content, id, like, dislike, post_id, reply_content);
  });

  $("#dislike_po").click(function(){
    var post_ref = firebase.database().ref().child("posts");
    //console.log(post_id);
    dislike ++;
    post_ref.child(post_id).child("dislike").set(dislike);
    //console.log("good");
    post_detail(title, content, id, like, dislike, post_id, reply_content);
  });

  $("#reply").click(function(){

    //console.log(post_id);
    enter_reply(post_id);
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
    //console.log(id);
    var post_ref = firebase.database().ref().child("posts");
    var newPostRef = post_ref.push();
    var like = 0;
    var dislike = 0;
    newPostRef.set({
      title: title,
      content: content,
      creator_id: id,
      like: like,
      dislike: dislike,
    });



    $('#topic').html("");
    display_post();
  });

  $('#cancel').click(function(){
    $('#topic').html("");
    display_post();
  });
}
