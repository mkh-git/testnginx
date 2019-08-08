var gWndId = 0;
var nDirect=-1;
var nOper=-1;
var gXmlRecords;
var gRecordPath;
var bLogin = 0;


function init(){

//  switchTab(1);

    var obj = document.getElementById("DPSDK_OCX");
    gWndId = obj.DPSDK_CreateSmartWnd(0, 0, 100, 100);

    ButtonCreateWnd_onclick();

    //var obj = document.getElementById("DPSDK_OCX");
    //ShowCallRetInfo(obj.DPSDK_Login("172.7.123.123", 9000, "1", "1"), "登录");
    //ShowCallRetInfo(obj.DPSDK_AsyncLoadDGroupInfo(), "异步加载组织结构");
    //var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    //ShowCallRetInfo(obj.DPSDK_DirectRealplayByWndNo(gWndId, nWndNo, "1000001$1$0$0", 1, 1, 1), "直接实时播放");
    for(var i=1;i<=1;i++)
        obj.DPSDK_SetToolBtnVisible(i, false);//选中指定窗口
    obj.DPSDK_SetToolBtnVisible(7, false);
    obj.DPSDK_SetToolBtnVisible(9, false);
    obj.DPSDK_SetControlButtonShowMode(1, 0);
    obj.DPSDK_SetControlButtonShowMode(2, 0);
}

function ShowCallRetInfo(nRet, strInfo)
{
    //if (nRet != 0)
    //{
    //    var obj = document.getElementById("DPSDK_OCX");
    //    alert(strInfo + ": ErrorCode = "+obj.DPSDK_GetLastError());
    //}

    var str = "";
    if(nRet == 0)
    {
        str = strInfo + " 成功！";
    }
    else
    {
        str = strInfo + "失败！错误码：" + nRet;
    }
    document.getElementById("RetInfo").innerText = str;
}

function ButtonCreateWnd_onclick()
//设置主窗口个数
{
    var obj = document.getElementById("DPSDK_OCX");
    var nWndCount = 1;
    obj.DPSDK_SetWndCount(gWndId, nWndCount);
    obj.DPSDK_SetSelWnd(gWndId, 0);
}

/*function ButtonSetCustomizedWndCount_onclick()
//设置定制化窗口数量
{
    var obj = document.getElementById("DPSDK_OCX");
    var nWndCount = document.getElementById("textWndNum2").value;
    obj.DPSDK_SetCustomizedWndCount(gWndId, nWndCount);
    obj.DPSDK_SetSelWnd(gWndId, 0);
}*/

function ButtonLogin_onclick()
//登录
{
    var obj = document.getElementById("DPSDK_OCX");

    /*var szIp = document.getElementById("textIP").value;
    var nPort = document.getElementById("textPort").value;
    var szUsername = document.getElementById("textUser").value;
    var szPassword = document.getElementById("textPassword").value;*/

    // var szIp = '168.188.10.241';
    // var szIp = '171.110.97.9';
    var szIp = '124.227.0.87';
    var nPort = 9000;
    // var nPort = 8088;
    var szUsername = 'admin';
    var szPassword = 'gxqbtz1234';


    var nRet = obj.DPSDK_Login(szIp, nPort, szUsername, szPassword);
    ShowCallRetInfo(nRet, "登录");
    if(nRet == 0)
    {
        bLogin = 1;
    }
    //ButtonLoadDGroupInfo_onclick();
}

function ButtonLogout_onclick()
//登出
{
    var obj = document.getElementById("DPSDK_OCX");
    if( bLogin == 1)
    {
        ShowCallRetInfo(obj.DPSDK_Logout(), "登出");
        bLogin = 0;
    }
}


function ButtonStartRealplayByWndNo_onclick()
//窗口1播放视频（卡口）
{
    var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = '1000054$1$0$5';
    var nStreamType = 1;
    var nMediaType = 1;
    var nTransType = 1;

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, szCameraId, nStreamType, nMediaType, nTransType), "播放视频");
}

function ButtonStartRealplayByWndNo_onclick2()
//窗口2播放视频（港口）
{
    var obj = document.getElementById("DPSDK_OCX");
    var szCameraId = '1000071$1$0$23';
    var nStreamType = 1;
    var nMediaType = 1;
    var nTransType = 1;

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_StartRealplayByWndNo(gWndId, nWndNo, szCameraId, nStreamType, nMediaType, nTransType), "播放视频");
}

function ButtonStopRealplayByWndNo_onclick()
//停止播放视频
{
    var obj = document.getElementById("DPSDK_OCX");

    var nWndNo = obj.DPSDK_GetSelWnd(gWndId);
    ShowCallRetInfo(obj.DPSDK_StopRealplayByWndNo(gWndId, nWndNo), "停止播放视频");
}



