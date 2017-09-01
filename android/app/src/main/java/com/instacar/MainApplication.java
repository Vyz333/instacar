package com.instacar;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.airbnb.android.react.maps.MapsPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.oblador.keychain.KeychainPackage;
import org.wonday.orientation.OrientationPackage;
import com.cboy.rn.splashscreen.SplashScreenReactPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.oblador.vectoricons.VectorIconsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RNFetchBlobPackage(),
            new MapsPackage(),
            new LinearGradientPackage(),
            new KeychainPackage(),
            new OrientationPackage(),
            new SplashScreenReactPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativePushNotificationPackage(),
            new ReactNativeI18n(),
            new VectorIconsPackage(),
            new RNDeviceInfo()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
