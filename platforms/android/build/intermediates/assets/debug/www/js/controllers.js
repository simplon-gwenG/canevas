
angular.module('starter')

.controller('ImageController', function($scope, $cordovaFile, $cordovaCapture, $cordovaEmailComposer){
  // définition du tableau pour le ng-repeat pour stocker les images
  $scope.images = [];
  $scope.myObj = {"border": "10px solid white",}

  $scope.takePhoto = function(){// fonction du ng-click
    var options = {
      limit:2 // définit le nb de photos à prendre en un seul click sur le bouton
    };

    $cordovaCapture.captureImage(options).then(function(results){
      for (var i= 0; i < results.length; i++){
        $scope.images.push(results[i].fullPath);// on renvoit les données à notre tableau d'images
      }

      if(!$scope.$$phase){
      $scope.$apply();}//??
      },
      function(err){
        console.log('err');
        console.log(err);
      });
  };
  $scope.createCanvas =function(){
      if (null != $scope.images) {
          var images = [];
          var savedImages = $scope.images;
          for (var i = 0; i < savedImages.length; i++) {
              // on parcourt notre tableau d'images avec les corrects paths
              images.push("" + savedImages[i]);
              // le path est récupéréré des images sauvegardées dans l'app
              images[i] = images[i].replace('file://', '');

}
  //canevas
         var canvas = document.getElementById('canvas_id');
         console.log(canvas);
         var context =canvas.getContext('2d');
         console.log(context);
         var photo = document.querySelectorAll('.imgAffichage');//selection en html 5 sur la class imgAffichage et renvoie un tableau
              for (var j = 0; j < photo.length; j++) {// on parcourt le tableau j car i est déjà utilisé
              photo[j].ngSrc = $scope.images[j];//selection de la source (tableau d'images)
              console.log(photo[j].ngSrc);
              var positionX = j*260;// variable qui crée un décalage de position d'image à chaque tour de tableau
              var positionY = 0;
              context.save();// sauvegarde du conevas initial
              context.translate(200, 10)// déplacement de l'image
              context.rotate((Math.PI / 180) * 90)// rotation de l'image
              context.strokeStyle = "#ffffff";// cadre blanc autour de l'image
              context.lineWidth = 10;// épaisseur du cadre
              context.drawImage(photo[j],positionX,positionY,250,150);// dessine une image à chaque tour de boucle du tableau photo[j] avec les positions définies
      //dessine l'image  de l'index j
              context.strokeRect(positionX,positionY,250, 150);// positionnment du rectangle autour de l'image
              context.restore();// retour au context d'origine
      //transforme le canevas en image
                          var img = new Image();
                          img.src = canvas.toDataURL("image/png");
                          document.body.appendChild(img);
                        console.log(img.src);
              }
              var url = img.src;
   var filePath = '/mnt/sdcard/photomaton.jpg';
   var path= filePath.substr(filePath.lastIndexOf('/')+1);
   var fileTransfer = new FileTransfer();
   var uri = encodeURI(url);

   fileTransfer.download(
       uri,
       filePath,
       path,
       function(entry) {
           console.log("download complete: " + entry.fullPath);
       },
       function(error) {
           console.log("download error source " + error.source);
           console.log("download error target " + error.target);
           console.log("upload error code" + error.code);
       },
       false,
       {
           headers: {
               "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
           }
       }
   );
        }
    }
})
