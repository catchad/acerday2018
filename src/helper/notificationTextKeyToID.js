var notificationTextKeyToID = function(textKey) {
    switch (textKey) {
        case "NewUserRegistration": /// 首次註冊
            return 1;
            break;
        case "OldUserComeback": /// 舊朋友回娘家
            return 2;
            break;
        case "RythmGame": /// 玩節奏遊戲
            return 8;
            break;
        case "RythmGameComplete": /// 完成共同創作
            return 10;
            break;
        case "RythmGameShare": /// 分享共同創作
            return 11;
            break;
        case "MakeInvitation": /// 打招呼（不限打招呼次數。每天完成第１次打招呼，可獲 1000）
            return 6;
            break;
        case "MakeInvitation8Days": /// 限時8天內交友（註冊日起連續8天進站與一位朋友打招呼，可獲5,000）
            return 7;
            break;
        case "AcceptInvitation": /// 接受邀請
            return 9;
            break;
        case "Login": /// 每天登錄網站（每天第１次進站，可獲800）
            return 3;
            break;
        case "Login3Days": /// 連續登錄網站3天（註冊日起，連續登錄網站３天及８天，各可獲得2,000）
            return 4;
            break;
        case "Login8Days": /// 連續登錄網站8天（註冊日起，連續登錄網站３天及８天，各可獲得2,000）
            return 5;
            break;
        case "VideoChallenge1": /// 看影片找答案 1
            return 12;
            break;
        case "VideoChallenge2": /// 看影片找答案 2
            return 13;
            break;
        case "VideoChallenge3": /// 商品相關問題
            return 14;
            break;
    }
};

export default notificationTextKeyToID;
