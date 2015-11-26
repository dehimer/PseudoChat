window.PseudoChat = function (options) {
    // alert(JSON.stringify(options));
    var self = this;

    console.assert(options.target_element_id, 'target_element_id argument doesn\'t must be empty!');
    
    var styles = {
        // background_color: options.background_color?options.background_color:'#eee',
        elements_color: options.elements_color?options.elements_color:'#00B6B0',
        text_color: options.text_color?options.text_color:'black',
        border_color: options.border_color?options.border_color:'#ccc',
        border_size: options.border_size?options.border_size:'1'
    }

    var nexttoleft = false;

    var gen_new_message = function (login, message, avatar)
    {   
        // console .log(users_params[dialog_messages[0].num].name+':'+login);
        var toleft = (users_params[dialog_messages[0].num].name === login || login === options.youname);
        nexttoleft = !toleft;

        var text_color = styles.text_color;

        var markup = '';

        markup += '<div style="text-align:'+(toleft?'left':'right')+';padding-right:10px;margin-top:10px;">';
            markup += '<div class="loginimgname" style="font-size:12px;color:#888;">'

                if(toleft)
                {
                    markup += '<div style="display:inline-block;vertical-align:top; background-color:#aaa;width:50px;height:50px;border-radius:50%;overflow:hidden;text-align:center;">'
                        if(avatar)
                        {
                            markup += '<img src="'+avatar+'" style="max-width:100%;max-height:100%;margin:0px auto;"/>'
                        }
                    markup += '</div>'
                }

                markup += '<div style="display:inline-block;vertical-align:top;padding-top:13px;padding-left:5px;padding-right:5px;">'
                    markup += '<i>'+login+'</i>';
                markup += '</div>'

                if(!toleft)
                {
                    markup += '<div style="display:inline-block;vertical-align:top; background-color:#aaa;width:50px;height:50px;border-radius:50%;overflow:hidden;text-align:center;">'
                        if(avatar)
                        {
                            markup += '<img src="'+avatar+'" style="max-width:100%;max-height:100%;margin:0px auto;"/>'
                        }
                    markup += '</div>'
                }

            markup += '</div>'
            markup += '<div style="font-size:20px;margin-top:10px;">'
                markup += message;
            markup += '</div>'
        markup += '</div>'

        return markup;
    }

    var users_params = options.users_params;
    var dialog_messages = options.dialog_messages;
    var dialog_messages_markup = '';

    var count_to_show = parseInt(dialog_messages.length*0.3);

    for(var i=0;i<count_to_show;i++)
    {
        var login = users_params[dialog_messages[i].num].name;
        var avatar = users_params[dialog_messages[i].num].avatar;

        dialog_messages_markup += gen_new_message(login, dialog_messages[i].message, avatar);
    }

    // var target = options.target_element_id;

    var target_el = document.getElementById(options.target_element_id);
    var target_el_width = target_el.offsetWidth;



    var markup = '';

    markup += '<div style="box-sizing:border-box; border-radius:10px;border:'+styles.border_size+'px solid '+styles.border_color+';background-color:white;width:100%;height:100%;padding:5px;font-family: Geneva, Arial, Helvetica, sans-serif;color:'+styles.text_color+';">'

        if(options.chat_name)
        {
            markup += '<div style="width:'+(target_el_width-35)+'px;margin:0px auto;padding:5px 0px;;">'
                markup += '<div style="color:'+styles.elements_color+';font-size:25px;">'
                    markup += options.chat_name;
                markup += '</div>'

                markup += '<div style="height:0px;border:1px solid #eee;width:100%;margin-top:10px;"></div>'
            markup += '</div>'
        }

        markup += '<div class="dialog_box" style="box-sizing:border-box;width:100%;height:300px;background-color:white;padding:5px;border-radius:5px;overflow-x:hidden;overflow-y:scrollable;">'
            markup += dialog_messages_markup;
        markup += '</div>'

        markup += '<div style="width:'+(target_el_width-35)+'px;margin:0px auto;padding:5px 0px;;">'
            markup += '<div style="height:0px;border:1px solid #eee;width:100%;margin-top:10px;"></div>'
        markup += '</div>'

        markup += '<div class="login_writemessage" style="box-sizing:border-box;width:100%;margin-top:5px;margin-bottom:5px;font-size:18px;">'
            // markup += '<div style="display:inline-block;vertical-align:top; box-sizing:border-box;width:100px;font-size:inherit;padding-top:1px;background-color:white; color:'+styles.text_color+';border-radius:5px;padding:0px 5px;padding-top:3px;">'+options.youname+'</div>'
            markup += '<input type="text" name="new_message" class="new_message" style="display:inline-block;vertical-align:top; box-sizing:border-box; border:'+styles.border_size+'px solid '+styles.border_color+'; width:'+(target_el_width-178)+'px; border:none;font-size:17px;border-width: 1px;color:inherit;margin-left:7px;outline: 0;font-size:17px;height:36px;" placeholder="введите текст..."/>'
            markup += '<input type="button" name="send_message" class="send_message" style="display:inline-block;vertical-align:top; box-sizing:border-box; width:'+(170-40)+'px; border-radius:10px;margin-left:10px;font-size:inherit;border: none;background-color:'+styles.elements_color+';color:white;padding:10px;font-size:15px;outline: 0;" value="ОТПРАВИТЬ"/>'
        markup += '</div>'

    markup += '</div>'


    target_el.style.padding = '5px';
    target_el.innerHTML = markup;

    var login_writemessage_el = target_el.getElementsByClassName('login_writemessage')[0];

    var dialog_box_el = target_el.getElementsByClassName('dialog_box')[0];

    dialog_box_el.scrollTop = dialog_box_el.scrollHeight;

    //добавление сообщений
    var new_message_el = login_writemessage_el.getElementsByClassName('new_message')[0];
    var send_message_el = login_writemessage_el.getElementsByClassName('send_message')[0];

    send_message_el.onclick = function () {


        dialog_box_el.innerHTML += gen_new_message(options.youname, new_message_el.value);
        new_message_el.value = '';

        dialog_box_el.scrollTop = dialog_box_el.scrollHeight;

        newmsgindicator = dialog_box_el.getElementsByClassName('newmsgindicator')[0];
    };

    new_message_el.onkeypress = function (e) {

        e = e || window.event;
        if (e.keyCode == 13)
        {
            send_message_el.click();
            return false;
        }
        return true;
    };

    var indicatormarkup = '';
    var indOpAr = [0, 0, 0.2, 0.7, 1];
    indicatormarkup += '<div class="roundind" style="display:inline-block;vertical-align:top; background-color:'+styles.elements_color+';border-radius:50%;width:10px;height:10px;margin:0px 1px;opacity:0.2;"></div>'
    indicatormarkup += '<div class="roundind" style="display:inline-block;vertical-align:top; background-color:'+styles.elements_color+';border-radius:50%;width:10px;height:10px;margin:0px 1px;opacity:0.7;"></div>'
    indicatormarkup += '<div class="roundind" style="display:inline-block;vertical-align:top; background-color:'+styles.elements_color+';border-radius:50%;width:10px;height:10px;margin:0px 1px;opacity:1;"></div>'

    var newmsgindicator;

    var indIntAnF = setInterval(function() {

        // console.log('do');

        if(newmsgindicator)
        {
            indOpAr.unshift(indOpAr.pop());
            // console.log(indOpAr);

            // console.log('dont'+newmsgindicator.getElementsByClassName('roundind').length)
            // console.log(newmsgindicator.getElementsByClassName('roundind')[0].style.opacity*1+0.3)
            newmsgindicator.getElementsByClassName('roundind')[0].style.opacity = indOpAr[0];
            newmsgindicator.getElementsByClassName('roundind')[1].style.opacity = indOpAr[1];
            newmsgindicator.getElementsByClassName('roundind')[2].style.opacity = indOpAr[2];

            // console.log(newmsgindicator.getElementsByClassName('roundind')[0].style.opacity)
            if(newmsgindicator.getElementsByClassName('roundind')[0].style.opacity<0)
            {
                newmsgindicator.getElementsByClassName('roundind')[0].style.opacity = 1;
            }
            if(newmsgindicator.getElementsByClassName('roundind')[1].style.opacity<0)
            {
                newmsgindicator.getElementsByClassName('roundind')[1].style.opacity = 1;
            }
            if(newmsgindicator.getElementsByClassName('roundind')[2].style.opacity<0)
            {
                newmsgindicator.getElementsByClassName('roundind')[2].style.opacity = 1;
            }
        }
    }, 200);

    var lastdelay = 1;

    var show_next_message = function () {

        newmsgindicator = dialog_box_el.getElementsByClassName('newmsgindicator')[0];

        if(newmsgindicator)
        {
            newmsgindicator.parentNode.removeChild(newmsgindicator);
        }
        
        var login = users_params[dialog_messages[count_to_show].num].name;
        var avatar = users_params[dialog_messages[count_to_show].num].avatar;
        dialog_box_el.innerHTML += gen_new_message(login, dialog_messages[count_to_show].message, avatar);

        dialog_box_el.scrollTop = dialog_box_el.scrollHeight;
        
        count_to_show += 1;

        if(dialog_messages[count_to_show])
        {
            // console.log(dialog_messages[count_to_show].message.length*200);
            //+Math.random(5000)

            setTimeout(function () {
                
                dialog_box_el.innerHTML += '<div class="newmsgindicator" style="box-sizing:border-box; width:100%;padding:15px;padding-top:35px;text-align:'+(nexttoleft?'left':'right')+';">'+indicatormarkup+'</div>';
                dialog_box_el.scrollTop = dialog_box_el.scrollHeight;
                newmsgindicator = dialog_box_el.getElementsByClassName('newmsgindicator')[0];
                lastdelay = 3500+dialog_messages[count_to_show].message.length*200+Math.random(2500);
                setTimeout(show_next_message, lastdelay);
            }, lastdelay+Math.random(10000))
        }
    }

    show_next_message();

};