import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data
      }),
      invalidatesTags: ["category"]
    }),

    getCategory: builder.query({
      query: () => ({
        url: "/category",
        method: "GET"
      }),
      providesTags: ["category"]
    })
  })
});

export const { useGetCategoryQuery, useCreateCategoryMutation } = categoryApi;
