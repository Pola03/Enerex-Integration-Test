
export const getErrorMsgByCode = (errorCode)=>{
  let errorMsg = "";
  switch (errorCode) {
      case 401:
        errorMsg = "🔐 Your session has expired. Please sign in again.";
        break;
      case 403:
        errorMsg = "🚫 You do not have permission to perform this action.";
        break;
      default:
        if (errorCode >= 500) {
          errorMsg = "🧱 Something went wrong on our end. Please try again later.";
        } else {
          errorMsg = "❓ An error occurred. Please try again.";
        }
        break;
    }
  return errorMsg;
}

// "🌐 Unable to connect to the server. Please check your connection."