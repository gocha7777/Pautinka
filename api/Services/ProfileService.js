import axiosRepository from "../axiosRepository";

const getProfile = async () => {
    const response = await axiosRepository.get("User/5");
    console.log(response);
    
    return response.data;

};

const saveProfile = () => {

};

export default { saveProfile, getProfile };