import { createSlice } from "@reduxjs/toolkit";
const course = {
    id: null,
    title: null,
    imageURL: null,
    description: null,
    value: null,


}


export const teacherContentSlice = createSlice({
    name: 'teacherContent',
    initialState: {
        courses: [],
        notifications: {
            notification: [{message: null, id: null}],
            counter: 0
        },
        goals: []
    },
    reducers: {
        notificationPush: (state, { payload }) => {
           
            state.notifications = payload.notifications
        }
    }
})

export const {
    notificationPush
} = teacherContentSlice.actions