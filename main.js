// تحديد المتغيرات
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const audio = document.querySelector('audio');

let mediaRecorder;
let recordedChunks = [];

// التحقق من توفر API
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log('getUserMedia supported.');
  // طلب الوصول إلى الميكروفون
  navigator.mediaDevices.getUserMedia({ audio: true })
  // بدء التسجيل عند النجاح
    .then(function(stream) {
    mediaRecorder = new MediaRecorder(stream);

    // تحديد الإجراء عند بدء التسجيل
    startButton.addEventListener('click', function() {
      mediaRecorder.start();
      console.log('Recording started.');
    });

    // تحديد الإجراء عند إيقاف التسجيل
    stopButton.addEventListener('click', function() {
      mediaRecorder.stop();
      console.log('Recording stopped.');
    });

    // تحديد الإجراء عند الانتهاء من التسجيل وتحميل الملف المسجل
    mediaRecorder.addEventListener('dataavailable', function(e) {
      recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener('stop', function() {
      const audioBlob = new Blob(recordedChunks);
      const audioUrl = URL.createObjectURL(audioBlob);
      audio.src = audioUrl;
      console.log('Recording saved.');
    });
  })
  // التعامل مع الأخطاء في حالة عدم تمكن الوصول إلى الميكروفون
  .catch(function(err) {
    console.log('The following getUserMedia error occurred: ' + err);
  });
} else {
  console.log('getUserMedia not supported on your browser!');
}