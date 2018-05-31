import React, { Component } from "react";
import Background from "../Background";

class Rule extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
    }
    render() {
        return (
            <div className="page">
                {this.props.appContext.currentCountry == "tw" ? (
                    <div className="page__section">
                        <div className="page__heading">
                            <p className="page__title">Acer Day Play Music Together 活動辦法</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__text">參與者必須細閱及遵守以下條款及細則。您的參與將代表您已閱讀及同意各項條款細則及以下履行個人資料保護法義務告知書。</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">集點活動期間：</p>
                            <p className="page__text">台灣時間 2018/7/21 00:00~2018/8/9 23:59止</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">兌點期間：</p>
                            <p className="page__text">台灣時間 2018/8/3 00:00~2018/8/9 23:59止</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">活動玩法：</p>
                            <ul className="page__ul">
                                <li className="page__li">初次參與活動者，請先登入您的SNS(facebook、twitter請擇一登入)帳號，並同意授權本活動擷取您的個人資料(照片、名稱、電子信箱……等)，並選擇所在國家、創建個人角色，及選擇招呼語，一旦選定後即不可再更動。</li>
                                <li className="page__li">集點活動期間依照活動任務單元(主要任務與限定任務)，完成任務，共計14項任務關卡，每關任務獲得活動點數依各項任務列表為準，按照任務指示完成任務後，即可獲得該任務贈送之點數；任務可重複挑戰。</li>
                                <li className="page__li">活動期間，所有交友互動的回覆，及任務完成時，系統將定時顯示通知於活動通知欄內。</li>
                                <li className="page__li">活動參與者於本活動網站所有進行之創作紀錄、兌換序號及其他個人活動相關資料，可分別至本活動網站之「創作記錄」、活動通知欄及「我要兌點」查詢，系統將定時進行活動參與者資訊更新，活動參與者請以本活動站所顯示之資料訊息為準。</li>
                            </ul>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">兌點說明：</p>
                            <p className="page__text">兌點活動於台灣時間2018/8/3 00:00~2018/8/9 23:59止，活動參與者可於兌點期間於本活動網站之「我要兌點」進行各項好康組合兌換。</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">好康兌點：</p>
                            <p className="page__text page__text--highlight">旅遊大獎</p>
                            <p className="page__text">獎項內容：往返台灣來回機加酒四天三夜與Acer專屬獨家行程</p>
                            <p className="page__text">兌換方式：依點數數量可兌換最多兩次抽獎機會</p>
                            <p className="page__text">點數使用：35,000點/乙次</p>
                            <p className="page__text">得獎公布時間：2018/9/30公布於Acer Day活動網站</p>
                            <br />
                            <p className="page__text page__text--highlight">Spotify一年會員</p>
                            <p className="page__text">獎項內容：Spotify一年份會員</p>
                            <p className="page__text">兌獎方式：依點數數量可兌換多次抽獎機會，兌換越多次，中獎機會越高</p>
                            <p className="page__text">點數使用；10,000/乙次</p>
                            <p className="page__text">得獎公布時間：2018/9/30公布於Acer Day活動網站</p>
                            <br />
                            <p className="page__text page__text--highlight">Acer產品</p>
                            <p className="page__text">獎項內容：請參考下列機種</p>
                            <p className="page__text">兌獎方式：依點數數量可兌換多次抽獎機會，兌換越多次，中獎機會越高</p>
                            <p className="page__text">點數使用：23,000點</p>
                            <p className="page__text">得獎公布時間：2018/9/30公布於Acer Day活動網站</p>
                            <br />
                            <p className="page__text page__text--highlight">產品保固</p>
                            <p className="page__text">獎項內容：Acer筆電保固延長一年</p>
                            <p className="page__text">兌獎方式：依點數數量可兌換多次抽獎機會，兌換越多次，中獎機會越高</p>
                            <p className="page__text">點數使用：15,000點</p>
                            <p className="page__text">得獎公布時間：2018/9/30公布於Acer Day活動網站</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">領獎注意事項：</p>
                            <ul className="page__ul">
                                <li className="page__li">抽獎名單公布後，活動小組將會以e-mail或電話聯繫得獎者，如因資料填寫不全或不確實以致無法連絡者，視同放棄中獎資格。</li>
                                <li className="page__li">中獎者需下載列印通知e-mail內領獎憑證並填妥資料，附上身分證正反面影本，於2018/8/25前郵寄掛號回函領獎憑證至XXXX。所有獎品將在主辦單位確認中獎人符合資格後統一寄出。</li>
                                <li className="page__li">領獎憑證不符合活動規定、逾期寄回、發票遺失視同自動放棄中獎權益，資格不符或逾期視為棄權，個人聯繫資料有誤，導致無法聯繫中獎通知，視同放棄得獎資格，主辦單位將不另行通知，也不予保留或遞補。</li>
                                <li className="page__li">依財政部國稅局各類所得扣繳率標準 (民國98年01月16 日 修正)規定：競技競賽機會中獎獎金或給付超過新臺幣 1,000 元，須列單申報該管稽徵機關。故舉凡中獎金額或獎項年度累計總額超過NT$1,000元整，主辦單位將依稅法規定於年度開立扣繳憑單予活動中獎者，屆時中獎人可憑扣繳憑單之扣繳稅額抵減個人綜合所得稅。另，中獎金額或獎項價值超過NT$20,000，依法應扣繳10%稅金(非中華民國境內居住之個人，依法扣繳20%稅金)；得獎者需依法繳納稅額，若未繳交稅金視同放棄得獎資格。</li>
                                <li className="page__li">依中華民國稅法規定，得獎人需依規定填寫並繳交相關收據，若中獎者不願意提供資料，則視同放棄中獎資格，不另行通知。</li>
                            </ul>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">活動注意事項：</p>
                            <p className="page__text">本活動係以主辦單位界定之個別國家或地區為活動舉辦範圍，以各參加者登記之地址決定參加者是否有參加該國家或地區活動的資格。活動所提供之獎品係因各國家或地區有所差異(款式、型號、規格等)，主辦單位就其他國家或地區提供之獎品不另說明。各國家或地區所提供獎品之保固僅限於該國家或地區範圍，而不及於其他國家或地區。</p>
                            <p className="page__text">參加者於參加本活動之同時，即同意本活動注意事項之規範。如有違反本活動注意事項之行為者，主辦單位得以取消其參加或得獎資格之權利，並對於任何破壞本活動之人身攻擊、謾罵、轉貼、違反公序良俗或是與活動本身無關等內容將一律刪除。若您為未滿20歲之未成年人，應於您的法定代理人(或監護人)閱讀、瞭解並同意本活動之所有內容，方得參加本活動。當您參加本活動時，即視為您的法定代理人(或監護人)已閱讀、瞭解並同意接受本活動之所有內容規範。</p>
                            <ul className="page__ul">
                                <li className="page__li">若參加者以電腦程式或其他違反活動公平性之方式或有違法之行為，一經主辦單位發現或經第三人檢舉，不符合活動辦法，或有違反活動注意事項之行為，可得取消其參加或得獎資格，如因此所生之損害，主辦單位得向參加者請求損害賠償。</li>
                                <li className="page__li">主辦單位(宏碁股份有限公司)及合作廠商(台灣電通股份有限公司)為進行本活動之目的，將本活動間接蒐集參加者之SNS(facebook、twitter)帳號、姓名、照片、電子郵件等得以直接或間接方式識別參加者之資料，並進行處理、利用（包括國際傳輸）。主辦單位及合作廠商依個人資料保護法有告知參加者之義務，詳細告知內容請參閱以下履行個人資料保護法義務告知書。</li>
                                <li className="page__li">活動因故無法進行時，主辦單位有權決定取消、終止、修改或停止活動。</li>
                                <li className="page__li">任何因電腦、網路等技術問題而引致參加者所遞交的資料有遲延、遺失、錯誤、無法辨識等情況，主辦單位概不負責。</li>
                                <li className="page__li">主辦單位保有活動辦法變更權，擁有保留修改活動內容之權利，修改訊息將於活動網頁公佈，不另行通知。</li>
                                <li className="page__li">主辦單位及合作廠商員工均不得參與本活動。</li>
                                <li className="page__li">主辦單位可隨時對上述之條款及細則作出修改而毋須另行通知，如有任何爭議，主辦單位保留活動之最終決定權。</li>
                            </ul>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">履行個人資料保護法義務告知書 </p>
                            <p className="page__text">主辦單位及合作廠商於下列所述之範圍內，將自所有SNS(facebook、twitter)蒐集、處理、利用、傳輸（包括國際傳輸及司法管轄領域間傳輸）參加者之個人資料，茲依據個人資料保護法第9條、第19條及第21條等規定，向您告知下列事項：</p>
                            <ul className="page__ul">
                                <li className="page__li">蒐集之目的：進行「Acer Day – Play Music Together」（下稱「本活動」）。根據法務部「個人資料保護法之特定目的及個人資料之類別」（下稱「本規則」）之規定，包括下列特定目的：(040)行銷、(069)契約、類似契約或其他法律關係事務、(090)消費者、客戶管理與服務，以及(170)觀光行政、觀光旅遊業、旅館業、旅行業、觀光遊樂業及民宿經營管理業務。</li>
                                <li className="page__li">個人資料之類別：SNS(facebook、twitter)帳號、姓名、照片、電子郵件、郵寄地址及手機號碼等得以直接或間接方式識別參加者之資料（依據本規則之規定，屬於「(C001)辨識個人者」之個人資料）。</li>
                                <li className="page__li">利用之期間：本活動期間。主辦單位及合作廠商於本活動結束時將參加者之個人資料全數銷毀，不另作他用。但取得中獎者個別之書面同意者，不在此限。</li>
                                <li className="page__li">利用之地區：台、澎、金、馬</li>
                                <li className="page__li">利用之對象：主辦單位及其關係企業之代表人、董監事、員工、代理人、專業顧問或與主辦單位及其關係企業因業務需要訂有契約關係或業務往來之機構。</li>
                                <li className="page__li">利用之方式：符合個人資料保護相關法令以自動化機器或其他非自動化之利用方式之蒐集、處理、利用及國際傳輸（包括但不限於使用電子文件、紙本或其他合於當時科學技術之適當方式等）。 </li>
                                <li className="page__li">
                                    <p className="page__text">參加者行使權利之方式：</p>
                                    <p className="page__text">於本活動期間，參加者就主辦單位保有之個人資料，得向主辦單位要求行使下列權利：</p>
                                    <ol className="page__ol">
                                        <li className="page__li">查詢、請求閱覽或請求製給複製本，而主辦單位依法得酌收必要成本費用。</li>
                                        <li className="page__li">求補充或更正，惟依法參加者應為適當之釋明。</li>
                                        <li className="page__li">請求停止蒐集、處理、利用或國際傳輸及請求刪除，惟依法主辦單位因執行業務所必須者，得不依參加者請求為之。</li>
                                    </ol>
                                </li>
                                <li className="page__li">參加者得自由選擇是否提供個人資料，如不提供則無法參與本活動。</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    ""
                )}

                {this.props.appContext.currentCountry == "sg" ? (
                    <div className="page__section">
                        <div className="page__heading">
                            <p className="page__title">Acer Day - Play Music Together</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__text">Participants must carefully read and follow the below terms and conditions. By participating in this event, it is deemed that you have read and agreed to the terms and conditions and the following Statement of Personal Information Protection Obligation.</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">Point collection period:</p>
                            <p className="page__text">7/21/2018 00:00 - 8/9/2018 23:59 Taiwan time</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">Point exchange period: </p>
                            <p className="page__text">8/3/2018 00:00 - 8/9/2018 23:59 Taiwan time</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">How to play:</p>
                            <ul className="page__ul">
                                <li className="page__li">For first time participants, please log into your SNS (Facebook or Twitter) account and authorize this event to access your personal information (picture, name, email, etc.). Participants should also choose the country they are located in, create their personal character, and select a greeting. Once the selection is made, it cannot be changed.</li>
                                <li className="page__li">Complete the event task units (a total of 14 general and special tasks) during the point collection period. The points received for completing each task is based on the task list. After completing each task as directed, the participant will receive the designated points. Tasks can be repeatedly challenged.</li>
                                <li className="page__li">All friend interactions and replies and task completions conducted during the event period will be regularly shown in the system’s event notifications.</li>
                                <li className="page__li">The event participant’s creation record, exchange number, and other personal event related information conducted on this event website can be found in this website’s “Creation Record,” Event Notification, and “I Want to Exchange.” The system will regularly update event participants’ information. Event participants should use the information displayed on this event website as the standard.</li>
                            </ul>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">Exchange Instructions:</p>
                            <p className="page__text">The point exchange event will be held from 8/3/2018 00:00 to 8/9/2018 23:59 (Taiwan time). Participants can exchange their points for various goodies on this site during the point exchange period in the “I Want to Exchange” section.</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">Goodies Point Exchange:</p>
                            <p className="page__text page__text--highlight">Travel Award</p>
                            <p className="page__text">Award content: round trip tickets to Taiwan, four day/three night hotel stay, and exclusive trip to Acer </p>
                            <p className="page__text">Exchange method: points can be exchanged for a maximum of two drawing opportunities </p>
                            <p className="page__text">Point usage: 35,000 points/one time</p>
                            <p className="page__text">Award announcement time: will be announced on 9/30/2018 on the Acer Day event website</p>
                            <br />
                            <p className="page__text page__text--highlight">One Year Spotify Membership</p>
                            <p className="page__text">Award content: one year Spotify membership </p>
                            <p className="page__text">Exchange method: points can be exchanged for multiple drawing opportunities; the more times you exchange, the higher your chances of winning</p>
                            <p className="page__text">Point usage: 10,000 points/one time</p>
                            <p className="page__text">Award announcement: will be announced on 9/30/2018 on the Acer Day event website</p>
                            <br />
                            <p className="page__text page__text--highlight">Acer Products</p>
                            <p className="page__text">Award content: please reference the following models </p>
                            <p className="page__text">Exchange method: points can be exchanged for multiple drawing opportunities; the more times you exchange, the higher your chances of winning </p>
                            <p className="page__text">Point usage: 23,000 points</p>
                            <p className="page__text">Award announcement: will be announced on 9/30/2018 on the Acer Day event website</p>
                            <br />
                            <p className="page__text page__text--highlight">Product Warranty</p>
                            <p className="page__text">Award content: one year extension of Acer laptop warranty </p>
                            <p className="page__text">Exchange method: points can be exchanged for multiple drawing opportunities; the more times you exchange, the higher your chances of winning </p>
                            <p className="page__text">Point usage: 15,000 points </p>
                            <p className="page__text">Award announcement: will be announced on 9/30/2018 on the Acer Day event website</p>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">Prize Draw Terms and Conditions:</p>
                            <ul className="page__ul">
                                <li className="page__li">The promotional team will contact the winner by e-mail or by phone after the results of the draw are announced. If the winner cannot be contacted due to incomplete or inaccurate information provided, the prize will be deemed waived.</li>
                                <li className="page__li">The winners need to download and print the prize claim voucher sent along with the e-mail notice. The winners must fill out and return the voucher to xxx with photocopies of both sides of their ID card enclosed before August 25, 2018, by registered post. All prizes will be sent once the event coordinator verifies the winners’ qualification.</li>
                                <li className="page__li">If the prize claim voucher fails to meet the event requirements, arrives late, or if the receipt is missing, the winner will forfeit the prize draw. If the entrant does not meet the eligibility or the deadline, the entrant will be deemed withdrawn. If we cannot reach the winner due to incorrect contact information, the winner will forfeit their prize claim. The event coordinator will not give further notice, retain the prize, or put the winner on a waitlist.</li>
                                <li className="page__li">According to the Standards of Withholding Rates for Various Incomes (amended January 16, 2009) prescribed by the National Taxation Bureau, Ministry of Finance: Any competition or lottery prize or payment with a value exceeding NT$1,000 has to be filed with the competent tax authority. Therefore, if the accumulated prize amount in any year is greater than NT$1,000, the event coordinator will send the annual tax return slip to the winner as required by tax laws, and the winner may file the deduction of personal income tax accordingly. In addition, if the prize or prize value exceeds NT$20,000, a 10% tax deduction (or 20%, if the winner is not an individual residing in ROC) will be withheld. The winner will be deemed to waive the prize claim if the tax obligation is not fulfilled.</li>
                                <li className="page__li">Subject to ROC tax laws, the winner should fill out the information form as required and present relevant receipts. Otherwise, the winner will forfeit the prize claim and will receive no further notice.</li>
                            </ul>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">Event Terms and Conditions:</p>
                            <p className="page__text">This event will be held in countries and regions defined by the event coordinator. The address (country or region) entered by the entrant will be used to determine the entrant’s event qualification. Awards given for the event may be different (type, model, and specification) depending on the country or the region the entrant is located in. The event coordinator will not otherwise describe awards provided for other countries or regions. Warranty provided for awards given in a country or region is only limited to that country or region and is not valid in other countries and regions.</p>
                            <p className="page__text">By entering the prize draw, the entrant agrees to these event terms and conditions. The event coordinator is entitled to cancel the entrant’s right to join or receive the prize draw if the entrant violates these terms and conditions, and remove any post that contains any personal fallacy, abusive language, repost, contents violating public order and good morals, or anything not related to the event itself or threatens the event. If you are a minor younger than 20 years old, you must have your legal representative (or guardian) read, understand and agree to every matter of this event to enter the prize draw. By entering the event, it will be deemed that your legal representative (or guardian) has read, understood and agreed to the terms and conditions of this event.</p>
                            <ul className="page__ul">
                                <li className="page__li">If the event coordinator discovers, or any third party reports, that the entrant violates the fairness of the event through computer programs or any other manner, commits any illegal conduct, or commits any conduct against the event terms and conditions, the event coordinator may deem that the entrant fails to meet the event rules and may cancel the entrant’s eligibility for participation or the prize draw. The entrant will also be held liable for any damage incurred by the event coordinator thereof.</li>
                                <li className="page__li">For the purpose of this event, the event coordinator (Acer Inc.) and collaborative partner (Dentsu Taiwan Inc.) may identify, process and use (including international transmission) the entrant’s information, directly or indirectly through the SNS (Facebook or Twitter) account, name, photo, and email collected indirectly in this event. The event coordinator and the collaborative partner have the obligation to inform the entrants according to the Personal Information Protection Act. Please read the Statement of Personal Information Protection Obligation as below for more details.</li>
                                <li className="page__li">The event coordinator may cancel, terminate, modify, or stop the event if it is unable to be carried out for any reason.</li>
                                <li className="page__li">The event coordinator is not responsible for any delay, loss, error, illegibility of the materials submitted by the entrant due to computer, internet or technical problems.</li>
                                <li className="page__li">The event coordinator reserves the right to change event rules and modify the event itself. Information of changes will be published on the event website without giving further notice.</li>
                                <li className="page__li">No employee of the event coordinator and the collaboration partner is allowed to participate in this event.</li>
                                <li className="page__li">The event coordinator may revise the foregoing terms and conditions at any time without notice. In the event of any dispute, the event coordinator shall have the final discretion whether to continue with the event or not.</li>
                            </ul>
                        </div>
                        <div className="page__row page__row--widthL">
                            <p className="page__subTitle">Statement of Personal Information Protection Obligation</p>
                            <p className="page__text">The event coordinator and the collaboration partner will collect, process, use and transmit (including international and cross-jurisdictional transmission) the entrant’s personal information from all SNS (Facebook and Twitter) accounts within the scope specified below. According to Articles 9, 19, and 21, we hereby inform you of the following:</p>
                            <ul className="page__ul">
                                <li className="page__li">Purpose of collection: To hold the event “Acer Day-Play Music Together” (hereinafter referred to as the “Event”). According to the “Specific purpose and the classification of personal information of the Personal Information Protection Act” published by the Ministry of Justice (hereinafter referred to as the “Rules”), the specific purposes include: (040) Marketing, (069) Contract, contract-like or other legal matters, (090) Consumer, Customer Management and Service, and (170) Tourism administration, tourism and hotel industry, hotel industry, travel agencies, tourist amusement industry and guest-house management business.</li>
                                <li className="page__li">Classifications of Personal Information: SNS (Facebook and Twitter) account, name, photo, email, mailing address and mobile phone number, and other information that directly or indirectly identifies the entrant (personal information classified as (C001) Type for identifying individuals under the Rules).</li>
                                <li className="page__li">Duration of use: The duration of this Event. The event coordinator and the collaboration partner will destroy and not use the personal information of all entrants for any other purposes after the end of this Event except for the information associated with the prize winners subject to their written consent.</li>
                                <li className="page__li">Areas used: Taiwan, Penghu, Kinmen, and Mazhu</li>
                                <li className="page__li">Parties using the information: The representatives, directors and supervisors, employees, agents, professional consultants of the event coordinator and the collaboration partner, or any entity that has entered into a contract for business, or other business transactions with the event coordinator and the collaboration partner.</li>
                                <li className="page__li">Manner of use: Collect, process, use and transmit internationally through automation devices, or other non-automation manners in conformity to the laws of personal information protection (including, but not limited to, electronic documents, physical papers, or other appropriate methods available to the then-current scientific technology).</li>
                                <li className="page__li">
                                    <p className="page__text">Exercise of entrants’ rights:</p>
                                    <p className="page__text">During the Event, the entrant may exercise the following rights and send requests to the event coordinator to:</p>
                                    <ol className="page__ol">
                                        <li className="page__li">inquire, view or receive copies of their personal information, subject to a possible cost charged by the event coordinator as necessary under the law.</li>
                                        <li className="page__li">supplement or modify their personal information, provided that the entrant has provided proper cause.</li>
                                        <li className="page__li">cease the collection, process, use or international transmission, and erase their personal information, provided, however, that the event coordinator may refuse the entrant’s request if it is deemed necessary by law for the performance of business.</li>
                                    </ol>
                                </li>
                                <li className="page__li">The provision of personal information is solely at the entrant’s discretion. Failure to provide such information may result in ineligibility to participate in this Event.</li>
                            </ul>
                        </div>
                    </div>
                ) : (
                    ""
                )}

                <Background />
            </div>
        );
    }
}

export default Rule;
