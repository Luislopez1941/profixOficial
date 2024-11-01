import ConfigurationAPIs from '../services/ConfigApi';

interface LoginData {
    email: string;
    password: string;
}

interface UserData {
  firstName: string;
  firstSurname: string;
  typeUser: string;
  phone: string;
  email: string;
  password: string;
  description: string
}


interface UserInfo {
    id: number;
    name: string;
    email: string;
    typeUser: string;
    token: string;
   
  };

// interface userGet {
//     id: number;
//     firstName: string;
//     firstSurname: string;
//     typeUser: string;
//     phone: string;
//     email: string;
//     password: string;
//   }

interface Skill {
    name: string;
}

type Skills = Skill[];

interface UpdateUserData {
    id: number,
    type: string,
    profilePhoto: string;
    background: string;
    description?: string;
    skills: Skills; 
}

interface FormData {
    first_name: string;
    first_surname: string;
    phone: string;
    email: string;
    password: string;
}

const APIs = {
    login: async (data: LoginData) => {
        const path = 'general_login';
        return ConfigurationAPIs.post(path, data);
    },

    getUser: async (data: UserInfo) => {
        const path = `get_user/${data.typeUser}/${data.id}`;
        return ConfigurationAPIs.get(path);
    },

    updateUser: async (data: UpdateUserData) => {
        const path = `update_user/${data.type}/${data.id}`;
        return ConfigurationAPIs.put(path, data);
    },
    
    createUsers: async (data: UserData) => {
        const path = 'users_registration';
        return ConfigurationAPIs.post(path, data);
    },

    getUsers: async (data: UserData) => {
        const path = 'users_registration';
        return ConfigurationAPIs.post(path, data);
    },


    customerRegistration: async (data: FormData) => {
        const path = 'customer_registration';
        return ConfigurationAPIs.post(path, data);
    },



    

    
}

export default APIs;
