import React from "react";
import notificationTextKeyToID from "./notificationTextKeyToID.js";
import { toast } from "react-toastify";
import axios from "axios";
import { FormattedHTMLMessage } from "react-intl";

var checkToast = function() {
    axios({
        method: "GET",
        url: "/api/users/me/notifications?unread=1",
        responseType: "json"
    }).then(response => {
        console.log("checkToast");
        console.log(response);
        var resp = response.data;
        if (resp.code == 200) {
            var data = [];
            resp.data.map(el => {
                toast(<FormattedHTMLMessage id={`intl.notification.sentence${notificationTextKeyToID(el.TextKey)}`} values={el.Values} />);
            });
        }
    });
};

export default checkToast;
