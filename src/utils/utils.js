// -------------------------------- S3 Utils - File Upload -----------------------------------------------
const getPresignedUrlForFileUpload = async (files, folderPath) => {
  const getFileNames = () => {
    return files.map((file) => file.name);
  };
  const response = await fetch(
    "https://majnalcwgg5jdnfpr2zdxvqubq0thpjz.lambda-url.ap-southeast-1.on.aws/",
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        file_directory: folderPath,
        filenames: getFileNames(),
      }),
    }
  );

  try {
    const data = await response.json();
    // console.log(response);
    // console.log(data);

    return data.presigned_urls;
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = async (file) => {
  // set up the request data
  const url = `${file.presignedUrl}`;

  // track status and upload file
  file.status = "loading";

  let response = await fetch(url, {
    method: "PUT",
    body: file.file,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  // change status to indicate the success of the upload request
  file.status = response.ok;

  return response;
};

// Use this function outside
export const uploadFilesToS3 = async (files, folderPath) => {
  let urls = [];
  if (files.length) {
    urls = await getPresignedUrlForFileUpload(files, folderPath);
  }

  for (const [index, file] of files.entries()) {
    file.presignedUrl = urls[index].presigned_url;
    file.filePath = urls[index].filepath;
  }

  return Promise.all(files.map((file) => uploadFile(file)));
};

export default uploadFilesToS3;
