<template lang="html">
  <section>
    <div class="app" :style="styleObj">
      <div>
        <div class="iconInfo">
          <span><custom-icon name="cloud" base-class="custom-icon"></custom-icon> {{ cloud }}</span>
          <span><custom-icon name="droplet" base-class="custom-icon"></custom-icon> {{ droplet }}</span>
          <span><custom-icon name="wind" base-class="custom-icon"></custom-icon> {{ wind }}</span>
        </div>

        <p class="city">{{ city }}, {{ country }}</p>
        <p class="temp">
          <span class="tempCurrent">{{ temperature }}</span> <br>
          <span class="tempMin">최저 {{ tempMin }}</span> /
          <span class="tempMax">최고 {{ tempMax }}</span>
        </p>
        <p class="desc"> {{ weatherMain }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import customIcon from 'vue-icon/lib/vue-feather.esm'

var cities = {
  'Kwangmyong' : '광명시',
}
var contries = {
  'KR' : '대한민국',
  'JP' : '일본'
}
export default{
    name:'Weather',
    data(){
        return{
            styleObj: {
              background: '',
            },
            dataObj: null,
            city: '',
            country: '',
            temperature: null,
            weatherMain: '',
            cloud: null,
            latitude: 0.0,
            longitude: 0.0,
            apikey: '7c7b017cca50fa246332ad17e4cb53b1', //openweathermap에서 발급한 자신의 apikey 입력
            baseClass:'v-icon',
        }
    },
    components: {
      customIcon
    },
    methods:{
        getLocation: function () {
            if (!navigator.geolocation) {
                this.errorMsg = "Geolocation is not supported by your browser";
                this.city = this.errorMsg;
                console.warn(this.errorMsg);
                return;
            }
            var options = {
              enableHighAccuracy: false, // 정확한 위치정보
              timeout: 10000, // 위치정보 반환 최대 소모 시간 ms (Infinity)
              maximumAge: 0, // 캐시에 저장된 위치정보 반환 최대 시간 (0)
            };
            navigator.geolocation.getCurrentPosition(this.success, this.error, options);
        },
        success: function (position) {
            console.log(position);
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            this.latitude = parseFloat(this.latitude).toFixed(2);
            this.longitude = parseFloat(this.longitude).toFixed(2);

            this.getWeather();
        },
        error: function (err) {
            this.errorMsg = "Unable to retrieve your location";
            this.city = this.errorMsg;

            console.warn(`ERROR(${err.code}): ${err.message}`);
            console.warn(this.errorMsg);
        },
        getWeather: function(){
            var reqURL = 'https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + this.latitude + '&lon=' + this.longitude + '&APPID=' + this.apikey;

            this.$http.get(reqURL, {headers: {'x-requested-with': 'XMLHttpRequest'}}).then(function (response) {
                this.dataObj = response.data;
                this.temperature = (this.dataObj.main.temp - 273.15).toFixed(0) + 'º'; // °C = K - 273.15 온도 단위 섭씨로 변환하는 공식
                this.tempMin = (this.dataObj.main.temp_min - 273.15).toFixed(0) + 'º'; // °C = K - 273.15 온도 단위 섭씨로 변환하는 공식
                this.tempMax = (this.dataObj.main.temp_max - 273.15).toFixed(0) + 'º'; // °C = K - 273.15 온도 단위 섭씨로 변환하는 공식
                this.city = cities[this.dataObj.name];
                this.country = contries[this.dataObj.sys.country];
                this.weatherMain = this.dataObj.weather[0].main;
                this.cloud = (this.dataObj.clouds.all) + '%';
                this.wind = (this.dataObj.wind.speed) + 'm/s';
                this.droplet = (this.dataObj.main.humidity) + '%';
                console.log('response : ', response);
            }, function (response) {
                console.log('error: ', response);
                this.errorMsg = "Unable to retrive weather information.";
            });
        }
    },
    created(){
        this.getLocation();
    }
}
</script>


<style lang="css" scoped>
  .app {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(163,149,205,1);
    background: -moz-linear-gradient(top, rgba(163,149,205,1) 0%, rgba(134,174,204,1) 100%);
    background: -webkit-gradient(left top, left bottom, color-stop(0%, rgba(163,149,205,1)), color-stop(100%, rgba(134,174,204,1)));
    background: -webkit-linear-gradient(top, rgba(163,149,205,1) 0%, rgba(134,174,204,1) 100%);
    background: -o-linear-gradient(top, rgba(163,149,205,1) 0%, rgba(134,174,204,1) 100%);
    background: -ms-linear-gradient(top, rgba(163,149,205,1) 0%, rgba(134,174,204,1) 100%);
    background: linear-gradient(to bottom, rgba(163,149,205,1) 0%, rgba(134,174,204,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a395cd', endColorstr='#86aecc', GradientType=0 );
    width:100vw;
    height:100vh;
    padding:2rem;
    box-sizing: border-box;
    text-align: center;
    color:#fff;
    font-family: "OpenSans",Arial;
  }
  .app > div {width:100vw;}
  .app p {margin: 3em 0;}
  .iconInfo {
    display: -webkit-flex;
    display: -ms-flex;
    display: flex;
    justify-content: space-around;
    width:100%;
    padding:1rem;
    margin-bottom: 3em;
    background-color:rgba(255,255,255, 0.3);
    border-radius: 5px;
    box-sizing: border-box;
    color:#323232;
  }
  .v-icon,.custom-icon {
      width: 1.25em;
      vertical-align: middle;
  }
  .tempCurrent {font-size: 4em;}
  .desc {text-transform: uppercase; letter-spacing: 0.08em;}
  @media screen and (min-width:460px) {
    .app {
      width:330px;
      height:600px;
      border-radius:4px;
      margin:0 auto;
    }

  }
</style>
