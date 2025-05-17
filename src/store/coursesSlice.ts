import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { supabase } from '../lib/supabase';

// Define the course type based on your data structure
export interface Course {
  id: number | string;
  title: string;
  description: string;
  category: string;
  image?: string;
  instructor : string;
  // Add other properties as needed
}

// Define the slice state
interface CoursesState {
  items: Course[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  lastFetched: string | null;
}

const initialState: CoursesState = {
  items: [],
  status: 'idle',
  error: null,
  lastFetched: null
};

// Async thunk for fetching courses
export const fetchCourses = createAsyncThunk<Course[]>(
  'courses/fetchCourses',
  async (_, { rejectWithValue }) => {
    try {
      const { data, error } = await supabase.from('courses').select('*');
        
      if (error) throw error;
      return data as Course[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCourses.fulfilled, (state, action: PayloadAction<Course[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.lastFetched = new Date().toISOString();
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

// Selectors
export const selectAllCourses = (state: { courses: CoursesState }) => state.courses.items;
export const selectCourseStatus = (state: { courses: CoursesState }) => state.courses.status;
export const selectCourseError = (state: { courses: CoursesState }) => state.courses.error;
export const selectLastFetched = (state: { courses: CoursesState }) => state.courses.lastFetched;

export default coursesSlice.reducer;