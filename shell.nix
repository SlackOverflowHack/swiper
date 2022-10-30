{ pkgs ? import <nixpkgs> {config.android_sdk.accept_license = true;} }:

# ANDROID_HOME="/home/timo/Android/Sdk" npx expo start --android

(pkgs.buildFHSUserEnv {
  name = "android-sdk-env";
  targetPkgs = pkgs: (with pkgs;
    [
      androidenv.androidPkgs_9_0.androidsdk
      glibc
      xorg.libX11
      libpulseaudio
      openssl
      zip
      lzop
      zlib
      ncurses5
      libGL
      nss
      procps
      m4
      gperf
      libxml2
      nettools
      nspr
      expat
      xorg.libXcomposite
      xorg.libXcursor
      xorg.libXdamage
      xorg.libXext
      xorg.libXfixes
      xorg.libXi
      xorg.libXrender
      xorg.libXtst
      alsa-lib
      vulkan-tools
      libuuid
    ]);
  runScript = "bash";
}).env
