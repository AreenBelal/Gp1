const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/auto/upload`;

const uploadFile = async (file) => {
  console.log(
    "process.env.REACT_APP_CLOUDINARY_CLOUD_NAME",
    process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
  );

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "chat-app-files");

  const res = await fetch(url, {
    method: "post",
    body: formData,
  });
  const resData = await res.json();
  return resData;
};

export default uploadFile;
