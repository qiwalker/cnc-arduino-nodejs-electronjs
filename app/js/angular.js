/* global electron */
/* global angular */
/* global $ */
/* global io */
angular
.value('cnc',{
  arduino:false,
  working:false,
  pause:{
    line: 0,
    status: false,
    steps: [0,0,0]
  },
  file:{
    //gcode : [],
    name:'Sin Archivo.',
    line: {
      total : 0,
      run : 0,
      duration : 0,
      progress : 0
    },
    travel:0,
    Progress: function  (nro,trvl) {
      nro++;
      this.line.run = nro;
      this.line.progress = ((trvl*100)/this.travel).toFixed(2);
    }
  },
  time:{
    pause:'--:--',
    start:'--:--',
    end:'--:--',
    calcEnd : function (line) {
      // this = time
      let time = new Date().getTime() - this.start.getTime();
      let mileSecondsLeft =  line.total * time / line.run;
      this.end = new Date( this.start.getTime() + mileSecondsLeft );
    }
  }
})
.value('lineTable', [])
.value('statusBar', {
  "message":"CNC-ino.",
  "type":"none",
  "time":3000
})
.value('config', {
    "motor": {
    "xy": {
      "time": 24,
      "steps": 4000,
      "advance": 29.37
    },
    "z": {
      "steps": 2000,
      "advance": 14
    }
  }
})
.directive('checkbox', function () {
  return {
    link: function (scope, element, attrs) {
        element.checkbox();
    }
  }
})
.directive('popupElement', function () {
  return {
    link: function (scope, element, attrs) {
      element.popup({
        title    : attrs.ngPopupTitle,
        content  : attrs.ngPopup,
        position : attrs.ngPopupPosition,
        variation : attrs.ngPopupVariatio,
        delay: {
          hide: 650
        }
      });
    }
  }
})
.directive('ngPopup', function () {
  return {
    link: function (scope, element, attrs) {
      element.popup({
        popup : $(attrs.id)
      });
    }
  }
})
;