import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: {
    /*
        // Expected Structure of Todo
        { 
            "id": 4,
            "title": "Games",
        }

        // Expected Structure of step
        {
            "id": 3,
            "step": "Test",
            "completed": false,
            "todo_id": 6,
            "created_at": "2021-12-13T12:43:32.565Z",
            "updated_at": "2021-12-13T12:43:32.565Z",
            "tags": [
                "Hello",
                "Tags",
                "Trying"
            ]
        }

    */
    Todo: [], // Todo[]
    steps: [], // Object[]
    changed: false,
  },
  reducers: {},
});

export const todoActions = todoSlice.actions;
export default todoSlice;
