/**
   * 判断是否为微信/微信小程序/支付宝
   * @export
   * @returns
   */
  export function isWeChatMiniApp() {
    const ua = window.navigator.userAgent.toLowerCase();
    // if(userAgent.match(/Alipay/i)=="alipay"){
    return new Promise((resolve) => {
      if (ua.indexOf('micromessenger') == -1) {
        console.log("不在微信或者小程序中")
        resolve(false);
      } else {
        wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            console.log("在小程序中")
            resolve(true);
          } else {//在微信中
            console.log("在微信中")
            resolve(false);
          }
        });
      }
    });
  }