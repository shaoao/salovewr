//消息
function showmsg(msg,type){
  msgstr = '<div class="msg-wrap"><div class="msg"><span class="ico">'
  if(type == "error"){
    msgstr = msgstr + "!"
  }else{
    msgstr = msgstr + "√"
  }
  msgstr = msgstr + '</span><span class="txt">'+msg+'</span></div></div>'
  $("body").append(msgstr)
  setTimeout(function(){
    $(".msg-wrap").remove()
  },1500)
}
$(function(){
  $(".icon-heart").click(function(){
      $(".form-login").toggleClass('none');
      return false;
  })
  $('.event').click(function(e){
    $(this).addClass('show').siblings().removeClass('show');
    $('.input-title input',this).removeAttr('disabled');
    $(this).siblings().find('.input-title input').attr('disabled','disabled')
  })
  $('.state-checkbox').change(function(e){
    $(this).siblings('.state-ico').toggleClass('checked')
  })
  $('.input-file').change(function(e){
    var tempform = $(this).parents('form')[0];
    tempform.action = "/app/upload.asp";
    tempform.method = "post";
    tempform.target = "uploadFrame";
    tempform.enctype = "multipart/form-data";
    tempform.submit();
    return false
  })
  // login
  $('.btn-login').click(function(){
    var $this = $(this),
        $form = $this.parents('form');
    var params = $form.serialize();
    $.post(
      '/?login',
      params,
      function(data){
        console.log(data)
        if(data.ret == 0){
          showmsg(data.msg,'info')
          setInterval(function(){
            location.reload();
          },2000);
        } else {
          showmsg(data.msg,'error')
        }
      },'json'
    )
    return false;
  })
  // message
  $('.btn-message').click(function(){
    var $this = $(this),
        $form = $this.parents('form');
    var params = $form.serialize();
    $.post(
      '/?message',
      params,
      function(data){
        console.log(data)
        if(data.ret == 0){
          showmsg(data.msg,'info')
          setInterval(function(){
            location.reload();
          },2000);
        } else {
          showmsg(data.msg,'error')
        }
      },'json'
    )
    return false;
  })
  // message delete
  $(".btn-msgdelete").click(function(e){
    var $this = $(this),
        id = $this.data("id");
    if (confirm("确认删除该留言？")){
      $.post(
        "/?msgdelete",
        'id=' + id,
        function(data){
          if(data.ret == 0){
            showmsg(data.msg,'info');
            $this.parents('li').remove();
          } else {
            showmsg(data.msg,'error');
          }
        },"json"
      )
    }
    return false;
  })
  // new
  $('.btn-create').click(function(){
    var $this = $(this),
        $form = $this.parents('form');
    var params = $form.serialize();
    $.post(
      '/?create',
      params,
      function(data){
        console.log(data)
        if(data.ret == 0){
          showmsg(data.msg,'info')
        } else {
          showmsg(data.msg,'error')
        }
      },'json'
    )
    return false;
  })
  // update
  $(".btn-save").click(function(e){
    e.stopPropagation();
    var $this = $(this),
        $form = $this.parents('form');
    var params = $form.serialize();
    //console.log(params);
    $.post(
      "/?update",
      params,
      function(data){
          console.log(data)
          if(data.ret == 0){
            showmsg(data.msg,'info')
          } else {
            showmsg(data.msg,'error')
          }
      },"json"
    )
    setInterval(function(){
      
    },2000);
    return false;
  })
  $(".btn-del").click(function(e){
    e.stopPropagation();
    var $this = $(this),
        id = $this.data("id");
    if (confirm("确认删除该事件？")){
      $.post(
        "/?delete",
        'id=' + id,
        function(data){
          if(data.ret == 0){
            showmsg(data.msg,'info');
            $this.parents('.event').remove();
          } else {
            showmsg(data.msg,'error');
          }
        },"json"
      )
    }
    return false;
  })
})