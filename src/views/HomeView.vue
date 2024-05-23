<template>
  <div class="home">
    <button @click="addToHomeScreen">添加到桌面222</button>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data(){
    return{
      showInstallButton:false,//是否支持安装
      installPromptEvent:null
    }
  },
  created(){
    window.addEventListener('beforeinstallprompt',event=>{
      // event.preventDefault()
      // this.installPromptEvent=event
      // this.showInstallButton=true
    //   event.preventDefault();
    // event.prompt();
    })
  },
  methods:{
    addToDesktop(){
      console.log('添加到桌面')
      if(this.installPromptEvent){
        this.installPromptEvent.promot()
      }
    },
    addToHomeScreen() {
      if (this.isStandaloneSupportedAndEnabled()) {
        // 如果已经是独立模式，则不需要操作
      } else if (this.isMacOSWithoutSafari()) {
        alert('This feature is not supported on MacOS without Safari.');
      } else if (this.isIOS()) {
        // iOS 设备上需要用户手动添加
        alert('Please use Safari on iOS and tap "Add to Home Screen" manually.');
      } else {
        // 其他浏览器或者Android设备
        this.deferInstall();
      }
    },
    isStandaloneSupportedAndEnabled() {
      return (
        window.matchMedia('(display-mode: standalone)').matches ||
        window.navigator.standalone === true
      );
    },
    isMacOSWithoutSafari() {
      return /Mac/.test(navigator.platform) && /Safari/.test(navigator.userAgent) === false;
    },
    isIOS() {
      return /iPad|iPhone|iPod/.test(navigator.platform);
    },
    deferInstall() {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => {
          registration.pushManager.getSubscription({ userVisibleOnly: true })
            .then(subscription => {
              if (!subscription) {
                // 用户订阅的subscription对象不存在，触发安装提示
                window.deferredInstallPrompt = event;
              }
            });
        });
      }
    }
  }
}
</script>
