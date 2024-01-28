import { createSlice } from "@reduxjs/toolkit";

const initialNameState = {
    filteredUser:[]
};

const filteredUserSlice = createSlice({
    name:"filterUser",
    initialState:initialNameState,
    reducers:{
        FILTER_BY_SEARCH(state,action){
            const {users,search} = action.payload;
            console.log(search);

            let tempUser = users?.filter((user)=>{
                return (
                    user.name.toLowerCase().includes(search.toLowerCase())  ||
                    user.email.toLowerCase().includes(search.toLowerCase()) ||
                    user.town.toLowerCase().includes(search.toLowerCase())  ||
                    new Date(user.verifiedDate).toDateString().toLowerCase().includes(search.toLowerCase())
                    );
                
            })
            state.filteredUser = tempUser;
            // console.log(filteredUser)
        }
    }
});

export const filteredUserSliceAction = filteredUserSlice.actions;
export default filteredUserSlice;