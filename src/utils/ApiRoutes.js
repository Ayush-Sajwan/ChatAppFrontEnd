const host="http://localhost:5000";

const registerRoute=`${host}/api/auth/register`;
const loginRoute=`${host}/api/auth/login`;
const setAvatarRoute=`${host}/api/auth/setAvatar`;
const allUsersRoute=`${host}/api/auth/allUsers`;

const storeMessageRoute=`${host}/api/message/storeMessage`;
const getMessagesRoute=`${host}/api/message/getMessages`;

export {host,registerRoute,loginRoute,setAvatarRoute,allUsersRoute,storeMessageRoute,getMessagesRoute};
