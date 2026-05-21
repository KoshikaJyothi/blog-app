import axios from "axios";
import {create} from 'zustand'
import API_BASE_URL from '../src/config/api'

export const useAuth= create((set)=>({
    currentuser:null,
    loading:false,
    error:null,
    isAuthenticated:false,
    login:async(userCredWithRole)=>{
        const {_,...userCred}=userCredWithRole
        try {
            set({loading:true,error:null});
            let res=await axios.post(`${API_BASE_URL}/common-api/login`,
                userCred, 
                {withCredentials:true}) 
            
            const user = res.data.payload;
            // Normalize ID
            if (user.userId && !user._id) user._id = user.userId;
            
            set({loading:false,error:null,currentuser:user,isAuthenticated:true})
        } catch (error) {
            const message = error.response?.data?.message || error.message
            set({loading:false,error:message})
            throw new Error(message) 
        }
    },
    logout:async()=>{
        try{
            set({loading:true,error:null})
            await axios.get(`${API_BASE_URL}/common-api/logout`,{withCredentials:true})
            set({
                loading:false,
                isAuthenticated:false,
                currentuser:null
            })
        }
        catch(err)
        {
            set({
                loading:false,
                isAuthenticated:false,
                currentuser:null,
                error:err.response?.data?.error ||'Logout failed'
            })
        }
    },
    checkSession: async () => {
        try {
            set({ loading: true });
            const res = await axios.get(`${API_BASE_URL}/common-api/user`, { withCredentials: true });
            
            const user = res.data.payload;
            // Normalize ID: JWT payload uses userId, Mongoose uses _id
            if (user.userId && !user._id) user._id = user.userId;

            set({ 
                currentuser: user, 
                isAuthenticated: true, 
                loading: false 
            });
        } catch {
            set({ 
                currentuser: null, 
                isAuthenticated: false, 
                loading: false 
            });
        }
    }
}))