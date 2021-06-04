/*
ALGORITHM
1. Inject button to add fren to list
2. Button puts important details into URL
    /?playerName=ABC&playerPicId=19283746
    use location.search
3. counter page extracts details
4. add fren details to page AND local storage
 */

function getList(){
    friendsLen = parseInt(document.getElementsByClassName("see_through_block p_r m_15 m_t_5 p_10 t_l f_0").length);

    for (let i = 0; i < friendsLen; i++){
        playerName = String(document.getElementsByClassName("name_block t_l f_l f_14 underline")[i].innerText);
        playerPicURL =  String(document.getElementsByClassName("w_112 f_l")[i].src);
        playerPic = playerPicURL.slice(48);
        
        information = "https://127.0.0.1:5500/?playerName=" + playerName + "&playerPic=" + playerPic;
        document.getElementsByClassName("friend_comment_block f_12")[i].innerHTML = "<a href='" + information +"'>Add to list</a>";
    }
    return;
}

getList();




