const checkEnvironment = (environment = "dev") => {
    if (environment === "dev") {
        return {
        envName: "dev",
        envUrl: "http://localhost:5001/apiMyBank"
        };
    } else {
        return {
        envName: "stag",
        envUrl: `https://mybankback.herokuapp.com/apiMyBank`
        };
    } 
};
  
export default checkEnvironment;