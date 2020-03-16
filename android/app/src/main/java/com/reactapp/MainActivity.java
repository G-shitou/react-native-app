package com.reactapp;

import com.facebook.react.ReactActivity;
// 安卓启动屏
import android.os.Bundle;
import org.devio.rn.splashscreen.SplashScreen;
// 友盟引入
import com.umeng.socialize.UMShareAPI;
import com.reactapp.umeng.ShareModule;
import android.content.Intent;

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "reactApp";
  }
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    // 启动屏
    SplashScreen.show(this);
    super.onCreate(savedInstanceState);
    // 友盟分享 初始化
    ShareModule.initSocialSDK(this);
  }
  @Override
  public void onActivityResult(int requestCode,int resultCode, Intent data) {
    super.onActivityResult(requestCode, resultCode, data);
    UMShareAPI.get(this).onActivityResult(requestCode, resultCode, data);
  }
}
