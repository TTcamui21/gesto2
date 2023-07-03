Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90,
  });
  
  camera = document.getElementById("camera");
  
  Webcam.attach("#camera");
  
  function take_snapshot() {
    Webcam.snap(function(data_uri) {
      // Na linha 24, você deverá adicionar o id do resultado
      // Para descobrir qual é o id, volte para o html
      document.getElementById("result").innerHTML =
        '<img id="captured_image" src="' + data_uri + '"/>';
    });
  }
  
  console.log(ml5.version);
  
  classifier = ml5.imageClassifier(
    "https://teachablemachine.withgoogle.com/models/HAyrcwhmE/model.json",
    modelLoaded
  );
  
  function modelLoaded() {
    console.log("Model carregado com sucesso!");
  }
  
  function check() {
    img = document.getElementById("captured_image");
    classifier.classify(img, gotResult);
  }
  
  function gotResult(error, results) {
    if (error) {
      console.error(error);
      return;
    }
  
    document.getElementById("result_object_name").innerHTML = results[0].label;
    var gesture = results[0].label;
    var previsao = "";
  
    if (gesture == "tranquilo") {
      previsao = "você está tranquilo";
    }
  
    if (gesture == "legal") {
      previsao = "você está legal";
    }
  
    if (gesture == "vitoria") {
      previsao = "você está vitorioso";
    }
  
    speak(previsao);
  }
  
  function speak(text) {
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }