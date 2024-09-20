// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
   //apiURL: 'http://localhost:26265/',
  apiURL: 'https://uat.shopkirana.in/',
  whatsAppImagapiURL : 'https://uat.shopkirana.in/',
  // mediaURL : 'http://192.168.1.50:7011',
  mediaURL : 'https://media.er15.xyz/',
  // apiURL: 'https://er15.xyz:4436/',
  //apiURL: 'https://er15.xyz:4436',
  // tradeapiURL: 'http://192.168.1.101:8585',
  // apiURL: 'http://localhost:26265',
  // apiImageUrl: 'https://er15.xyz:4436',
  //apiURL: 'https://internal.er15.xyz/', 
  whatsappImageURL: 'https://uat.shopkirana.in/',
  tradeapiURL: 'http://192.168.1.101:8585',
  apiKeyGoogle: 'AIzaSyD5ftRk6-UwGVAWWKE5IWtm4yxppzP6_xs',
  buyerapi:'http://localhost:26265/api/BuyerForecast/',
    //CRMapiURL: 'https://crm.er15.xyz/',
    CRMapiURL: 'https://localhost:44396/',
  firebaseDboyTrackerConfig: {
    apiKey: "AIzaSyByLRWMQFd4AK_iYQJjNsV6kfLUI7LuOa8",
    authDomain: "dboytracker.firebaseapp.com",
    databaseURL: "https://dboytracker-default-rtdb.firebaseio.com",
    projectId: "dboytracker",
    storageBucket: "dboytracker.appspot.com",
    messagingSenderId: "911318288862",
    appId: "1:911318288862:web:6b969a42e142129c88b54f"
  },
  firebaseCollectionName: 'vehicleHistoryTest'
};
