function enter_reply(post_id){
  var post_ref = firebase.database().ref().child("posts").child(post_id);
  console.log(post_id);

  //title, content, id, like, dislike, post_id, reply_content
  var post_title;
  var post_content;
  var post_author_id;
  var post_like;
  var post_dislike;
  var post_reply;
  post_ref.on("value", function (data){
    //console.log(data.val().title);
    var post_details = data.val();
    post_title = post_details.title;
    post_content = post_details.content;
    post_author_id = post_details.creator_id;
    post_like = post_details.like;
    post_dislike = post_details.dislike;
    post_reply = post_details.reply;
  });

  $("#enter_reply").html("");
  $("#enter_reply").html(
    "<textarea id='reply_content' cols='50' rows='10'>Please enter here....</textarea>"+
    "<br>"+
    "<button id='submit_reply'>Submit</button>"+
    "<button id='cancel'>Cacnel</button>"
  );

  $("#cancel").click(function(){
    $("#enter_reply").html("");
  });

  $("#submit_reply").click(function(){
    //console.log(post_id);
    var reply_content = $("#reply_content").val();
    var id = firebase.auth().currentUser.email;
    //console.log(post_id);
    var reply_ref = post_ref.child("reply");
    //console.log(post_id);
    var newPostRef = reply_ref.push();
    console.log(post_ref);
    newPostRef.set({
      content: reply_content,
      reply_id: id,
      like: 0,
      dislike: 0
    });

    $("#enter_reply").html("");

    console.log(post_like);
    //title, content, id, like, dislike, post_id, reply_content

    post_detail(post_title, post_content, post_author_id, post_like, post_dislike, post_id, post_reply);
  });
}
