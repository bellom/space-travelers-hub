import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import axios from 'axios';

const initialState = {
  missions: [],
};
const missionsURL = 'https://api.spacexdata.com/v3/missions';
export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    const response = await fetch(missionsURL);
    const data = await response.json();
    const missionsData = data.map((mission) => ({
      id: mission.mission_id,
      name: mission.mission_name,
      description: mission.description,
    }));
    console.log(missionsData);

    return missionsData;
  },
);

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  extraReducers: {
    [fetchMissions.pending]: () => {
      console.log('fetching');
    },
    [fetchMissions.fulfilled]: (state, action) => {
      console.log('success');
      state.missions = action.payload;
    },

  },
});

export default missionsSlice.reducer;