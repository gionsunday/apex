window.addEventListener("load", () => {
  var files = "";
  const fileInput = document.getElementById("screenshot");
  fileInput.onchange = () => {
    const selectedFile = fileInput.files[0];
    files = selectedFile;
    console.log(selectedFile);
  };
  const submitBtn = document.querySelector("#sendbtn");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    console.log(files);
    const data = new FormData();

    data.append("creator", localStorage.getItem("dashboard").split(",")[4]);
    data.append("name", localStorage.getItem("dashboard").split(",")[3]);
    data.append("images", files);
    submitBtn.textContent = "Uploading...";
    try {
      const newData = await axios.post(
        "https://apex-h7wm.onrender.com/apex/pictures/uploadimages",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      submitBtn.textContent = "Sent Successfully!";
    } catch (error) {
      console.log(error);
    }
  });
});
