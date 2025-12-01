$(document).ready(async () => {
  try {
    const allClients = await axios.get(
      "https://apex-h7wm.onrender.com/apex/pictures/getimageall"
    );
    console.log(allClients.data.profileImages);

    allClients.data.profileImages.forEach((client) => {
      const { img_url, name } = client;
      console.log(img_url);
      const didiv = $('<div class="card"></div>');
      const Cname = $(`<h5 class="text-center">Uploaded by : ${name}</h5>`);
      const img = $(`<img style="width:350px" src="${img_url}"/>`);
      didiv.append(Cname);
      didiv.append(img);

      $("#holdc").append(didiv);
    });
  } catch (error) {
    console.log(error);
  }

  $(".card").mouseenter(() => {
    console.log($("#asset").val());
  });
});
