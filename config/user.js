// import mongoose from 'mongoose';

// const { MONGO_USER_URI } = process.env;

// const connectUser = () => {
//     mongoose.connect(MONGO_USER_URI)
//         .then((result) => {
//             console.log("Successfully connected to user database");
//         })
//         .catch((error) => {
//             console.log("database connection failed. exiting now...");
//             console.error(error);
//             process.exit(1);
//         });
// }

// const disconnectUser = () => {
//     mongoose.connect(MONGO_USER_URI)
//         .then((result) => {
//             console.log("Successfully connected to user database");
//         })
//         .catch((error) => {
//             console.log("database connection failed. exiting now...");
//             console.error(error);
//             process.exit(1);
//         });
// }

// export {
//     connectUser,
//     disconnectUser
// };