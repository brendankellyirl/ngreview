// exports.config = {
//   projectRoot: "./src/app",
//   routes: {
//     "/user/:userId": {
//       // Type is mandatory
//       type: "json",
//       /**
//        * Every parameter in the route must exist here
//        */
//       userId: {
//         url: "https://jsonplaceholder.typicode.com/users",
//         property: "id"
//       }
//     }
//   }
// };
exports.config = {
  projectRoot: "./src/app",
  outFolder: "./dist/static",
  routes: {
  }
};
