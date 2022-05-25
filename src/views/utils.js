export const parseRequestUrl = () =>{
  const url = document.location.hash.toLowerCase();
  const request = url.split("/");
  return {
    resource: request[1],
  }
}