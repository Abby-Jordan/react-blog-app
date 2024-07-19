const getDynamicIdFromUrl = (url) => {
    // Remove trailing slash if it exists
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
  
    // Get the last part of the URL
    return url.split('/').pop();
  };
  
  export default getDynamicIdFromUrl;