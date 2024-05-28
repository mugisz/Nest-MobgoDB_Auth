import axios from "axios"
import { Iauth } from "../interface/Auth";

axios.defaults.baseURL = "http://localhost:5000/api";

export const AuthService = {
 async login(email:string,password:string):Promise<Iauth>{
return axios.post("auth/login",{email,password})
 },
 async registration(email:string,password:string):Promise<Iauth>{
    return axios.post("auth/registration",{email,password})
     }
}